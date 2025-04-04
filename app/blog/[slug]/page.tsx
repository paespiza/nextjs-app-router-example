"use client";

import { builder, BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

// ✅ Initialize Builder with your actual API key
builder.init("f154bf67d18c42acae68064617b93b4b");

export default function BlogPostPage({ params }: { params: { slug: string; locale: string } }) {
  const { slug, locale } = params;
  const [content, setContent] = useState<any>(null);
  const isPreviewing = useIsPreviewing();

  useEffect(() => {
    builder
      .get("blog-post", {
        userAttributes: {
          urlPath: `/blog/${slug}`,
          locale,
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
