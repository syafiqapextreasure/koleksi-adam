import { routes } from "../lib/content";
import { pageUrl } from "../lib/seo";

export const dynamic = "force-static";

export default function sitemap() {
  return routes.flatMap((page) => [false, true].map((bm) => ({
    url: pageUrl(page, bm),
    alternates: { languages: {
      "en-MY": pageUrl(page),
      "ms-MY": pageUrl(page, true),
      "x-default": pageUrl(page),
    } },
  })));
}
