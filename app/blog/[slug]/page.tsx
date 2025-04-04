"use client";

import { builder, BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

// Hardcode your API key here
builder.init("f154bf67d18c42acae68064617b93b4b");

interface PageProps {
  params: {
    slug: string;
    locale: "en-US" | "en-GB" | "en-CA" | "en-AU" | "es-ES";
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const { slug, locale } = params;
  const [content, setContent] = useState<any>(null);
  const isPreviewing = useIsPreviewing();

  useEffect(() => {
    builder
      .get("blog-post", {
        userAttributes: {
          urlPath: `/blog/${slug}`,
          locale: locale,
        },
      })
      .toPromise()
      .then((result) => setContent(result));
  }, [slug, locale]);

  if (!content && !isPreviewing) {
    notFound();
  }

  return <BuilderComponent model="blog-post" content={content} />;
}
