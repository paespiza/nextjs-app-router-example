"use client";

import { ComponentProps } from "react";
import { BuilderComponent, useIsPreviewing, builder } from "@builder.io/react";
import DefaultErrorPage from "next/error";

builder.init("f154bf67d18c42acae68064617b93b4b");

type BuilderPageProps = ComponentProps<typeof BuilderComponent>;

export function RenderBuilderContent(props: BuilderPageProps) {
  const isPreviewing = useIsPreviewing();

  if (props.content || isPreviewing) {
    return <BuilderComponent {...props} />;
  }

  return <DefaultErrorPage statusCode={404} />;
}
