import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";

builder.init("f154bf67d18c42acae68604617b93b4b");

export default async function DataExamplePage() {
  const content = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/data-example",
      },
      options: { enrich: true },
    })
    .toPromise();

  return content ? (
    <RenderBuilderContent content={content} model="page" />
  ) : (
    <div>⚠️ No content found at path `/data-example`.</div>
  );
}
