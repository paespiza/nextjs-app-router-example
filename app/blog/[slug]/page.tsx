"use client";

import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";
import { useState, useEffect } from "react";

// Initialize Builder API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function BlogPostPage({ params }: any) {
  const [content, setContent] = useState(null);
  const [slug, setSlug] = useState<string | null>(null);

  // Fetch slug from params when component mounts or changes
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;  // Unwrap params using React.use()
      if (resolvedParams?.slug) {
        setSlug(resolvedParams.slug);
      }
    };
    resolveParams();
  }, [params]);  // Re-run when params changes

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

  // Display loading message if slug is not yet set
  if (!slug) {
    return <div>Loading blog post...</div>;
  }

  return content ? (
    <RenderBuilderContent content={content} model="blog-post" />
  ) : (
    <div>⚠️ Blog post not found</div>
  );
}
