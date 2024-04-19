import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";

export const Products: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    access: {},
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
        /*{
            name: "product_files",
            label: "Product File(s)",
            type: "relationship",
            relationTo: "product_files",
            required: true,
            hasMany: false,
        },*/
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
