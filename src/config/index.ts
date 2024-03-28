export const PRODUCT_CATEGORIES = [
    {
        label: "UI Picks",
        value: "ui_picks" as const,
        featured: [
            {
                name: "Editor's Choice",
                href: "#",
                image: "/nav/ui-picks/mixed.jpg",
            },
            {
                name: "Top Latest",
                href: "#",
                image: "/nav/ui-picks/blue.jpg",
            },
            {
                name: "The Bestsellers",
                href: "#",
                image: "/nav/ui-picks/purple.jpg",
            },
        ],
    },
    {
        label: "Just Icons",
        value: "just_icons" as const,
        featured: [
            {
                name: "Top's Favourites",
                href: "#",
                image: "/nav/icons/picks.jpg",
            },
            {
                name: "The Just Latest",
                href: "#",
                image: "/nav/icons/new.jpg",
            },
            {
                name: "Bestsellers' Choice",
                href: "#",
                image: "/nav/icons/bestsellers.jpg",
            },
        ],
    },
];
