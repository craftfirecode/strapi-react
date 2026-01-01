import { client } from "~/lib/apollo-client";
import {
  GET_PAGES,
  GET_PAGE,
  GET_POSTS,
  GET_BLOGS,
  GET_NAVIGATION,
} from "~/lib/graphql-queries";
import { findByChildrenSubUrl, findByCriteria } from "~/lib/helper";

// Helper to execute GraphQL queries
async function fetchGraphQL(query: any, variables?: any) {
  try {
    const { data } = await client.query({
      query,
      variables,
      fetchPolicy: "network-only", // Ensure fresh data
    });
    return data;
  } catch (error) {
    console.error("GraphQL Error:", error);
    return null;
  }
}

export async function getPageDataByDocumentID(documentId: string) {
  const data = await fetchGraphQL(GET_PAGE, { documentId });
  return data?.page || null;
}

export async function getPageData(urlFilter: string) {
  // Page content type does not have 'url' field anymore.
  // We cannot filter by URL.
  console.warn("getPageData: Cannot filter by URL as Page type has no url field.");
  return [];
}

export async function getPostData(urlFilter: string) {
  const data = await fetchGraphQL(GET_POSTS, {
    filters: { url: { eq: urlFilter } },
  });
  return data?.posts || [];
}

export async function getPostListData() {
  const data = await fetchGraphQL(GET_POSTS);
  return data?.posts || [];
}

export async function getBlogData(urlFilter: string) {
  const data = await fetchGraphQL(GET_BLOGS, {
    filters: { url: { eq: urlFilter } },
  });
  return data?.blogs || [];
}

export async function getBlogListData() {
  const data = await fetchGraphQL(GET_BLOGS);
  return data?.blogs || [];
}

export async function getSettingsData() {
  const data = await fetchGraphQL(GET_NAVIGATION);
  return data?.navigation || null;
}

export async function getStyleSettings() {
  // Assuming style-setting is a single type or similar, but we didn't check its schema.
  // If it's not in GraphQL yet, we might need to keep the REST call or add a query.
  // For now, let's keep the REST call for this one if we don't have the schema,
  // or try to fetch it if it exists.
  // The user said "update endpoints", so I should probably try to use GraphQL if possible.
  // But I didn't see a style-setting content type in the api folder list.
  // Let's check if it exists in the file list I got earlier.
  // I saw: blog, navigation, page, post.
  // I did NOT see style-setting.
  // So I will keep the REST call for getStyleSettings for now, or return null.
  // The original code used `/api/style-setting`.
  // Let's keep the original fetchData for this one specific case if needed,
  // but I'll comment it out or leave it as REST if I can't find it.
  // Actually, I'll just leave the REST implementation for this one helper.
  return fetchData(`/api/style-setting`);
}

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_PUBLIC_STRAPI_API_KEY}`,
};

async function fetchData(url: string, params?: any) {
  const apiUrl = import.meta.env.VITE_PUBLIC_STRAPI_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }

  const queryParams = new URLSearchParams(params).toString();
  const fullUrl = `${apiUrl}${url}${queryParams ? `?${queryParams}` : ""}`;

  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${fullUrl}`);
    }

    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
}

export async function getPageByHref(url: string | string[]) {
  const data = await getSettingsData();
  if (!data || !data.top) return null;
  return findByCriteria(data.top, { url: url });
}

export async function getPageIndexData() {
  const data = await getSettingsData();
  if (!data || !data.index) return null;
  return getPageDataByDocumentID(data.index.documentId);
}


export async function getPageByHrefSubpage(segment: string | string[]) {
  const data = await getSettingsData();
  if (!data || !data.top) return null;

  const startWith = findByCriteria(data.top, {
    url: segment[0],
    "has:children": true,
  });
  return findByChildrenSubUrl(startWith.children, segment[1]);
}
