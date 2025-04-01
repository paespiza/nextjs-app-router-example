import React from "react";
import { builder } from "@builder.io/sdk";
import Head from "next/head";
import { RenderBuilderContent } from "@/components/builder";

// Replace with your Public API Key
builder.init("YJIGb4i01jvw0SRdL5Bt");

interface PageProps {
  params: {
    page?: string[];
  };
}


export default async function Page({ params }: PageProps) {
  const urlPath = '/' + (params.page?.join('/') || '');

  const content = await builder
    .get('page', {
      userAttributes: { urlPath },
      options: { enrich: true },
    })
    .toPromise();

  return content ? (
    <RenderBuilderContent content={content} model="page" />
  ) : (
    <div>⚠️ No content found at path `{urlPath}`.</div>
  );
}

