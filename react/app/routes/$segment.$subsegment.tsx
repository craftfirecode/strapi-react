import type { Route } from "./+types/$segment.$subsegment";
import {
  getPageByHrefSubpage,
  getPageDataByDocumentID,
} from "~/api/strapi-api";
import { Builder } from "~/components/ui/builder";

export async function loader({ request, params }: Route.LoaderArgs) {
  try {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const page = await getPageByHrefSubpage(segments);
    const res = await getPageDataByDocumentID(page.page.documentId);
    return res;
  } catch (error) {
    return { data: null };
  }
}

export function meta({ data }: Route.MetaArgs & { data: any }) {
  if (!data?.settings) return [];
  return [
    { title: `CRAFTFIRE - ${data.settings.title}` },
    { description: data.settings.description },
  ];
}

export default function PageIndex({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto mt-5">
      <Builder data={loaderData} />
    </div>
  );
}
