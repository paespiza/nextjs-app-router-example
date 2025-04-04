import { builder } from "@builder.io/react";
import { RenderBuilderContent } from "@/components/builder";
import { notFound } from "next/navigation";

builder.init("f154bf67d18c42acae68064617b93b4b");

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const content = await builder
    .get("blog-post", {
      userAttributes: {
        urlPath: `/blog/${params.slug}`,
        locale: params.locale,
      },
    })
    .toPromise();

  if (!content) {
    notFound();
  }

  return <RenderBuilderContent content={content} model="blog-post" />;
}
