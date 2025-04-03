import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";


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
