import { builder } from '@builder.io/react';
import { RenderBuilderContent } from '@/components/builder';
import { notFound } from 'next/navigation';
import { cache } from 'react';

const getContent = cache(async (slug: string, locale: string) => {
  const content = await builder
    .get('blog-post', {
      userAttributes: {
        urlPath: `/blog/${slug}`,
        locale,
      },
    })
    .toPromise();

  return content;
});

export default async function BlogPostPage({ params }: { params: { slug: string; locale: string } }) {
  const { slug, locale } = params;
  const content = await getContent(slug, locale);

  if (!content) return notFound();

  return <RenderBuilderContent content={content} model="blog-post" />;
}
