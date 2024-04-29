import { PRODUCT_CATEGORIES } from "../../config";
import { Access, CollectionConfig } from "payload/types";
import {
    AfterChangeHook,
    BeforeChangeHook,
} from "payload/dist/collections/config/types";
import { Product, User } from "../../server/payload-types";
import { stripe } from "../../lib/stripe";

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
    const user = req.user;

    return {
        ...data,
        user: user.id,
    };
};

const syncUser: AfterChangeHook<Product> = async ({ req, doc }) => {
    const fullUser = await req.payload.findByID({
        collection: "users",
        id: req.user.id,
    });

    if (fullUser && typeof fullUser === "object") {
        const { products } = fullUser;
        const allIDs = [
            ...(products?.map((p) => (typeof p === "object" ? p.id : p)) || []),
        ];
        const createdProductsIDs = allIDs.filter(
            (id, idx) => allIDs.indexOf(id) === idx
        );
        const dataToUpdate = [...createdProductsIDs, doc.id];

        await req.payload.update({
            collection: "users",
            id: fullUser.id,
            data: {
                products: dataToUpdate,
            },
        });
    }
};

const isAdminorHasAccess =
    (): Access =>
    ({ req: { user: _user } }) => {
        const user = _user as User | undefined;

        if (!user) return false;
        if (user.role === "admin") return true;

        const userProductsIDs = (user.products || []).reduce<Array<string>>(
            (acc, p) => {
                if (!p) return acc;
                if (typeof p === "string") acc.push(p);
                else acc.push(p.id);

                return acc;
            },
            []
        );

        return {
            id: {
                in: userProductsIDs,
            },
        };
    };

export const Products: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    hooks: {
        afterChange: [syncUser],
        beforeChange: [
            addUser,
            async (args) => {
                if (args.operation === "create") {
                    const data = args.data as Product;
                    const createProduct = await stripe.products.create({
                        name: data.name,
                        default_price_data: {
                            currency: "BRL",
                            unit_amount: Math.round(data.price * 100),
                        },
                    });

                    const updated: Product = {
                        ...data,
                        stripeId: createProduct.id,
                        priceId: createProduct.default_price as string,
                    };

                    return updated;
                } else if (args.operation === "update") {
                    const data = args.data as Product;
                    const updateProduct = await stripe.products.update(
                        data.stripeId!,
                        {
                            name: data.name,
                            default_price: data.priceId!,
                        }
                    );

                    const updated: Product = {
                        ...data,
                        stripeId: updateProduct.id,
                        priceId: updateProduct.default_price as string,
                    };

                    return updated;
                }
            },
        ],
    },
    access: {
        read: isAdminorHasAccess(),
        update: isAdminorHasAccess(),
        delete: isAdminorHasAccess(),
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: () => false,
            },
        },
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            name: "description",
            type: "textarea",
            label: "Product Details",
        },
        {
            name: "price",
            label: "Price in GBP",
            min: 0,
            max: 1000,
            type: "number",
            required: true,
        },
        {
            name: "category",
            label: "Category",
            type: "select",
            options: PRODUCT_CATEGORIES.map(({ label, value }) => ({
                label,
                value,
            })),
        },
        {
            name: "product_files",
            label: "Product File(s)",
            type: "relationship",
            relationTo: "product_files",
            required: true,
            hasMany: false,
        },
        {
            name: "approvedForSale",
            label: "product Status",
            type: "select",
            access: {
                create: ({ req }) => req.user.role === "admin",
                update: ({ req }) => req.user.role === "admin",
                read: ({ req }) => req.user.role === "admin",
            },
            defaultValue: "pending",
            options: [
                {
                    label: "Pending Verification",
                    value: "pending",
                },
                {
                    label: "Approved",
                    value: "approved",
                },
                {
                    label: "Denied",
                    value: "denied",
                },
            ],
        },
        {
            name: "priceId",
            type: "text",
            access: {
                create: () => false,
                update: () => false,
                read: () => false,
            },
            admin: {
                hidden: true,
            },
        },
        {
            name: "stripeId",
            type: "text",
            access: {
                create: () => false,
                update: () => false,
                read: () => false,
            },
            admin: {
                hidden: true,
            },
        },
        {
            name: "images",
            type: "array",
            label: "Product Images",
            minRows: 1,
            maxRows: 4,
            required: true,
            labels: {
                singular: "Image",
                plural: "Images",
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
            ],
        },
    ],
};
