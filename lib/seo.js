import { titles } from "./content";

export const origin = "https://www.adamkarpets.com.my";
export const pageUrl = (page, bm = false) =>
  origin + (bm ? "/bm" : "") + (page ? "/" + page : bm ? "" : "/");

const headline = {
  "": ["Carpet Supplier in Klang, Selangor", "Pembekal Karpet di Klang, Selangor"],
  about: ["About Our Klang Carpet Showroom", "Tentang Kedai Karpet Kami di Klang"],
  contact: ["Contact the Klang Carpet Showroom", "Hubungi Kedai Karpet Klang"],
  "mosque-carpets": ["Mosque & Surau Carpet Installation in Malaysia", "Pemasangan Karpet Masjid dan Surau di Malaysia"],
  "office-carpets": ["Office Carpet Installation in Selangor", "Pemasangan Karpet Pejabat di Selangor"],
  "collections/carpet-tiles": ["Office Carpet Tiles & Carpet Planks", "Jubin Karpet Pejabat dan Karpet Plank"],
};
const description = {
  "": ["Visit Koleksi Adam in Klang, Selangor for mosque carpets, office carpet tiles and home rugs. Browse six catalogues and enquire about installation.", "Kunjungi Koleksi Adam di Klang, Selangor untuk karpet masjid, jubin karpet pejabat dan permaidani rumah. Lihat enam katalog dan tanya tentang pemasangan."],
  about: ["Meet the Klang carpet team established in 2011. Explore its mosque, home and office installation work and showroom services.", "Kenali pasukan karpet di Klang yang ditubuhkan pada 2011. Lihat hasil pemasangan untuk masjid, rumah dan pejabat serta perkhidmatan bilik pameran."],
  contact: ["Find Koleksi Adam’s carpet showroom in Klang, Selangor. Get directions, call the team or send measurements for an installation quotation.", "Cari alamat dan arah ke kedai karpet Koleksi Adam di Klang, Selangor. Hubungi pasukan kami atau hantar ukuran untuk sebut harga pemasangan."],
  "mosque-carpets": ["Compare mosque and surau carpets by colour and prayer-row design. View installed projects and request a quotation for your prayer hall.", "Bandingkan karpet masjid dan surau mengikut warna serta reka bentuk saf. Lihat projek siap dan minta sebut harga untuk ruang solat anda."],
  "office-carpets": ["Compare carpet tiles, loop pile and patterned broadloom for your office in Selangor. Send your location and floor area for installation advice.", "Bandingkan jubin karpet, karpet gelung dan karpet gulung bercorak untuk pejabat di Selangor. Hantar lokasi dan keluasan lantai untuk nasihat pemasangan."],
  "home-carpets": ["Explore Tehran Classic, Greek Olympia and modern rugs for Malaysian homes. Compare patterns and check current sizes and availability via Shopee.", "Terokai permaidani Tehran Classic, Greek Olympia dan rekaan moden untuk rumah. Bandingkan corak dan semak saiz serta ketersediaan di Shopee."],
  flooring: ["Explore SPC, vinyl and laminate floor installations for homes, schools, offices and cafés. Contact the Klang team to discuss your project.", "Lihat pemasangan lantai SPC, vinil dan lamina untuk rumah, sekolah, pejabat dan kafe. Bincangkan projek anda dengan pasukan kami di Klang."],
  blog: ["Read Koleksi Adam’s guides to carpet selection, replacement and laminate floors for homes and workplaces in Malaysia.", "Baca panduan Koleksi Adam tentang pemilihan dan penggantian karpet serta lantai lamina untuk rumah dan tempat kerja di Malaysia."],
  "blog/laminate-flooring": ["Is laminate flooring suitable for your room? Learn about moisture, cleaning, installation and how to choose a board for your home.", "Adakah lantai lamina sesuai untuk bilik anda? Ketahui kesan kelembapan, cara penjagaan, pemasangan dan pemilihan papan untuk rumah."],
  collections: ["Browse six Malaysian carpet catalogues for homes, offices, mosques and suraus. Compare loop pile, cut pile, modular tiles and prayer-hall ranges.", "Semak enam katalog karpet untuk rumah, pejabat, masjid dan surau. Bandingkan karpet gelung, karpet potong, jubin modular dan koleksi ruang solat."],
  downloads: ["Open the six Koleksi Adam PDF catalogues, including 2026 carpet tiles, cut pile, mosque carpets and the 2026–2027 mosque clearance edition.", "Buka enam katalog PDF Koleksi Adam termasuk jubin karpet, karpet potong, karpet masjid 2026 dan edisi penghabisan stok masjid 2026–2027."],
  underlay: ["Compare PU, rubber and sponge carpet underlay by thickness. Ask the Klang team about compatibility and accessories before installation.", "Bandingkan ketebalan alas karpet PU, getah dan span. Tanya pasukan Klang tentang kesesuaian alas dan aksesori sebelum pemasangan."],
  "collections/loop-pile": ["Browse textured loop pile carpet for homes and commercial spaces. Compare collections, colours and roll widths in the supplier catalogue.", "Terokai karpet gelung bertekstur untuk rumah dan ruang komersial. Bandingkan koleksi, warna dan lebar gulungan dalam katalog pembekal."],
  "collections/carpet-tiles": ["Compare office carpet tiles and planks by size, colour and collection. Explore square tiles and 25 × 100 cm planks in the 2026 catalogue.", "Bandingkan jubin karpet pejabat mengikut saiz, warna dan koleksi. Lihat jubin persegi dan karpet plank 25 × 100 cm dalam katalog 2026."],
  "collections/cut-pile-design": ["Discover patterned cut pile carpet, including Arrow and Roxbury Chantelle. Browse geometric designs, colours and catalogue specifications.", "Terokai karpet potong bercorak termasuk Arrow dan Roxbury Chantelle. Lihat rekaan geometri, pilihan warna dan spesifikasi katalog."],
  "collections/cut-pile-plain": ["Choose plain cut pile carpets by colour, material and collection. Compare indoor finishes and open the full 2026 catalogue.", "Pilih karpet potong polos mengikut warna, bahan dan koleksi. Bandingkan kemasan dalaman dan buka katalog penuh 2026."],
  "collections/mosque-clearance": ["Browse clearance mosque carpet designs from the 2026–2027 catalogue. Ask the team to confirm the available quantity, colour and price.", "Lihat pilihan karpet masjid dalam katalog penghabisan stok 2026–2027. Hubungi pasukan untuk mengesahkan kuantiti, warna dan harga semasa."],
  "products/royal-iconic": ["Compare Royal Iconic carpet swatches for indoor use. Check pile direction, dye lot and the supplier catalogue before requesting a sample.", "Bandingkan warna karpet Royal Iconic untuk ruang dalaman. Semak arah bulu, kelompok pewarna dan katalog pembekal sebelum meminta sampel."],
  "products/hilora-s": ["Explore Hilora-S 50 × 50 cm carpet tiles, compare colours and see the quarter-turn layout before requesting samples for your project.", "Lihat jubin karpet Hilora-S 50 × 50 cm, bandingkan warna dan semak susunan suku pusingan sebelum meminta sampel untuk projek anda."],
  "products/kaayna-raudah": ["Compare Kaayna Raudah mosque carpet colours and prayer-row patterns. Share your hall measurements to discuss roll width and installation.", "Bandingkan warna karpet masjid Kaayna Raudah dan corak saf. Kongsikan ukuran ruang solat untuk membincangkan lebar gulungan dan pemasangan."],
};

const images = {
  "mosque-carpets": "mosque-red-carpet-opt.webp",
  "office-carpets": "office-hero-opt.webp",
  flooring: "flooring-installation-opt.webp",
  "collections/carpet-tiles": "collection-hero-1.webp",
  "products/hilora-s": "hilora-opt.webp",
  "products/kaayna-raudah": "kaayna-green-opt.webp",
  contact: "showroom-opt.webp",
};

export function pageSeo(page, bm) {
  const lang = Number(bm);
  return {
    title: (headline[page] || titles[page])[lang] + " | Koleksi Adam",
    summary: description[page][lang],
    image: origin + "/images/" + (images[page] || "showroom-prayer-hall-opt.webp"),
  };
}
