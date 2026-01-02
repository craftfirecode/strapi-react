import type {Route} from "./+types/blog._index";
import {Link} from "react-router";
import {Button} from "~/components/ui/button";
import {getBlogListData} from "~/api/strapi-api";

export function meta({params}: Route.MetaArgs) {
    return [
        {title: `CRAFTFIRE - Blog`},
        {name: "description", content: ""},
    ];
}

export async function loader() {
    try {
        return await getBlogListData();
    } catch (error) {
        return [];
    }
}

export default function Portfolio_index({loaderData}: Route.ComponentProps) {
    return (
        <div className="container mx-auto mt-5">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {(loaderData as any)?.map((item: any, index: string | number) => (
                    <div className="border-fx">
                        <div className="bg-white h-[100%]">
                            <Link to={"/blog/" + item.url}>
                                {item.thumbnail && (
                                    <img src={import.meta.env.VITE_PUBLIC_STRAPI_API_URL + item.thumbnail.url}
                                         className="w-full h-48 object-cover hover:grayscale" alt=""/>
                                )}
                            </Link>
                            <div className="p-3">
                                <h3 className="font-bold">{item.settings?.title}</h3>
                                <div className="my-3">
                                    {item.tag?.tag}
                                </div>
                                <div className="mb-8">
                                    {item.settings?.description}
                                </div>
                                <Link to={"/blog/" + item.url}>
                                    <Button>Jetzt Lesen</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}