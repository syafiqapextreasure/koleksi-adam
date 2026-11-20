import Head from "next/head";
import Site from "../ui/Site";
import { routes, categories, collectionPaths } from "../lib/content";
import { origin, pageSeo, pageUrl } from "../lib/seo";
import filters from "../data/catalogue-filters.json";
import register from "../data/register.json";
export function getStaticPaths() {
  return {
    paths: [
      ...routes.map((p) => ({ params: { slug: p ? p.split("/") : [] } })),
      ...routes.map((p) => ({
        params: { slug: ["bm", ...(p ? p.split("/") : [])] },
      })),
    ],
    fallback: false,
  };
}
export function getStaticProps({ params }) {
  const parts = params.slug || [],
    bm = parts[0] === "bm",
    page = (bm ? parts.slice(1) : parts).join("/");
  const category = categories[collectionPaths.indexOf(page)];
  const families = register
    .filter((r) => r.source_key === category)
    .map((r) => ({ name: r.collection, page: Number(r.source_page_start), tags: filters[category]?.[r.collection] || {} }));
  return { props: { bm, page, families } };
}
export default function Route(props) {
  const { bm, page } = props;
  const { title, summary, image } = pageSeo(page, bm);
  const canonical = pageUrl(page, bm);
  const entity = origin + "/#business";
  const business = {
    "@type": "Store", "@id": entity, name: "Koleksi Adam", url: origin,
    image: origin + "/images/showroom-opt.webp", telephone: "+60133267693",
    email: "sales@adamkarpets.com.my",
    address: { "@type": "PostalAddress", streetAddress: "23 Jalan Taman, Off Jalan Melayu, Kawasan 18", postalCode: "41400", addressLocality: "Klang", addressRegion: "Selangor", addressCountry: "MY" },
  };
  const graph = [
    business,
    { "@type": page === "blog/laminate-flooring" ? "Article" : page === "contact" ? "ContactPage" : "WebPage",
      "@id": canonical + "#page", url: canonical, name: title, description: summary,
      inLanguage: bm ? "ms-MY" : "en-MY", publisher: { "@id": entity }, image,
      ...(page === "blog/laminate-flooring" ? { headline: title.split(" | ")[0], author: { "@id": entity }, mainEntityOfPage: canonical } : {}) },
  ];
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={summary} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en-MY" href={pageUrl(page)} />
        <link rel="alternate" hrefLang="ms-MY" href={pageUrl(page, true)} />
        <link rel="alternate" hrefLang="x-default" href={pageUrl(page)} />
        <meta property="og:site_name" content="Koleksi Adam" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={summary} />
        <meta property="og:type" content={page === "blog/laminate-flooring" ? "article" : "website"} />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content={bm ? "ms_MY" : "en_MY"} />
        <meta property="og:locale:alternate" content={bm ? "en_MY" : "ms_MY"} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }} />
      </Head>
      <Site key={String(bm) + page} {...props} />
    </>
  );
}
