import {getPageByHref, getPageDataByDocumentID} from "~/api/strapi-api";
import type {Route} from "./+types/$id";
import {Builder} from "~/components/ui/builder";
import {findByCriteria} from "~/lib/helper";

export async function loader({params}: Route.LoaderArgs) {
    try {
        const page = await getPageByHref(params.id);
        const res = await getPageDataByDocumentID(page.page.documentId);
        return res;
    } catch (error) {
        return {data: null};
    }
}

export function meta({data}: Route.MetaArgs & { data: any }) {
    if (!data?.settings) return [];
    return [
        {title: `CRAFTFIRE - ${data.settings.title}`},
        {description: data.settings.description},
    ];
}

export default function PageIndex({loaderData}: Route.ComponentProps) {
    return (
        <div className="container mx-auto mt-5">
            <Builder data={loaderData}/>
        </div>
    );
}