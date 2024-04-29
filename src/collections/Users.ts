import { Access, CollectionConfig } from "payload/types";
import { PrimaryActionEmailHtml } from "../components/emails/PrimaryActionEmail";

const adminsAndUsers: Access = ({ req: { user } }) => {
    if (user.role === "admin") return true;

    return {
        id: {
            equals: user.id,
        },
    };
};

export const Users: CollectionConfig = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: ({ token }) => {
                const href = `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`;

                return PrimaryActionEmailHtml({
                    actionLabel: "Verifu your account",
                    buttonText: "Verify Account",
                    href,
                });
            },
        },
    },
    access: {
        read: adminsAndUsers,
        create: () => true,
        update: ({ req }) => req.user.role === "admin",
        delete: ({ req }) => req.user.role === "admin",
    },
    admin: {
        hidden: ({ user }) => user.role !== "admin",
        defaultColumns: ["id"],
    },
    fields: [
        {
            name: "products",
            type: "relationship",
            relationTo: "products",
            label: "Products",
            hasMany: true,
            admin: {
                condition: () => false,
            },
        },
        {
            name: "product_files",
            type: "relationship",
            relationTo: "product_files",
            label: "Products Files",
            hasMany: true,
            admin: {
                condition: () => false,
            },
        },
        {
            name: "role",
            required: true,
            defaultValue: "user",
            /*admin: {
                condition: () => false,
            },*/
            type: "select",
            options: [
                {
                    label: "Admin",
                    value: "admin",
                },
                {
                    label: "User",
                    value: "user",
                },
            ],
        },
    ],
};
