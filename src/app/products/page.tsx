import ProductReel from "@/components/reels/ProductReel";
import MaxWidthWrapper from "@/components/widthWrapper/MaxWidthWrapper";
import { PRODUCT_CATEGORIES } from "@/config";

type Param = string | string[] | undefined;

interface PageProps {
    searchParams: {
        [key: string]: Param;
    };
}

function parse(param: Param) {
    return typeof param === "string" ? param : undefined;
}

export default function Page({ searchParams }: PageProps) {
    const sort = parse(searchParams.sort);
    const category = parse(searchParams.category);
    const label = PRODUCT_CATEGORIES.find(
        ({ value }) => value === category
    )?.label;

    return (
        <MaxWidthWrapper>
            <ProductReel
                title={label ?? "Browse High-Quality Assets"}
                query={{
                    category,
                    limit: 40,
                    sort: sort === "desc" || sort === "asc" ? sort : undefined,
                }}
            />
        </MaxWidthWrapper>
    );
}
