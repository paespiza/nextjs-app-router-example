"use client";

import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";
import { BuilderComponent } from "@builder.io/react";
import { useState, useEffect } from "react";

export default function BlogPostPage({ params }: any) {
  const [content, setContent] = useState(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [locale, setLocale] = useState<string | null>(null); // ✅ add locale state

  // Fetch slug and locale from params
  useEffect(() => {
    if (params?.slug) {
      setSlug(params.slug);
    }
    if (params?.locale) {
      setLocale(params.locale);
    }
  }, [params]);

  // Fetch content with slug + locale
  useEffect(() => {
    if (slug && locale) {
      const fetchData = async () => {
        try {
          const contentData = await builder
            .get("blog-post", {
              userAttributes: {
                urlPath: `/blog/${slug}`,
                locale: locale, // ✅ pass locale here
              },
            })
            .toPromise();
          setContent(contentData);
        } catch (error) {
          console.error("Error fetching content:", error);
        }
      };

      fetchData();
    }
  }, [slug, locale]);

  if (!slug) {
    return <div>Loading blog post...</div>;
  }

  return (
    <>
      {content ? (
        <RenderBuilderContent content={content} model="blog-post" />
      ) : (
        <div>⚠️ Blog post not found</div>
      )}

      <BuilderComponent model="blog-post-layout" />
    </>
  );
}
