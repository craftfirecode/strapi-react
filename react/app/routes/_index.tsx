import { getPageIndexData } from "~/api/strapi-api";
import type { Route } from "./+types/_index";
import { Builder } from "~/components/ui/builder";

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const data = await getPageIndexData();
    return data;
  } catch (error) {
    return { data: null };
  }
}

export function meta({ params, data }: Route.MetaArgs & { data: any }) {
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
