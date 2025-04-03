"use client";

import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";
import { useState, useEffect } from "react";


export default function BlogPostPage({ params }: any) {
  const [content, setContent] = useState(null);
  const [layout, setLayout] = useState(null);
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    if (params?.slug) {
      setSlug(params.slug);
    }
  }, [params]);

  useEffect(() => {
    const fetchContent = async () => {
      if (!slug) return;

      try {
        const [contentData, layoutData] = await Promise.all([
          builder.get("blog-post", {
            userAttributes: { urlPath: `/blog/${slug}` },
          }).toPromise(),
          builder.get("blog-post-layout", {
            userAttributes: { urlPath: `/blog/${slug}` },
          }).toPromise(),
        ]);
        
        console.log("Fetched Builder content:", contentData);


        setContent(contentData);
        setLayout(layoutData);
      } catch (error) {
        console.error("Error fetching builder content:", error);
      }
    };

    fetchContent();
  }, [slug]);

  if (!slug) return <div>Loading blog post...</div>;

  return (
    <>
      {layout && (
        <RenderBuilderContent content={layout} model="blog-post-layout" />
      )}
      {content ? (
        <RenderBuilderContent content={content} model="blog-post" />
      ) : (
        <div>⚠️ Blog post not found</div>
      )}
    </>
  );
}
