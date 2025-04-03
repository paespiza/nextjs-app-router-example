import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";

// Init Builder with your API Key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Skip TypeScript inference by using `: any`
export default async function BlogPostPage({ params }: any) {
  const slug = params?.slug;
  const urlPath = `/blog/${slug}`;

  const content = await builder
    .get("blog-post", {
      userAttributes: {
        urlPath,
      },
    })
    .toPromise();

  return content ? (
    <RenderBuilderContent content={content} model="blog-post" />
  ) : (
    <div>⚠️ Blog post not found</div>
  );
}
