import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";

builder.init("f154bf67d18c42acae68064617b93b4b");

export default async function Page({ params }: any) {
  const urlPath = "/" + (params?.page?.join("/") || "");

  const content = await builder
    .get("page", {
      userAttributes: { urlPath },
      options: { enrich: true },
    })
    .toPromise();

  return content ? (
    <RenderBuilderContent content={content} model="page" />
  ) : (
    <div>⚠️ No content found at path `{urlPath}`.</div>
  );
}
