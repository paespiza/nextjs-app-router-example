"use client";

import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";
import { BuilderComponent } from "@builder.io/react";
import { useState, useEffect } from "react";


export default function BlogPostPage({ params }: any) {
  const [content, setContent] = useState(null);
  const [slug, setSlug] = useState<string | null>(null);

  // Fetch slug from params when component mounts or changes
  useEffect(() => {
    const resolveParams = async () => {
      if (params?.slug) {
        setSlug(params.slug);
      }
    };
    resolveParams();
  }, [params]);

  // Fetch the blog post content once slug is available
  useEffect(() => {
    if (slug) {
      const fetchData = async () => {
        try {
          const contentData = await builder
            .get("blog-post", {
              userAttributes: { urlPath: `/blog/${slug}` },
            })
            .toPromise();
          setContent(contentData);
        } catch (error) {
          console.error("Error fetching content:", error);
        }
      };

      fetchData();
    }
  }, [slug]);

  if (!slug) {
    return <div>Loading blog post...</div>;
  }

  return (
    <>
      {/* Main blog post content */}
      {content ? (
        <RenderBuilderContent content={content} model="blog-post" />
      ) : (
        <div>⚠️ Blog post not found</div>
      )}

      {/* Optional: layout section */}
      <BuilderComponent model="blog-post-layout" />
    </>
  );
}