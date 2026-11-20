# Koleksi Adam

Bilingual Next.js catalogue and installation website for Koleksi Adam in Klang. English starts at `/` and Bahasa Malaysia at `/bm`. Product and service URLs are extensionless. Cloudflare permanently redirects old `.html` links and retains their query strings.

## Install on Cloudflare Workers

1. In **Workers & Pages**, create a **Worker**, choose **Import a repository** and select the GitHub repository. Use the directory containing this README as the root directory.
2. Name the Worker **koleksi-adam** to match `wrangler.jsonc`. Set **Build command** to `npm run build:worker` and **Deploy command** to `npm run deploy:worker`. Use Node.js 22.13 or later.
3. Deploy the branch. Wrangler automatically provisions the **ENQUIRIES** KV namespace on the first deployment. Check **Settings → Bindings** for the connected namespace. Subsequent deployments should use this same namespace.
4. Open the assigned `workers.dev` address. Check both languages, download a catalogue, and send a test enquiry. In **Storage & databases → Workers KV**, open the bound namespace to find the submission by its UTC timestamp. To serve the public site, connect the business domain under **Settings → Domains & Routes** after acceptance.

The site includes a blog listing and one local detail page. Five other article cards link to the existing WordPress articles on the public domain. During a domain cutover, keep those article paths on their current origin, for example through explicit Worker route exclusions on the proxied WordPress origin. A Worker custom domain covering every path needs equivalent legacy-origin routing or migrated articles before cutover.

The build prerenders the English and Bahasa Malaysia pages, sitemap and robots file using Next.js. The staging script includes page HTML, Next.js navigation data, fonts, JavaScript, images and the six optimized catalogue PDFs. Cloudflare serves these from Workers Static Assets. The Worker validates enquiries and writes them to private KV before returning success. Form submissions appear in KV. Email notifications require a separate integration. WhatsApp and Shopee links open the existing business channels.

## Local development

```sh
npm ci
npm run dev
```

The standard Next.js development server stores accepted enquiries in `.private/enquiries.ndjson`. Set `ENQUIRY_DIRECTORY` for an alternate local location. The `predev` and `prebuild` tasks make the six web PDFs available at their existing `/catalogues/` addresses.

## Preview and deploy from a terminal

```sh
npm ci
npm run build:worker
npm run preview:worker
```

The Worker preview uses local persistent KV. To deploy to your own Cloudflare account, authenticate Wrangler, then run `npm run deploy:worker`. The preview and deploy scripts use a pinned Wrangler CLI.

Keyword priorities and competitor sites are in [the search research](SEARCH-RESEARCH.md). Hosting references are in [Cloudflare’s assets guide](https://developers.cloudflare.com/workers/static-assets/binding/) and [Wrangler’s automatic provisioning guide](https://developers.cloudflare.com/workers/wrangler/configuration/#automatic-provisioning).

