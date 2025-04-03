// app/blog/[slug]/page.tsx

"use client";

import { builder, BuilderComponent, BuilderContent } from "@builder.io/react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";



interface PageProps {
  params: {
    slug: string;
    locale: "en-US" | "en-GB" | "en-CA" | "en-AU" | "es-ES";
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const [content, setContent] = useState<BuilderContent | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug, locale } = params;

  useEffect(() => {
    builder
      .get("blog-post", {
        userAttributes: {
          urlPath: `/blog/${slug}`,
          locale: locale,
        },
      })
      .toPromise()
      .then((result) => {
        setContent(result);
        setLoading(false);
      });
  }, [slug, locale]);

  if (loading) return <div>Loading...</div>;
  if (!content) return notFound();

  return <BuilderComponent model="blog-post" content={content} />;
}
