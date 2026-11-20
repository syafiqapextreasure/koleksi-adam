import { articles, articlePath } from "./articles";
import optimizedImages from "../data/image-files.json";
import design from "../data/design.json";

export { design };
export const categories = [
  "loop",
  "tiles",
  "cut-design",
  "cut-plain",
  "mosque",
  "clearance",
];
export const collectionPaths = [
  "collections/loop-pile",
  "collections/carpet-tiles",
  "collections/cut-pile-design",
  "collections/cut-pile-plain",
  "mosque-carpets",
  "collections/mosque-clearance",
];
export const filenames = [
  "LOOP PILE FULL 2024_2025.pdf",
  "2026 CARPET TILES.pdf",
  "2026 CUT PILE DESIGN.pdf",
  "2026 CUT PILE PLAIN.pdf",
  "2026 MOSQUE CARPET.pdf",
  "2026_2027 MOSQUE CARPET CLEARANCE.pdf",
];
export const pdf = (i, page) =>
  "/catalogues/" +
  encodeURIComponent(filenames[i]) +
  (page ? "#page=" + page : "");
export const productPaths = [
  "products/royal-iconic",
  "products/hilora-s",
  "products/kaayna-raudah",
];
export const routes = [
  "",
  "about",
  "office-carpets",
  "home-carpets",
  "flooring",
  "blog",
  ...articles.map(articlePath),
  "contact",
  "collections",
  ...collectionPaths,
  ...productPaths,
  "downloads",
  "underlay",
];
export const titles = {
  "": ["Home", "Utama"],
  about: ["About us", "Tentang kami"],
  collections: ["All collections", "Semua koleksi"],
  downloads: ["Catalogue downloads", "Muat turun katalog"],
  underlay: ["Underlay and accessories", "Alas dan aksesori"],
  contact: ["Contact us", "Hubungi kami"],
  blog: ["Our blog", "Blog kami"],
  ...Object.fromEntries(articles.map(article => [articlePath(article), article.title])),
  "office-carpets": ["Office carpet installation", "Pemasangan karpet pejabat"],
  "home-carpets": [
    "Carpets and rugs for your home",
    "Karpet dan permaidani rumah",
  ],
  flooring: [
    "SPC, vinyl and laminate flooring",
    "Lantai SPC, vinil dan lamina",
  ],
};
export const catBM = [
  "Karpet gelung",
  "Jubin karpet",
  "Karpet potong bercorak",
  "Karpet potong polos",
  "Karpet masjid",
  "Jualan penghabisan karpet masjid",
];
export const descBM = [
  "Permukaan bertekstur untuk kediaman dan ruang komersial.",
  "Jubin segi empat dan papan karpet untuk pelbagai susun atur.",
  "Terokai corak dan kemasan hiasan.",
  "Tekstur lembut dan warna sepadan untuk ruang dalaman.",
  "Bandingkan reka bentuk saf, warna dan lebar gulungan.",
  "Pilihan daripada katalog penghabisan stok. Hubungi kami untuk ketersediaan.",
];
collectionPaths.forEach(
  (p, i) => (titles[p] = [design.collectionItems[i].title, catBM[i]]),
);
productPaths.forEach(
  (p, i) => (titles[p] = [design.products[i].name, design.products[i].name]),
);
export const img = (name) => {
  const file = /\.(png|jpg|webp)$/.test(name) ? name : name + ".jpg";
  return "/images/" + (optimizedImages[file] || file);
};
export const whatsapp = (message = "") =>
  "https://wa.me/60133267693" +
  (message ? "?text=" + encodeURIComponent(message) : "");
export const shopee = "https://shopee.com.my/koleksi.adam.karpet";
export const address =
  "23 Jalan Taman, Off Jalan Melayu, Kawasan 18, 41400 Klang, Selangor";
