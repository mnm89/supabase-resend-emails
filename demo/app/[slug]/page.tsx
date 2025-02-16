import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  try {
    const { default: Content } = await import(`@/content/${slug}.mdx`);

    return <Content />;
  } catch {
    return notFound();
  }
}

export function generateStaticParams() {
  return [{ slug: "privacy-policy" }, { slug: "terms-of-service" }];
}

export const dynamicParams = false;
