import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default async function BlogPostPage({ params }: any) {
    // You need to await `params` first
    const { slug } = await params; // Await the params
  
    const urlPath = `/blog/${slug}`;
  
    const content = await builder
      .get("blog-post", {
        userAttributes: { urlPath },
      })
      .toPromise();
  
    return content ? (
      <RenderBuilderContent content={content} model="blog-post" />
    ) : (
      <div>⚠️ Blog post not found</div>
    );
  }
  