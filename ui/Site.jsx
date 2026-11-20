import { articles, articlesByPath, articlePath } from "../lib/articles";
import stylesArticle from "../styles/article.module.css";
import restoredHeroes from "../data/restored-heroes.json";
import cataloguePhotos from "../data/catalogue-photos.json";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import Link from "next/link";
import reviews from "../data/google-reviews.json";
import installations from "../data/installation-projects.json";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  ShoppingBag,
  Download,
} from "lucide-react";
import {
  design,
  categories,
  collectionPaths,
  productPaths,
  titles,
  catBM,
  descBM,
  pdf,
  img,
  whatsapp,
  shopee,
  address,
} from "../lib/content";
const Context = createContext(null);
const useSite = () => useContext(Context);
function Go({ to = "", children, ...props }) {
  const { url } = useSite();
  return (
    <Link href={url(to)} {...props}>
      {children}
    </Link>
  );
}
function RestoredImage({ image, alt, ...props }) {
  return (
    <picture>
      <source type="image/avif" srcSet={image.srcSet.replaceAll(".webp", ".avif")} sizes="100vw" />
      <img {...image} sizes="100vw" alt={alt} {...props} />
    </picture>
  );
}
function Hero({ title, photo, desc, home = false, children }) {
  const artwork = {
    "mosque-hero": "mosque-red-carpet",
    "showroom-prayer-hall": "showroom-prayer-hall",
    "floor-hero.png": "flooring-installation",
    "blog-home.png": "prayer-rug-display",
    "blog-floor.png": "blog-floor.png",
  }[photo];
  const key = artwork || photo;
  const imageProps = {
    className: "heroimage " + (artwork ? "pregraded" : ""),
    alt: title,
    fetchPriority: "high",
  };
  return (
    <header
      className={
        "hero " + (home ? "homehero " : "") + (artwork ? "photohero" : "")
      }
    >
      {restoredHeroes[key] ? (
        <RestoredImage image={restoredHeroes[key]} {...imageProps} />
      ) : (
        <img src={img(key)} {...cataloguePhotos[key]} sizes="100vw" {...imageProps} />
      )}
      <div className="wrap">
        <h1>{title}</h1>
        {desc && <p>{desc}</p>}
        {children}
      </div>
    </header>
  );
}
function Btn({ to, href, children, green = false }) {
  const props = { className: "btn " + (green ? "green" : "") };
  return href ? (
    <a href={href} {...props}>
      {green && <MessageCircle size={19} />} {children}
    </a>
  ) : (
    <Go to={to} {...props}>
      {children}
    </Go>
  );
}
// Brand glyphs from Font Awesome Free 6.7.2 (CC BY 4.0), https://fontawesome.com/license/free
function Social() {
  return (
    <span className="social">
      <a aria-label="Facebook" href="https://www.facebook.com/officecarpetKA">
        <svg aria-hidden="true" viewBox="0 0 320 512" fill="currentColor"><path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" /></svg>
      </a>
      <a aria-label="Instagram" href="https://www.instagram.com/koleksiadam/">
        <svg aria-hidden="true" viewBox="0 0 448 512" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
      </a>
      <a aria-label="TikTok" href="https://www.tiktok.com/@koleksiadam">
        <svg aria-hidden="true" viewBox="0 0 448 512" fill="currentColor"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" /></svg>
      </a>
    </span>
  );
}
const productMenu = [
  "collections", "mosque-carpets",
  ...collectionPaths.filter(path => path !== "mosque-carpets"),
  "office-carpets", "home-carpets", "flooring", "underlay", "downloads",
];
function Header() {
  const { bm, t, page, title } = useSite(),
    [open, set] = useState(false),
    [products, show] = useState(false);
  const lang = (
    <span className="langs">
      <a
        href={"/bm" + (page ? "/" + page : "")}
        aria-current={bm ? "page" : undefined}
      >
        BM
      </a>{" "}
      |{" "}
      <a href={"/" + page} aria-current={!bm ? "page" : undefined}>
        EN
      </a>
    </span>
  );
  return (
    <>
      <a className="skip" href="#main">
        {t("Skip to content", "Langkau ke kandungan")}
      </a>
      <div className="top">
        <div className="wrap">
          <span>
            <img className="navflag" src="/images/malaysia-flag.svg" width="24" height="12" alt="" />
            {t(
              "Proudly serving Malaysia since 2011",
              "Berkhidmat di Malaysia sejak 2011",
            )}
            　{lang}
          </span>
          <span className="toplinks">
            <a href="tel:+60133267693">
              <Phone /> +6013–326 7693
            </a>
            <a href="mailto:sales@adamkarpets.com.my">
              <Mail /> sales@adamkarpets.com.my
            </a>
          </span>
        </div>
      </div>
      <nav
        aria-label={t("Main navigation", "Navigasi utama")}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            show(false);
            set(false);
          }
        }}
      >
        <div className="wrap navrow">
          <div className="navlinks">
            <Go to="about">{title("about")}</Go>
            <button aria-expanded={products} onClick={() => show(!products)}>
              {t("Products", "Produk")} <ChevronDown size={17} />
            </button>
            <Go to="blog">Blog</Go>
          </div>
          <Go className="brand">
            <img src="/images/koleksi-adam.svg" width="231" height="29" alt="Koleksi Adam" />
          </Go>
          <div className="navlinks">
            <Go to="contact">{title("contact")}</Go>
            <Social />
          </div>
          <button
            className="hamb"
            aria-label={t("Menu", "Menu")}
            aria-expanded={open}
            onClick={() => set(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {(open || products) && (
          <div className="drop">
            <div className="wrap">
              {(open ? ["", "about", ...productMenu, "blog", "contact"] : productMenu).map((p) => (
                <Go key={p} to={p}>
                  {title(p)}
                </Go>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
function Cards({ items }) {
  return (
    <div className="cards">
      {items.map(({ name, category, desc, photo, to, href, label, cover }) => {
        const inside = (
          <>
            <img
              loading="lazy"
              className={cover ? "cover" : ""}
              src={img(photo)}
              alt={name}
            />
            <div className="cardbody">
              {category && <small>{category}</small>}
              <h3>{name}</h3>
              {desc && <p>{desc}</p>}
              {label && <b>{label}</b>}
            </div>
          </>
        );
        return href ? (
          <a key={name} className="card" href={href}>
            {inside}
          </a>
        ) : (
          <Go key={name} className="card" to={to}>
            {inside}
          </Go>
        );
      })}
    </div>
  );
}
function Group({ children, pale = false }) {
  return (
    <section className={"group " + (pale ? "pale" : "")}>
      <div className="wrap">{children}</div>
    </section>
  );
}
function CategoryCards({ indices = [0, 1, 2, 3, 4, 5], examples = {} }) {
  const { bm, t } = useSite();
  return (
    <Cards
      items={indices.map((i) => ({
        name: bm ? catBM[i] : design.collectionItems[i].title,
        category: bm
          ? [
              "KARPET GULUNG",
              "MODULAR",
              "BERCORAK",
              "WARNA POLOS",
              "MASJID & SURAU",
              "PENGHABISAN 2026 / 2027",
            ][i]
          : design.collectionItems[i].category,
        desc: bm ? descBM[i] : design.collectionItems[i].description,
        photo: examples[i] ? familyPhoto(i, examples[i]) : i === 2 ? familyPhoto(i, "Boulevard") : design.collectionItems[i].image,
        to: collectionPaths[i],
        label: t("View collection", "Lihat koleksi"),
      }))}
    />
  );
}
function Cta() {
  const { t } = useSite();
  return (
    <Group pale>
      <h2>
        {t(
          "Find the right carpet for your space.",
          "Cari karpet yang sesuai untuk ruang anda.",
        )}
      </h2>
      <p>
        {t(
          "Compare colours and specifications, then ask our team about samples, availability and installation.",
          "Bandingkan warna dan spesifikasi. Hubungi kami untuk sampel, ketersediaan dan pemasangan.",
        )}
      </p>
      <div className="actions">
        <Btn to="downloads">
          {t("View catalogue downloads", "Lihat katalog")}
        </Btn>
        <Btn href={whatsapp()} green>
          {t("WhatsApp our team", "WhatsApp kami")}
        </Btn>
      </div>
    </Group>
  );
}
const quoteQuestions = {
  "mosque-carpets": [
    ["How do I get a mosque carpet quotation?", "Bagaimanakah cara mendapatkan sebut harga karpet masjid?"],
    ["Send your mosque or surau location, prayer-hall dimensions and preferred design. Our team can discuss roll width, saf alignment and installation.", "Hantar lokasi masjid atau surau, ukuran ruang solat dan rekaan pilihan. Pasukan kami boleh membincangkan lebar gulungan, penjajaran saf dan pemasangan."],
  ],
  "office-carpets": [
    ["What should I send for an office carpet quotation?", "Apakah maklumat yang diperlukan untuk sebut harga karpet pejabat?"],
    ["Include the office location, floor area and rooms to be covered. Tell us whether you prefer modular carpet tiles or wall-to-wall carpet so we can advise on installation.", "Sertakan lokasi pejabat, keluasan lantai dan bilik yang memerlukan karpet. Nyatakan pilihan jubin karpet modular atau karpet dinding ke dinding untuk nasihat pemasangan."],
  ],
  flooring: [
    ["How do I compare floors for my room?", "Bagaimanakah cara membandingkan jenis lantai untuk bilik saya?"],
    ["Share the room size, its use and a photo of the existing floor. Our Klang team can help you compare SPC, vinyl and laminate for the space.", "Kongsikan ukuran bilik, kegunaannya dan foto lantai sedia ada. Pasukan kami di Klang boleh membantu anda membandingkan lantai SPC, vinil dan lamina untuk ruang tersebut."],
  ],
};
function Contact() {
  const { t, bm, page, title } = useSite(),
    [state, set] = useState("idle");
  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    set("sending");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw Error();
      form.reset();
      set("done");
    } catch {
      set("error");
    }
  }
  return (
    <Group>
      <div id="enquiry" className="contactgrid">
        <form onSubmit={submit}>
          <h2>
            {quoteQuestions[page] ? t(...quoteQuestions[page][0]) : t(
              "Contact us for a full range of designs.",
              "Hubungi kami untuk pilihan reka bentuk lengkap.",
            )}
          </h2>
          {quoteQuestions[page] && <p>{t(...quoteQuestions[page][1])}</p>}
          {[
            ["name", "text", t("Full name", "Nama penuh")],
            ["email", "email", t("Email address", "Alamat e-mel")],
            ["phone", "tel", t("Phone number", "Nombor telefon")],
          ].map(([name, type, label]) => (
            <input
              key={name}
              aria-label={label}
              name={name}
              type={type}
              required
              maxLength={180}
              pattern={name === "phone" ? "[+0-9 ()\\-]{7,24}" : undefined}
              placeholder={label + "*"}
            />
          ))}
          <select
            required
            aria-label={t("Collection or service", "Koleksi atau perkhidmatan")}
            name="collection"
            defaultValue={
              collectionPaths.includes(page) || productPaths.includes(page)
                ? title(page)
                : ""
            }
          >
            <option disabled value="">
              {t(
                "Select a collection / service",
                "Pilih koleksi / perkhidmatan",
              )}
            </option>
            {[
              ...collectionPaths,
              ...productPaths,
              "flooring",
              "underlay",
              "contact",
            ].map((p) => (
              <option key={p}>{title(p)}</option>
            ))}
          </select>
          <textarea
            required
            maxLength={3000}
            name="message"
            aria-label={t("Message", "Mesej")}
            placeholder={t(
              "Project location, size and preferred collection",
              "Lokasi projek, saiz dan koleksi pilihan",
            )}
          />
          <label className="consent">
            <input type="checkbox" name="consent" required />
            {t(
              "I agree to be contacted about this enquiry.",
              "Saya bersetuju dihubungi mengenai pertanyaan ini.",
            )}
          </label>
          <button className="btn" disabled={state === "sending"}>
            {state === "sending"
              ? t("Sending…", "Menghantar…")
              : t("Submit enquiry", "Hantar pertanyaan")}
          </button>
          <span role="status">
            {state === "done"
              ? t(
                  "Your enquiry has been recorded.",
                  "Pertanyaan anda telah direkodkan.",
                )
              : state === "error"
                ? t(
                    "Please check your details and try again, or WhatsApp us.",
                    "Sila semak butiran dan cuba lagi atau WhatsApp kami.",
                  )
                : ""}
          </span>
        </form>
        <aside className="location">
          <div className="showroom-map">
            <iframe title={t("Koleksi Adam showroom map", "Peta bilik pameran Koleksi Adam")}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.1683015020626!2d101.44631121744382!3d3.0495607000000278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc53445dcb38d5%3A0x94711ce22eab7efe!2sKoleksi%20Adam!5e0!3m2!1sen!2sin!4v1642681771060!5m2!1sen!2sin"
              width="640" height="280" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            <a href={mapUrl}>{t("Open in Google Maps", "Buka dalam Google Maps")} ↗</a>
          </div>
          <div className="details">
            {[
              [MapPin, t("Address", "Alamat"), address],
              [Phone, t("Phone", "Telefon"), "+6013–326 7693"],
              [Mail, t("Email", "E-mel"), "sales@adamkarpets.com.my"],
              [
                MessageCircle,
                t("Visit us", "Kunjungi kami"),
                t(
                  "WhatsApp to arrange your visit",
                  "WhatsApp untuk atur kunjungan",
                ),
              ],
            ].map(([Icon, l, v]) => (
              <div key={l}>
                <Icon size={22} />
                <div>
                  <h3>{l}</h3>
                  {v}
                </div>
              </div>
            ))}
          </div>
          <Btn href={whatsapp()} green>
            {t("WhatsApp our team", "WhatsApp kami")}
          </Btn>
        </aside>
      </div>
    </Group>
  );
}
function Footer() {
  const { title, t } = useSite();
  return (
    <footer>
      <div className="wrap foot">
        <div>
          <Go>
            <img alt="Koleksi Adam" src={img("logo.png")} />
          </Go>
          <Social />
          <span>{t("Shop with", "Beli melalui")}</span>
          <a href={shopee}>
            <ShoppingBag /> Shopee
          </a>
        </div>
        <div>
          <h3>{t("Carpets", "Karpet")}</h3>
          {[
            "collections",
            "mosque-carpets",
            "office-carpets",
            "home-carpets",
          ].map((p) => (
            <Go key={p} to={p}>
              {title(p)}
            </Go>
          ))}
          <h3 className="footheading">
            {t("Other services", "Perkhidmatan lain")}
          </h3>
          {["flooring", "underlay", "downloads"].map((p) => (
            <Go to={p} key={p}>
              {title(p)}
            </Go>
          ))}
        </div>
        <div>
          <h3>{t("Our address", "Alamat kami")}</h3>
          <p>{address}</p>
          <h3 className="footheading">{title("contact")}</h3>
          <a href="tel:+60133267693">
            <Phone size={17} /> +6013–326 7693
          </a>
          <a href="mailto:sales@adamkarpets.com.my">
            <Mail size={17} /> sales@adamkarpets.com.my
          </a>
          <a href={whatsapp()}>
            <MessageCircle size={17} />{" "}
            {t(
              "WhatsApp to arrange your visit",
              "Atur kunjungan melalui WhatsApp",
            )}
          </a>
        </div>
        <Go className="footpanel" to="downloads">
          <h3>{t("Explore our catalogues", "Terokai katalog kami")}</h3>
          <p>
            {t(
              "Browse six updated catalogues and ask our team about samples, prices and installation.",
              "Terokai enam katalog terkini dan tanya pasukan kami tentang sampel, harga dan pemasangan.",
            )}
          </p>
        </Go>
      </div>
      <div className="wrap footbase">Koleksi Adam · Klang, Selangor</div>
    </footer>
  );
}
const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Koleksi Adam " + address);
function FlagStrip() {
  const { t } = useSite();
  return (
    <div className="flagstrip">
      <p>
        {t("Proudly serving Malaysia", "Berkhidmat untuk Malaysia")}
        <br />
        {t("for the past 15 years", "selama 15 tahun")}
      </p>
    </div>
  );
}
// Google Maps place 0x31cc53445dcb38d5:0x94711ce22eab7efe, checked 21 Nov 2026.
const googleReviewCount = 162;
function ReviewCount() {
  const { t } = useSite();
  const ref = useRef(null);
  const [count, setCount] = useState(googleReviewCount);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !window.IntersectionObserver) return;
    let frame;
    function finish() {
      cancelAnimationFrame(frame);
      setCount(googleReviewCount);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (motion.matches) return;
      const start = performance.now();
      function advance(now) {
        const progress = Math.min(1, (now - start) / 850);
        setCount(Math.round(googleReviewCount * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(advance);
      }
      frame = requestAnimationFrame(advance);
    });
    observer.observe(ref.current);
    motion.addEventListener("change", finish);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", finish);
    };
  }, []);
  return (
    <span ref={ref} className="review-total" title={t("Checked 21 November 2026", "Disemak 21 November 2026")}>
      <span aria-hidden="true">{count} {t("Google reviews", "ulasan Google")}</span>
      <span className="review-count-accessible">{googleReviewCount} {t("Google reviews", "ulasan Google")}</span>
    </span>
  );
}
function Reviews() {
  const { t } = useSite();
  const reviewsUrl =
    "https://www.google.com/search?q=Koleksi+Adam+google+map#lrd=0x31cc53445dcb38d5:0x94711ce22eab7efe,1,,,,";
  const [offset, setOffset] = useState(0);
  return (
    <Group>
      <div className="reviewrow">
        <h2>{t("What our client says", "Ulasan pelanggan kami")}</h2>
        <a className="ratingbadge" href={reviewsUrl}>
          <strong>G</strong>
          <span>
            Google Rating
            <br />
            <b>4.9 ★★★★★</b>
            <br />
            <ReviewCount />
            {t("See all reviews", "Lihat semua ulasan")}
          </span>
        </a>
      </div>
      <div
        className="reviewcards photoreviews"
        aria-label={t("Google photo reviews", "Ulasan bergambar Google")}
      >
        {[0, 1, 2].map((step) => {
          const i = (offset + step) % reviews.length,
            r = reviews[i];
          return (
            <figure key={r.name}>
              <div className="reviewauthor">
                <img
                  width="40"
                  height="40"
                  src={"/images/google-review-" + i + "-avatar.webp"}
                  alt=""
                />
                <div>
                  <a href={r.link}>{r.name}</a>
                  <small>{r.date}</small>
                </div>
              </div>
              <b className="stars" aria-label="5 / 5">
                ★★★★★
              </b>
              <blockquote>“{r.quote}”</blockquote>
              <a href={r.link}>
                <img
                  className="reviewshot"
                  width="150"
                  height="95"
                  src={"/images/google-review-" + i + "-photo.webp"}
                  alt={
                    t("Photo from the review by ", "Foto ulasan oleh ") + r.name
                  }
                />
              </a>
            </figure>
          );
        })}
      </div>
      <div className="reviewnav">
        <button
          aria-label={t("Previous review", "Ulasan sebelumnya")}
          onClick={() => setOffset((offset + 9) % 10)}
        >
          ‹
        </button>
        <span>
          {offset + 1} / {reviews.length}
        </span>
        <button
          aria-label={t("Next review", "Ulasan seterusnya")}
          onClick={() => setOffset((offset + 1) % 10)}
        >
          ›
        </button>
      </div>
    </Group>
  );
}
function QuotePanel() {
  const { t } = useSite();
  return (
    <div className="quote">
      <img src={img("quote-installation")} alt="" />
      <div>
        <h2>{t("Get a free quote today", "Dapatkan sebut harga percuma")}</h2>
        <p>
          {t(
            "Tell us about the space you are carpeting and our installation team will help you plan the next step.",
            "Beritahu kami tentang ruang anda untuk mendapatkan anggaran pemasangan karpet.",
          )}
        </p>
        <Btn green href={whatsapp()}>
          {t("WhatsApp our team", "WhatsApp kami")}
        </Btn>
      </div>
    </div>
  );
}
function Timeline() {
  const { t } = useSite();
  const timelineRef = useRef(null);
  useEffect(() => {
    if (!window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const list = timelineRef.current;
    const observer = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        .forEach(({ target }, index) => {
          target.style.transitionDelay = index * 105 + "ms";
          target.classList.add("revealed");
          observer.unobserve(target);
        });
    }, { threshold: 0.12 });
    list.classList.add("reveal-timeline");
    for (const item of list.children) observer.observe(item);
    return () => { observer.disconnect(); list.classList.remove("reveal-timeline"); };
  }, []);
  const milestones = [
    [
      "2011",
      "2011",
      "Established in Klang",
      "Ditubuhkan di Klang",
      "Koleksi Adam was established on 20 December 2011.",
      "Koleksi Adam ditubuhkan pada 20 Disember 2011.",
    ],
    [
      "Our collections",
      "Koleksi kami",
      "Carpets for different spaces",
      "Karpet untuk pelbagai ruang",
      "Explore carpets for homes, offices, mosques and suraus.",
      "Terokai karpet untuk kediaman, pejabat, masjid dan surau.",
    ],
    [
      "Mosque & surau",
      "Masjid & surau",
      "Prayer-hall carpets",
      "Karpet ruang solat",
      "Compare prayer-row designs, colour choices and roll widths.",
      "Bandingkan reka bentuk saf, pilihan warna dan lebar gulungan.",
    ],
    [
      "Office & home",
      "Pejabat & rumah",
      "Textures and finishes",
      "Tekstur dan kemasan",
      "Browse carpet tiles, loop pile and patterned or plain cut pile.",
      "Terokai jubin karpet, karpet gelung dan karpet potong bercorak atau polos.",
    ],
    [
      "Flooring",
      "Lantai",
      "More ways to finish your space",
      "Pilihan kemasan ruang anda",
      "Ask our team about SPC, vinyl and laminate flooring.",
      "Tanya pasukan kami tentang lantai SPC, vinil dan lamina.",
    ],
    [
      "Our process",
      "Proses kami",
      "Advice and installation",
      "Nasihat dan pemasangan",
      "Share your location, room size and preferences to request a quotation.",
      "Kongsi lokasi, saiz bilik dan pilihan anda untuk mendapatkan sebut harga.",
    ],
    [
      "Latest catalogues",
      "Katalog terkini",
      "Six updated references",
      "Enam katalog terkini",
      "Browse the latest supplied catalogues and request product samples.",
      "Semak katalog terkini dan minta sampel produk.",
    ],
  ];
  return (
    <ol className="timeline" ref={timelineRef}>
      {milestones.map(([k, m, h, j, p, q]) => (
        <li key={k}>
          <small>{t(k, m)}</small>
          <h3>{t(h, j)}</h3>
          <p>{t(p, q)}</p>
        </li>
      ))}
    </ol>
  );
}
function BlogCards({ indices = [0, 1, 2, 3, 4, 5], compact = false }) {
  const { t } = useSite();
  return (
    <Cards items={indices.map(i => {
      const article = articles[i];
      return {
        name: t(...article.title),
        photo: "blog-" + article.topic + ".png",
        desc: compact ? undefined : t(...article.summary),
        to: articlePath(article),
        label: compact ? undefined : t("Read article", "Baca artikel"),
      };
    })} />
  );
}

function JournalArticle({ article }) {
  const { t, title } = useSite();
  const [year, month, day] = article.date.split("-");
  const related = [
    [1, 5, 2], [5, 3, 0], [3, 4, 1],
    [1, 2, 5], [2, 3, 1], [1, 0, 3],
  ][articles.indexOf(article)];
  const target = (i) => article.slug + "-" + (i + 1);
  return (
    <>
      <article className={stylesArticle.story}>
        <header className={stylesArticle.header}>
          <div className={"wrap " + stylesArticle.headerGrid}>
            <div>
              <Go to="blog" className={stylesArticle.back}>← {t("All articles", "Semua artikel")}</Go>
              <h1>{t(...article.title)}</h1>
              <p className={stylesArticle.deck}>{t(...article.intro)}</p>
              <p className={stylesArticle.byline}>Koleksi Adam <span>·</span> <time dateTime={article.date}>{day}.{month}.{year}</time></p>
            </div>
            <img src={img("blog-" + article.topic + ".png")} alt={t(...article.title)} width="700" height="540" fetchPriority="high" />
          </div>
        </header>
        <div className={"wrap " + stylesArticle.bodyGrid}>
          <aside>
            <nav className={stylesArticle.contents} aria-label={t("In this article", "Dalam artikel ini")}>
              <h2>{t("In this article", "Dalam artikel ini")}</h2>
              <ol>{article.sections.map(([en, ms], i) => (
                <li key={en}><a href={"#" + target(i)}>{t(en, ms)}</a></li>
              ))}</ol>
            </nav>
          </aside>
          <div className={stylesArticle.copy}>
            {article.sections.map(([en, ms, text, terjemahan], i) => (
              <section key={en} id={target(i)}>
                <h2>{article.topic === "home" && (i + 1) + ". "}{t(en, ms)}</h2>
                <p>{t(text, terjemahan)}</p>
                {i === 0 && (
                  <figure>
                    <img src={img(article.illustration)} width="720" height="360" loading="lazy" alt={t(...article.caption)} />
                    <figcaption>{t(...article.caption)}</figcaption>
                  </figure>
                )}
              </section>
            ))}
            <Btn to={article.service}>{title(article.service)}</Btn>
          </div>
        </div>
      </article>
      <Group pale>
        <h2>{t("Related articles", "Artikel berkaitan")}</h2>
        <BlogCards indices={related} />
      </Group>
    </>
  );
}
function HomeSlider() {
  const { t } = useSite(),
    [n, set] = useState(0),
    [playing, play] = useState(false),
    [loaded, setLoaded] = useState([0]);
  useEffect(() => {
    play(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => set((i) => (i + 1) % 4), 6500);
    return () => clearInterval(timer);
  }, [playing]);
  useEffect(() => {
    if (!playing) return;
    const next = (n + 1) % 4;
    const timer = setTimeout(() => setLoaded(ids => ids.includes(next) ? ids : [...ids, next]), 3200);
    return () => clearTimeout(timer);
  }, [n, playing]);
  const slides = [
    ["Mosque Carpets", "Karpet Masjid", "mosque-prayer-hall"],
    ["Mosque Carpets", "Karpet Masjid", "mosque-red-rows"],
    ["Our Best Seller", "Pilihan Terlaris", "bestseller-prayer-carpet"],
    ["Washable Rugs", "Permaidani Boleh Basuh", "washable-prayer-rugs"],
  ];
  const change = (i) => {
    setLoaded(ids => ids.includes(i) ? ids : [...ids, i]);
    set(i);
    play(false);
  };
  return (
    <section
      className="slider"
      aria-label={t("Featured collections", "Koleksi pilihan")}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") change((n + 1) % 4);
        if (e.key === "ArrowLeft") change((n + 3) % 4);
      }}
    >
      <header className="hero homehero animatedhero">
        {slides.map(([en, ms, photo], i) => (
          <div
            key={photo}
            className={"slidephoto " + (n === i ? "current" : "")}
            aria-hidden={n !== i}
          >
            {(i === n || loaded.includes(i)) && (
              <RestoredImage image={restoredHeroes[photo]} alt={t(en, ms)}
                fetchPriority={i === 0 ? "high" : "low"} />
            )}
          </div>
        ))}
        <div className="wrap">
          <small>{t("Expert installation of", "Pemasangan profesional")}</small>
          <h1>{t(slides[n][0], slides[n][1])}</h1>
          <Btn to="contact">{t("Find Us", "Cari Kami")}</Btn>
        </div>
      </header>
      <div className="slidecontrols">
        {slides.map(([en, ms], i) => (
          <button
            key={i}
            aria-label={i + 1 + " · " + t(en, ms)}
            aria-pressed={i === n}
            onClick={() => change(i)}
          >
            ●
          </button>
        ))}
        <button
          onClick={() => play(!playing)}
          aria-label={
            playing
              ? t("Pause slideshow", "Jeda tayangan")
              : t("Play slideshow", "Mainkan tayangan")
          }
        >
          {playing ? "Ⅱ" : "▶"}
        </button>
      </div>
    </section>
  );
}
function Home() {
  const { t } = useSite(),
    [paused, setPaused] = useState(true);
  return (
    <>
      <HomeSlider />
      <Group>
        <div className="center">
          <h3>{t("About us", "Tentang kami")}</h3>
          <p className="intro">
            {t(
              "Since the establishment of Adam Collection on December 20, 2011, we have continued to assist customers, partners, traders, agencies and mosques to obtain all types of office, mosque and surau equipment such as carpets, tiles, vinyl, curtains and blinds.",
              "Sejak ditubuhkan pada 20 Disember 2011, Koleksi Adam membantu pelanggan, rakan niaga, peniaga, agensi dan masjid mendapatkan kelengkapan pejabat, masjid dan surau seperti karpet, jubin, vinil, langsir dan bidai.",
            )}
          </p>
        </div>
        <div className="tourplayer">
          <span className="tourlabel">
            {t("Installation photo tour · Illustrated cover", "Tayangan foto pemasangan · Ilustrasi muka depan")}
          </span>
          <video
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
            onEnded={() => setPaused(true)}
            className="featurephoto"
            preload="none"
            controls
            playsInline
            poster="/images/installation-tour-cover.webp"
            aria-label={t(
              "Installation photo tour",
              "Tayangan foto pemasangan",
            )}
            src="/installation-tour.mp4"
          />
          {paused && (
            <button
              type="button"
              aria-label={t(
                "Play installation tour",
                "Mainkan tayangan pemasangan",
              )}
              onClick={(e) => e.currentTarget.previousElementSibling.play()}
            >
              ▶
            </button>
          )}
        </div>
        <p>
          {t(
            "Quality service is the main focus of our business. Our installation, sales, supply and delivery teams work together to build lasting relationships with our customers.",
            "Mutu perkhidmatan menjadi keutamaan kami. Pasukan pemasangan, jualan, bekalan dan penghantaran bekerjasama untuk membina hubungan jangka panjang dengan pelanggan.",
          )}
        </p>
        <div className="actions">
          <Btn green href={whatsapp()}>
            {t("WhatsApp our team", "WhatsApp kami")}
          </Btn>
        </div>
      </Group>
      <FlagStrip />
      <Group>
        <h2>{t("Explore our collections", "Terokai koleksi kami")}</h2>
        <p>
          {t(
            "Find the right texture, colour and finish for your next project.",
            "Cari tekstur, warna dan kemasan yang sesuai untuk projek anda.",
          )}
        </p>
        <CategoryCards />
      </Group>
      <Group pale>
        <h2>{t("Our expertise", "Kepakaran kami")}</h2>
        <Services />
      </Group>
      <QuotePanel />
      <Group pale>
        <div className="center">
          <h2>{t("Our blogs", "Blog kami")}</h2>
          <p>
            {t(
              "We write about Adam Collection info, tips and activities for you to understand about carpets, rugs and laminated floors.",
              "Baca info, tip dan aktiviti Koleksi Adam mengenai karpet, permaidani dan lantai lamina.",
            )}
          </p>
        </div>
        <BlogCards indices={[0, 1, 3]} compact />
      </Group>
      <Reviews />
      <FlagStrip />
    </>
  );
}
function GalleryPhoto({ name, alt, widths = [600, 1200] }) {
  return (
    <img
      src={`/images/${name}-1200.webp`}
      srcSet={widths.map(width => `/images/${name}-${width}.webp ${width}w`).join(", ")}
      sizes="(max-width: 700px) 92vw, (min-width: 1800px) 800px, 45vw"
      width="1200" height="1200" loading="lazy" decoding="async" alt={alt}
    />
  );
}
function Services() {
  const { t } = useSite(),
    [selected, set] = useState(0);
  const routes = [
    "home-carpets",
    "mosque-carpets",
    "flooring",
    "office-carpets",
  ];
  const photos = [
    ["freeway-living-room", "patterned-carpet-room"],
    ["maroon-prayer-hall", "navy-prayer-hall"],
    ["floor-laundry", "floor-music"],
    ["office-open-plan", "office-meeting-room"],
  ];
  const photoLabels = [
    [t("Green striped carpet in a living room", "Karpet berjalur hijau di ruang tamu"), t("Patterned carpet in a sunlit interior", "Karpet bercorak di ruang yang cerah")],
    [t("Maroon prayer carpet in a bright hall", "Karpet saf merah tua di ruang solat yang cerah"), t("Navy prayer carpet with gold row borders", "Karpet saf biru tua dengan sempadan emas")],
    [t("Walnut-look laminate in a laundry room", "Lantai lamina bercorak walnut di bilik dobi"), t("Light oak-look flooring in a music room", "Lantai bercorak kayu oak cerah di bilik muzik")],
    [t("Carpet tiles throughout an open-plan office", "Jubin karpet di pejabat pelan terbuka"), t("Textured carpet tiles in a meeting room", "Jubin karpet bertekstur di bilik mesyuarat")],
  ];
  return (
    <div className="expertise">
      <p>
        {t(
          "We have extensive experience in installing carpets, vinyl flooring, curtains and blinds.",
          "Kami berpengalaman luas memasang karpet, lantai vinil, langsir dan bidai.",
        )}
      </p>
      <Chips
        label={t("Our expertise", "Kepakaran kami")}
        options={[
          t("Home Carpet", "Karpet rumah"),
          t("Mosque Carpet", "Karpet masjid"),
          t("Laminate Flooring", "Lantai lamina"),
          t("Carpet Office", "Karpet pejabat"),
        ]}
        value={selected}
        onChange={set}
      />
      <div className="gallery">
        {photos[selected].map((p, k) => (
          <Go to={routes[selected]} key={p}>
            <GalleryPhoto
              name={p}
              widths={selected === 3 ? [600, 1200, 1600] : undefined}
              alt={photoLabels[selected][k]}
            />
          </Go>
        ))}
      </div>
      <small>{t("Design visualisations", "Visualisasi reka bentuk")}</small>
    </div>
  );
}
function AdditionalServices() {
  const { t } = useSite(),
    [n, set] = useState(0);
  const names = ["Karpet Rumah", "Karpet Masjid", "Karpet Office"];
  return (
    <Group pale>
      <div className="servicepair">
        <div>
          <h2>{t("Other services", "Perkhidmatan lain")}</h2>
          <p>
            {t(
              "We provide and install vinyl or wooden flooring, curtains, and blinds.",
              "Terokai pilihan lantai, langsir dan bidai untuk ruang anda.",
            )}
          </p>
          <Chips
            label={t("Service", "Perkhidmatan")}
            options={names}
            value={n}
            onChange={set}
          />
        </div>
        <img
          {...cataloguePhotos[["about-carpet", "mosque-kebun-baru", "athenia"][n]]}
          sizes="(max-width: 650px) 92vw, (max-width: 1900px) 46vw, 860px"
          loading="lazy"
          decoding="async"
          alt={[
            t("Blue carpet with gold floral borders", "Karpet biru dengan sempadan bunga keemasan"),
            t("Green prayer-row carpet in a mosque", "Karpet saf hijau di masjid"),
            t("Installed carpet tiles around office workstations", "Jubin karpet dipasang di ruang kerja pejabat"),
          ][n]}
        />
      </div>
    </Group>
  );
}
function Collections() {
  const { bm, t } = useSite();
  const [filter, set] = useState(0);
  return (
    <>
      <Hero
        title={t("Find your perfect carpet.", "Temui karpet pilihan anda.")}
        photo="iconic-white"
      />
      <Group>
        <Crumb />
        <h2>{t("Browse our collections", "Terokai koleksi kami")}</h2>
        <p>
          {t(
            "Explore our latest catalogues by collection or by space.",
            "Terokai katalog terkini mengikut koleksi atau ruang.",
          )}
        </p>
        <div className="chips">
          {[
            t("All collections", "Semua koleksi"),
            t("Mosque & surau", "Masjid & surau"),
            t("Office", "Pejabat"),
            t("Home", "Kediaman"),
          ].map((s, i) => (
            <button aria-pressed={i === filter} key={s} onClick={() => set(i)}>
              {s}
            </button>
          ))}
        </div>
        <CategoryCards
          indices={
            [
              [0, 1, 2, 3, 4, 5],
              [4, 5],
              [1, 0, 2],
              [3, 2, 0],
            ][filter]
          }
        />
      </Group>
      <Cta />
    </>
  );
}
function Crumb() {
  const { t, title, page } = useSite();
  return (
    <p className="crumb">
      <Go>{t("Home", "Utama")}</Go> /{" "}
      <Go to="collections">{t("Collections", "Koleksi")}</Go> /{" "}
      <span aria-current="page">{title(page)}</span>
    </p>
  );
}
const facetBM = {
  "All loop pile": "Semua karpet gelung",
  "All tiles": "Semua jubin",
  "All patterns": "Semua corak",
  "All plain carpets": "Semua karpet polos",
  "All mosque carpets": "Semua karpet masjid",
  "All clearance": "Semua stok penghabisan",
  Colour: "Warna",
  Colours: "Warna",
  Texture: "Tekstur",
  "Roll width": "Lebar gulungan",
  Material: "Bahan",
  Collection: "Koleksi",
  Geometric: "Geometri",
  Clearance: "Penghabisan stok",
  Blue: "Biru",
  Gold: "Emas",
  Green: "Hijau",
  Maroon: "Merah hati",
  Grey: "Kelabu",
  Beige: "Kuning air",
  Brown: "Coklat",
  Red: "Merah",
  Black: "Hitam",
  "Graphic loop": "Gelung bergrafik",
  "Scroll loop": "Gelung skrol",
  "Loop pile": "Bulu gelung",
  "Cut loop": "Gelung potong",
  Nylon: "Nilon",
  Polyester: "Poliester",
  Polypropylene: "Polipropilena",
  Wool: "Bulu biri-biri",
};
function Chips({ options, value, onChange, label }) {
  return (
    <div className="chips" role="group" aria-label={label}>
      {options.map((s, k) => (
        <button
          key={s}
          type="button"
          aria-pressed={k === value}
          onClick={() => onChange(k)}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
function familyPhoto(category, name) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return "families/" + categories[category] + "-" + slug + ".webp";
}

function FamilyGrid({ category, rows }) {
  const { t, bm } = useSite();
  return (
    <div className="family-grid">
      {rows.map((family) => {
        const { name, page, tags, designs } = family;
        const details = [
          ["Size", "Saiz", tags.Size],
          ["Roll width", "Lebar gulungan", tags["Roll width"]],
          ["Material", "Bahan", tags.Material],
          ["Texture", "Tekstur", tags.Texture],
        ].filter(([, , values]) => values?.length).slice(0, 2);
        const translate = (value) => bm ? facetBM[value] || value : value;
        const colours = (tags.Colour || []).slice(0, 4).map(translate);
        return (
          <article className="family-card" key={name}>
            <a href={pdf(category, page)}>
              <img src={img(familyPhoto(category, name))} width="640" height="416"
                loading="lazy" decoding="async" alt={name} />
              <div className="family-copy">
                <h3>{name}</h3>
                {designs && <p>{t("Designs", "Rekaan")} · {designs}</p>}
                {colours.length > 0 && <p>{t("Catalogue colours include ", "Antara warna katalog ialah ")}{colours.join(", ")}.</p>}
                {details.length > 0 && (
                  <dl>
                    {details.map(([en, ms, values]) => (
                      <div key={en}><dt>{t(en, ms)}</dt><dd>{values.map(translate).join(" / ")}</dd></div>
                    ))}
                  </dl>
                )}
                <b>{t("View catalogue", "Lihat katalog")} · {t("p.", "hlm.")} {page} →</b>
              </div>
            </a>
          </article>
        );
      })}
    </div>
  );
}

function Category({ i, families }) {
  const { t, bm } = useSite();
  const [facet, choose] = useState(0),
    [value, select] = useState("");
  const [visibleFamilies, setVisibleFamilies] = useState(0);
  const labels = [
    ["All loop pile", "Colour", "Texture", "Roll width"],
    ["All tiles", "50 × 50 cm", "25 × 100 cm", "Colour"],
    ["All patterns", "Geometric", "Colour", "Collection"],
    ["All plain carpets", "Colour", "Material", "Collection"],
    ["All mosque carpets", "Colours", "Roll width", "Clearance"],
    ["All clearance", "Blue", "Gold", "Green", "Maroon"],
  ][i];
  const local = (k) => (bm ? facetBM[k] || k : k);
  const name = labels[facet],
    direct = [
      "Geometric",
      "50 × 50 cm",
      "25 × 100 cm",
      "Blue",
      "Gold",
      "Green",
      "Maroon",
    ].includes(name);
  const field =
    name === "Colours" || i === 5
      ? "Colour"
      : name.includes("cm")
        ? "Size"
        : name === "Geometric"
          ? "Pattern"
          : name;
  const terms = (f) =>
    field === "Collection" ? [f.name] : f.tags[field] || [];
  const options = [...new Set(families.flatMap(terms))].sort();
  const matching = facet
    ? families.filter((f) =>
        direct
          ? terms(f).includes(name)
          : value
            ? terms(f).includes(value)
            : terms(f).length > 0,
      )
    : families;
  const mosque = i === 4;
  const titlesEn = [
    "Loop pile carpets",
    "Carpet tiles",
    "Patterned carpet collections",
    "Plain colour carpets",
    "Carpet installation for mosques and suraus",
    "Mosque carpet clearance",
  ];
  const titlesMs = [
    "Karpet gelung",
    "Jubin karpet",
    "Koleksi karpet bercorak",
    "Karpet warna polos",
    "Pemasangan karpet masjid dan surau",
    "Penghabisan stok karpet masjid",
  ];
  const descriptions = [
    "Explore textured broadloom carpets, colour choices and installation options.",
    "Build your layout with square tiles or carpet planks. Browse designs and specifications.",
    "Discover decorative patterns and coordinated colours for your interior.",
    "Choose your texture and colour, then compare the collection specifications.",
    "Explore prayer-hall carpets from the 2026 catalogue. Confirm the colour and installation requirements with our team.",
    "Explore selected ranges in the 2026 / 2027 clearance catalogue.",
  ];
  const entries = [
    design.loops,
    design.tiles,
    design.patterns,
    design.plains,
    [
      {
        title: "Kaayna Raudah",
        category: "MOSQUE COLLECTION",
        image: "kaayna-maroon",
        description: "Wilton woven carpet with a level cut-pile surface.",
      },
      {
        title: "Alimah Green",
        category: "KAAYNA RAUDAH",
        image: "kaayna-green",
        description: "A colour option from the Kaayna Raudah collection.",
      },
      {
        title: "Mosque Clearance",
        category: "2026 / 2027",
        image: "ghazal",
        description: "Selected ranges. Enquire about colour availability.",
      },
    ],
    design.clearances,
  ][i];
  const ms = [
    [
      "Polipropilena 100%. Semak pilihan warna dalam katalog.",
      "Olefin BCF Duralox 100%. Warna Red (227) ditunjukkan.",
      "Olefin BCF Duralox 100%. Warna Shiko Beige (292) ditunjukkan.",
    ],
    [
      "Jubin 50 × 50 cm dalam empat warna.",
      "Jubin gelung bertekstur untuk susun atur bercorak.",
      "Empat warna untuk susunan suku pusingan.",
    ],
    [
      "Olefin BCF Duralox 100% dalam warna Mallard Green (836).",
      "Poliester Duralox Heatset 100% dalam warna sepadan.",
    ],
    [
      "Nilon lembut 100% dalam lapan warna.",
      "Pilihan warna gelap daripada koleksi Royal Iconic.",
    ],
    [
      "Karpet tenunan Wilton dengan permukaan potong rata.",
      "Pilihan warna daripada koleksi Kaayna Raudah.",
      "Koleksi terpilih. Tanya tentang ketersediaan warna.",
    ],
    [
      "Warna Maza Blue (656). Semak ketersediaan.",
      "Warna emas. Semak ketersediaan dan harga.",
      "Pilihan Ruwais Gold, Dhaid Maroon dan Masfut Green.",
    ],
  ][i];
  const cards = entries.map((e, k) => {
    const family = families.find((f) =>
      e.title.toLowerCase().includes(f.name.toLowerCase()),
    );
    const to = {
      "Royal Iconic": productPaths[0],
      "Fortia Carbon": productPaths[0] + "?colour=iconic-1078",
      "Hilora-S": productPaths[1],
      "Kaayna Raudah": productPaths[2],
      "Alimah Green": productPaths[2] + "?colour=kaayna-green",
      "Mosque Clearance": collectionPaths[5],
    }[e.title];
    return {
      name: e.title,
      familyName: family?.name,
      category: bm
        ? [
            catBM[0],
            "ATHENIA-S",
            catBM[2],
            catBM[3],
            e.category === "MOSQUE COLLECTION" ? "KOLEKSI MASJID" : e.category,
            catBM[5],
          ][i]
        : e.category,
      photo: i === 0 && e.title === "Tokyo" ? familyPhoto(i, "Tokyo") : e.image,
      desc: e.title === "Tokyo"
        ? t("100% BCF Duralox Olefin. Shown in Green (267).", "Olefin BCF Duralox 100%. Warna Green (267) ditunjukkan.")
        : bm ? ms[k] : e.description,
      to,
      href: to
        ? undefined
        : pdf(i, { Tokyo: 29, "Zafira-S": 11, "Sevora-S": 12 }[e.title] || family?.page),
      label: to
        ? t("View collection", "Lihat koleksi")
        : t("View in catalogue", "Lihat dalam katalog"),
    };
  });
  const controls = (
    <Chips
      options={labels.map(local)}
      value={facet}
      onChange={(n) => {
        choose(n);
        select("");
      }}
      label={t("Collection filters", "Penapis koleksi")}
    />
  );
  const remainingFamilies = families.filter(family => !cards.some(card => card.familyName === family.name));
  const result =
    facet === 0 ? (
      <>
        <Cards items={cards} />
        {visibleFamilies > 0 && <FamilyGrid category={i} rows={remainingFamilies.slice(0, visibleFamilies)} />}
        {visibleFamilies < remainingFamilies.length && (
          <div className="actions">
            <button className="btn" type="button" onClick={() => setVisibleFamilies(count => count + 12)}>
              {t("Show more collections", "Lihat lebih banyak koleksi")} ({remainingFamilies.length - visibleFamilies})
            </button>
          </div>
        )}
      </>
    ) : name === "Clearance" ? (
      <CategoryCards indices={[5]} />
    ) : (
      <div className="facetresults">
        {!direct && options.length > 0 && (
          <label>
            {local(name)}{" "}
            <select value={value} onChange={(e) => select(e.target.value)}>
              <option value="">{t("All options", "Semua pilihan")}</option>
              {options.map((v) => (
                <option key={v} value={v}>
                  {local(v)}
                </option>
              ))}
            </select>
          </label>
        )}
        <FamilyGrid category={i} rows={matching} />
        {!matching.length && (
          <p>
            {t("No matching catalogue entries.", "Tiada koleksi yang sepadan.")}
          </p>
        )}
      </div>
    );
  return (
    <>
      <Hero
        title={t(titlesEn[i], titlesMs[i])}
        photo={
          [
            "collection-hero-0.webp",
            "collection-hero-1.webp",
            "collection-hero-2.webp",
            "collection-hero-3.webp",
            "mosque-hero",
            "collection-hero-4.webp",
          ][i]
        }
      >
        {mosque && (
          <div className="actions">
            <Btn green href={whatsapp()}>
              {t("WhatsApp our team", "WhatsApp kami")}
            </Btn>
          </div>
        )}
      </Hero>
      {mosque && (
        <div className="tabband">
          <div className="wrap">{controls}</div>
        </div>
      )}
      <Group>
        {!mosque && <Crumb />}
        <h2>
          {mosque
            ? t("Mosque carpet collections", "Koleksi karpet masjid")
            : t(
                "Featured " + design.collectionItems[i].title.toLowerCase(),
                "Pilihan " + catBM[i].toLowerCase(),
              )}
        </h2>
        <p>{bm ? descBM[i] : descriptions[i]}</p>
        {!mosque && controls}
        {result}
        {i === 5 && (
          <p>
            {t(
              "Clearance availability changes. Our team will confirm the selected colour, quantity and price before you order.",
              "Stok penghabisan berubah. Kami akan mengesahkan warna, kuantiti dan harga sebelum pesanan.",
            )}
          </p>
        )}
        <div className="actions">
          <Btn href={pdf(i)}>
            {mosque
              ? t("View 2026 mosque catalogue", "Lihat katalog masjid 2026")
              : t("Explore the full catalogue", "Terokai katalog lengkap")}
          </Btn>
        </div>
      </Group>
      {mosque && (
        <>
          <FlagStrip />
          <MosqueProjects />
        </>
      )}
      {!mosque && <Cta />}
    </>
  );
}
function Product({ i }) {
  const { t, bm } = useSite();
  const p = design.products[i],
    cat = [3, 1, 4][i];
  const [selected, set] = useState(0);
  useEffect(() => {
    const apply = () => {
      const requested = new URLSearchParams(window.location.search).get(
        "colour",
      );
      const index = p.swatches.findIndex(([, id]) => id === requested);
      set(index < 0 ? 0 : index);
    };
    apply();
    window.addEventListener("popstate", apply);
    return () => window.removeEventListener("popstate", apply);
  }, [p]);
  const [name, swatch] = p.swatches[selected];
  const desc = [
    "Karpet potong polos daripada nilon lembut dengan lapan pilihan warna.",
    "Jubin karpet gelung bertekstur daripada koleksi Athenia-S dengan empat pilihan warna.",
    "Karpet masjid tenunan Wilton dengan permukaan potong rata. Bincangkan penjajaran saf dengan pasukan pemasangan kami.",
  ][i];
  const labels = {
    Fibre: "Gentian",
    Construction: "Binaan",
    "Dye method": "Kaedah pewarnaan",
    "Pile height": "Tinggi bulu",
    "Total height": "Tinggi keseluruhan",
    "Pile weight": "Berat bulu",
    "Total weight": "Berat keseluruhan",
    "Roll width": "Lebar gulungan",
    "Secondary backing": "Lapisan bawah",
    Collection: "Koleksi",
    Design: "Reka bentuk",
    "Colour system": "Sistem warna",
    "Tile size": "Saiz jubin",
    Packing: "Pembungkusan",
    Backing: "Lapisan bawah",
    Surface: "Permukaan",
    "Pile content": "Bahan bulu",
    "Prayer-row repeat": "Ulangan saf",
    Origin: "Asal",
  };
  return (
    <>
      <Group>
        <Crumb />
        <div className="product">
          <figure>
            <img
              src={img(selected ? swatch : p.img)}
              {...(!selected && cataloguePhotos[p.img === "iconic-white" ? "royal-iconic-white" : p.img])}
              sizes="(max-width: 650px) 92vw, (max-width: 1900px) 44vw, 790px"
              alt={p.name + " · " + name}
            />
            <figcaption>{p.source}</figcaption>
          </figure>
          <div>
            <small>{bm ? catBM[cat] : p.category}</small>
            <h1>{p.name}</h1>
            <p>{bm ? desc : p.desc}</p>
            <p>
              <b>
                {t("Selected colour", "Warna pilihan")} · {name}
              </b>
            </p>
            <p>
              {t(
                "Ask our team for pricing and availability.",
                "Hubungi kami untuk harga dan ketersediaan.",
              )}
            </p>
            <Btn
              green
              href={whatsapp(
                t(
                  "I would like to enquire about ",
                  "Saya ingin bertanya tentang ",
                ) +
                  p.name +
                  " · " +
                  name.replace("\n", " "),
              )}
            >
              {t("Enquire about this collection", "Tanya tentang koleksi ini")}
            </Btn>
            <p>
              <Btn href={pdf(cat, [12, 9, 25][i])}>
                {t("View collection catalogue", "Lihat katalog koleksi")}
              </Btn>
            </p>
          </div>
        </div>
      </Group>
      <Group>
        <h2>{t("Explore the colours", "Terokai warna")}</h2>
        <p>
          {t(
            "Request a physical sample to confirm the finish in your space.",
            "Minta sampel fizikal untuk menyemak kemasan di ruang anda.",
          )}
        </p>
        <div className="swatches">
          {p.swatches.map(([n, s], j) => (
            <button
              key={s}
              aria-pressed={selected === j}
              onClick={() => set(j)}
            >
              <img src={img(s)} alt="" />
              {n.replace("\n", " · ")}
            </button>
          ))}
        </div>
        {i === 2 && (
          <p>
            {t("Also in the catalogue", "Turut dalam katalog")} · Azraq Sky Blue
          </p>
        )}
      </Group>
      <Group pale>
        <h2>{t("Specifications", "Spesifikasi")}</h2>
        <p>{p.source}</p>
        <dl>
          {p.specs.map(([k, v]) => (
            <div key={k}>
              <dt>{bm ? labels[k] : k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p>
          {bm
            ? [
                "Untuk kegunaan dalaman. Arah bulu dan kelompok pewarna boleh mempengaruhi rupa. Minta sampel fizikal untuk mengesahkan warna.",
                "Setiap pratonton menunjukkan empat jubin dipusingkan suku pusingan. Saiz setiap jubin ialah 50 × 50 cm.",
                "Sahkan lebar gulungan, ulangan saf dan ukuran bilik sebelum membuat pesanan. Warna yang ditunjukkan ialah rujukan katalog.",
              ][i]
            : p.note}
        </p>
      </Group>
      <Group>
        <h2>{t("Keep exploring", "Terokai koleksi lain")}</h2>
        <p>
          {t(
            "Browse related collections for your project.",
            "Terokai koleksi berkaitan untuk projek anda.",
          )}
        </p>
        <CategoryCards
          examples={[
            { 3: "Royal Dolce", 2: "Regal Waves", 0: "Crystal Cubes" },
            { 1: "Orion-S", 0: "Panama", 2: "Windsor 2" },
            { 4: "Zareena Mosque", 5: "Jazeera Mosque", 0: "Tobago" },
          ][i]}
          indices={
            [
              [3, 2, 0],
              [1, 0, 2],
              [4, 5, 0],
            ][i]
          }
        />
      </Group>
    </>
  );
}
function More({ page }) {
  const { t, bm, title } = useSite();
  if (page === "downloads")
    return (
      <>
        <Hero
          title={t("Explore our catalogues", "Terokai katalog kami")}
          photo="iconic-carbon"
        />
        <Group>
          <h2>
            {t(
              "The latest collections, in detail.",
              "Koleksi terkini secara terperinci.",
            )}
          </h2>
          <p>
            {t(
              "Open a PDF to explore designs, colours and specifications.",
              "Buka PDF untuk melihat reka bentuk, warna dan spesifikasi.",
            )}
          </p>
          <Cards
            items={design.downloads.map((d, i) => ({
              name: d.title,
              category: bm
                ? i === 5
                  ? "KATALOG PENGHABISAN STOK"
                  : i === 0
                    ? "EDISI TERKINI"
                    : "KATALOG PRODUK"
                : d.category,
              desc:
                (bm ? descBM[i] : d.description.split("\n").pop()) +
                " · PDF · " +
                [157, 59, 224, 144, 89, 33][i] +
                t(" pages", " halaman") +
                " · " +
                [47, 173, 64, 54, 69, 126][i] +
                " MB",
              photo: d.image,
              cover: true,
              href: pdf(i),
              label: t("Open catalogue", "Buka katalog"),
            }))}
          />
          <p>
            {t(
              "Need a product sheet or help choosing? Send us the collection name on WhatsApp.",
              "Perlukan helaian produk atau bantuan memilih? Hantar nama koleksi melalui WhatsApp.",
            )}
          </p>
          <div className="actions">
            <Btn green href={whatsapp()}>
              {t("Ask our catalogue team", "Tanya pasukan katalog kami")}
            </Btn>
          </div>
        </Group>
      </>
    );
  if (page === "contact")
    return <Hero title={title(page)} photo="showroom-prayer-hall" />;
  if (page === "blog")
    return (
      <>
        <Hero title={title(page)} photo="blog-home.png" />
        <Group pale>
          <BlogCards />
        </Group>
      </>
    );
  if (articlesByPath[page]) return <JournalArticle article={articlesByPath[page]} />;
  if (page === "about")
    return (
      <>
        <Hero title={title(page)} photo="showroom-prayer-hall" />
        <Group>
          <div className="center">
            <h2>{t("About Adam Collection", "Tentang Koleksi Adam")}</h2>
            <p className="intro">
              {t(
                "Established on 20 December 2011, Koleksi Adam supplies carpets and flooring for homes, offices, mosques and suraus, with advice and installation enquiries through our team.",
                "Ditubuhkan pada 20 Disember 2011, Koleksi Adam membekalkan karpet dan lantai untuk kediaman, pejabat, masjid dan surau. Hubungi pasukan kami untuk khidmat nasihat dan pertanyaan pemasangan.",
              )}
            </p>
            <Timeline />
          </div>
        </Group>
        <FlagStrip />
        <Group>
          <h2>{t("Our expertise", "Kepakaran kami")}</h2>
          <Services />
        </Group>
        <AdditionalServices />
        <Reviews />
        <FlagStrip />
      </>
    );
  if (page === "underlay")
    return (
      <>
        <Hero title={title(page)} photo="underlay" />
        <Group>
          <h2>
            {t(
              "Complete your carpet installation.",
              "Lengkapkan pemasangan karpet anda.",
            )}
          </h2>
          <p>
            {t(
              "Choose an underlay that suits your carpet, subfloor and intended use. Our team will advise on compatibility before quotation.",
              "Pilih alas yang sesuai dengan karpet, lantai asas dan kegunaan anda. Pasukan kami akan menyemak kesesuaian sebelum memberikan sebut harga.",
            )}
          </p>
          <img
            className="featurephoto"
            src={img("underlay")}
            alt={title(page)}
          />
          <dl>
            {[
              [
                t("PU underlay", "Alas PU"),
                t(
                  "7, 9, 11, 16 and 20 mm options",
                  "Pilihan 7, 9, 11, 16 dan 20 mm",
                ),
              ],
              [t("Rubber underlay", "Alas getah"), "RD5, RC2, RCS9"],
              [t("Sponge underlay", "Alas span"), "7, 12, 15 mm"],
              [
                t("Installation accessories", "Aksesori pemasangan"),
                t(
                  "Ask about stair rods and related accessories",
                  "Tanya tentang batang pengikat karpet tangga dan aksesori berkaitan",
                ),
              ],
            ].map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="actions">
            <Btn
              green
              href={whatsapp(
                t(
                  "Please advise on underlay options.",
                  "Saya ingin bertanya tentang pilihan alas karpet.",
                ),
              )}
            >
              {t("Ask about underlay options", "Tanya tentang pilihan alas")}
            </Btn>
          </div>
        </Group>
        <Cta />
      </>
    );
  return <Application page={page} />;
}
function InstallationAlbum({ project }) {
  const { t } = useSite();
  const [index, setIndex] = useState(0);
  const { photos } = project;
  const name = project.fullName || project.name;
  const current = photos[index];
  const stage = (photo) => photo.stage === "before"
    ? t("Before installation", "Sebelum pemasangan")
    : t("Installed carpet", "Selepas pemasangan");
  return (
    <figure className="installation-album" id="selected-installation">
      <div className="installation-photo">
        <img
          src={`/images/mosque-albums/${current.file}.webp`}
          alt={`${name} — ${stage(current)}`}
          width={current.width}
          height={current.height}
          style={{ "--original-width": `${current.width}px` }}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption aria-live="polite">
        <strong>{name}</strong>
        <span>{stage(current)} · {index + 1} / {photos.length}</span>
      </figcaption>
      {photos.length > 1 && (
        <div className="projectthumbs" role="group" aria-label={name}>
          {photos.map((photo, n) => (
            <button
              type="button"
              key={photo.file}
              aria-label={`${name} — ${stage(photo)} (${n + 1}/${photos.length})`}
              aria-pressed={index === n}
              onClick={() => setIndex(n)}
            >
              <img src={`/images/mosque-albums/${photo.file}-thumb.webp`} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </figure>
  );
}

function MosqueProjects() {
  const { t } = useSite();
  const [selected, chooseProject] = useState(installations[0]);
  return (
    <Group pale>
      <div className="center installation-heading">
        <h2>{t("Carpet installation for mosques", "Pemasangan karpet masjid")}</h2>
        <p>
          {t(
            "Explore carpet installations at mosques and suraus across Malaysia. Select a location to see its photos.",
            "Lihat pemasangan karpet di masjid dan surau di seluruh Malaysia. Pilih lokasi untuk melihat gambarnya.",
          )}
        </p>
      </div>
      <div className="projectbrowser installation-projects">
        <div className="projectlist" role="group" aria-label={t("Installation projects", "Projek pemasangan")}>
          <div className="installation-names">
            {installations.map((project) => (
              <button
                type="button"
                key={project.name}
                aria-controls="selected-installation"
                aria-pressed={selected.name === project.name}
                onClick={() => chooseProject(project)}
              >
                {project.fullName || project.name}
              </button>
            ))}
          </div>
        </div>
        <InstallationAlbum key={selected.name} project={selected} />
      </div>
    </Group>
  );
}
function ProjectGallery() {
  const { t } = useSite(),
    [n, set] = useState(0);
  const labels = [
    t("Home flooring", "Lantai kediaman"),
    t("International school", "Sekolah antarabangsa"),
    t("Building lobby", "Lobi bangunan"),
    t("Restaurants and cafés", "Restoran dan kafe"),
  ];
  const photos = [
    [
      ["floor-laundry", t("Walnut-look laminate in a laundry room", "Lantai lamina bercorak walnut di bilik dobi")],
      ["floor-sitting", t("Walnut-look planks in a sitting room", "Lantai bercorak walnut di ruang tamu")],
    ],
    [
      ["floor-music", t("Pale wood flooring in a school music room", "Lantai kayu cerah di bilik muzik sekolah")],
      ["floor-music-detail", t("Floor finish around the piano", "Kemasan lantai di bawah piano")],
    ],
    [
      ["floor-entrance", t("Light planks across a building lobby", "Lantai kayu cerah di lobi bangunan")],
      ["floor-entrance-detail", t("Plank edges along the lobby columns", "Tepi papan lantai di sisi tiang lobi")],
    ],
    [
      ["floor-coffee", t("Honey-toned planks in a café dining area", "Lantai berwarna madu di ruang makan kafe")],
      ["floor-coffee-detail", t("Flooring beneath the café seating", "Lantai di bawah kerusi kafe")],
    ],
  ];
  return (
    <Group pale>
      <div className="center">
        <h2>{t("Our floor installation", "Pemasangan lantai kami")}</h2>
        <p>
          {t(
            "We offer SPC vinyl and laminate floor installation services to the residential and commercial sectors. These finishes suit school halls, kindergartens, restaurants, office buildings and gymnasiums.",
            "Lihat pemasangan lantai SPC, vinil dan lamina untuk kediaman, sekolah dan pejabat. Pilih jenis projek untuk melihat hasil pemasangan.",
          )}
        </p>
        <p>
          {t(
            "Our team has more than ten years of experience helping customers choose and install flooring. We handle residential and office renovations from preparation through installation.",
            "Pasukan kami berpengalaman lebih sepuluh tahun membantu pelanggan memilih dan memasang lantai. Kami mengendalikan pengubahsuaian kediaman dan pejabat daripada penyediaan hingga pemasangan.",
          )}
        </p>
        <Chips
          label={t("Installation gallery", "Galeri pemasangan")}
          options={labels}
          value={n}
          onChange={set}
        />
      </div>
      <figure className="projectphoto floorpair">
        {photos[n].map(([name, alt]) => <GalleryPhoto key={name} name={name} alt={alt} />)}
        <figcaption>{labels[n]} · {t("Flooring visualisation", "Visualisasi lantai")}</figcaption>
      </figure>
    </Group>
  );
}
function Application({ page }) {
  const { t, title } = useSite(),
    [officeFilter, setOffice] = useState(-1),
    [rug, setRug] = useState(0),
    [design, setDesign] = useState(7);
  const office = page === "office-carpets",
    floor = page === "flooring";
  const rugs = ["Tehran Classic", "Greek Olympia", "Moderno"];
  const swatches = [
    [1, 7, 12, 11, 10, 8, 4, 3, 2, 5, 6, 9],
    [2, 3, 4, 11, 16, 13, 12, 18, 9],
    [7, 8, 9, 10, 1, 2, 3, 5, 6, 4],
  ];
  const rugFile = ["tehran", "greek", "moderno"][rug];
  return (
    <>
      <Hero
        title={title(page)}
        photo={office ? "ghazal" : floor ? "floor-hero.png" : "iconic-carbon"}
        desc={
          office
            ? t(
                "Carpet tiles and broadloom collections for your workplace.",
                "Jubin dan karpet gulung untuk ruang kerja anda.",
              )
            : floor
              ? undefined
              : t(
                  "Explore wall-to-wall collections and enquire about ready-made rugs.",
                  "Terokai karpet dinding ke dinding dan permaidani siap guna.",
                )
        }
      >
        {office && (
          <div className="actions">
            <Btn green href={whatsapp()}>
              {t("Our WhatsApp Team", "WhatsApp kami")}
            </Btn>
          </div>
        )}
        {(floor || !office) && (
          <div className="actions">
            <Btn href={shopee}>{t("Buy online here", "Beli dalam talian")}</Btn>
            <Btn green href={whatsapp()}>
              {t("WhatsApp our team", "WhatsApp kami")}
            </Btn>
          </div>
        )}
      </Hero>
      {!floor && (
        <div className="wrap ezy">
          <div>
            <h3>{t("Buy Carpets the Easy Way", "Beli Karpet dengan Mudah")}</h3>
            <p>
              {t(
                "0% interest-free installment plan (purchases above RM500)",
                "Pelan ansuran tanpa faedah 0% (pembelian melebihi RM500)",
              )}
            </p>
          </div>
          <img
            src="/images/maybank-ezypay.webp"
            alt="Maybank EzyPay"
            width="330"
            height="61"
          />
        </div>
      )}
      {(office || floor) && (
        <div className="tabband">
          <div className="wrap">
            {office ? (
              <Chips
                options={[
                  t("Carpet tiles", "Jubin karpet"),
                  t("Loop pile", "Karpet gelung"),
                  t("Patterned carpet", "Karpet bercorak"),
                ]}
                label={t("Office collections", "Koleksi pejabat")}
                value={officeFilter}
                onChange={(v) => setOffice(v === officeFilter ? -1 : v)}
              />
            ) : (
              <div className="payrow">
                <strong>
                  {floor
                    ? t(
                        "Easy installment payment plan",
                        "Pelan bayaran ansuran mudah",
                      )
                    : t("Buy carpets the easy way", "Beli karpet dengan mudah")}
                </strong>
                <div className="payfeatures">
                  {[
                    ["Payment in instalments", "Bayaran ansuran"],
                    ["Packages for all budgets", "Pakej untuk semua bajet"],
                    ["0% interest", "Faedah 0%"],
                    ...(floor
                      ? [["10 year warranty", "Waranti 10 tahun"]]
                      : []),
                  ].map(([en, ms]) => (
                    <a
                      href={whatsapp(
                        t(
                          "Please confirm the terms for ",
                          "Sila sahkan syarat bagi ",
                        ) + t(en, ms),
                      )}
                      key={en}
                    >
                      <b>✦</b>
                      {t(en, ms)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {floor ? (
        <ProjectGallery />
      ) : (
        <Group>
          <h2>
            {office
              ? t("Designed for your workspace", "Untuk ruang kerja anda")
              : t(
                  "Explore wall-to-wall carpets",
                  "Terokai karpet dinding ke dinding",
                )}
          </h2>
          <p>
            {office
              ? t(
                  "Compare modular tiles and broadloom carpets, then request a quotation for your project.",
                  "Bandingkan jubin modular dan karpet gulung, kemudian minta sebut harga projek anda.",
                )
              : t(
                  "Discover plain colours, decorative patterns and loop-pile textures.",
                  "Terokai warna polos, corak hiasan dan tekstur karpet gelung.",
                )}
          </p>
          <CategoryCards
            indices={
              office
                ? officeFilter < 0
                  ? [1, 0, 2]
                  : [[1], [0], [2]][officeFilter]
                : [3, 2, 0]
            }
          />
          {office && (
            <div className="actions">
              <Btn
                href={whatsapp(
                  t(
                    "I would like an office installation quote.",
                    "Saya inginkan sebut harga pemasangan pejabat.",
                  ),
                )}
              >
                {t(
                  "Request an installation quote",
                  "Minta sebut harga pemasangan",
                )}
              </Btn>
            </div>
          )}
        </Group>
      )}
      {!floor && !office && (
        <Group pale>
          <div className="center">
            <h2>
              {t(
                "Rugs for your home",
                "Permaidani untuk kediaman",
              )}
            </h2>
            <p>
              {t(
                "Choose a collection and select a rug to see how its pattern looks in the room.",
                "Pilih koleksi dan reka bentuk permaidani untuk melihat coraknya di dalam ruang tamu.",
              )}
            </p>
          </div>
          <Chips
            options={rugs}
            label={t("Rug collection", "Koleksi permaidani")}
            value={rug}
            onChange={(next) => {
              setRug(next);
              setDesign(swatches[next][0]);
            }}
          />
          <div className="servicepair rug">
            <figure className="rugroom" aria-label={rugs[rug]}>
              <img
                src={img("tehran.png")}
                alt={t("Living room preview", "Pratonton ruang tamu")}
                width="1080" height="1080" loading="lazy"
              />
              <img
                  className="ruglayer"
                  src={`/images/rug-variants/${rugFile}-${design}.webp`}
                  alt={`${rugs[rug]} ${design}`}
                  width="1080" height="1080"
                  loading="lazy"
                />
            </figure>
            <div>
              <h3>{rugs[rug]}</h3>
              <p>
                {
                  [
                    t(
                      "Tehran Classic is among the highest quality rugs. Made of durable polyester, the colors do not fade, soft and fluffy.",
                      "Tehran Classic diperbuat daripada poliester tahan lama yang lembut, gebu dan tahan luntur.",
                    ),
                    t(
                      "A durable polyester rug made in Turkey.",
                      "Permaidani poliester tahan lama dari Turki.",
                    ),
                    t(
                      "A bright polypropylene design made in Indonesia.",
                      "Reka bentuk polipropilena dari Indonesia.",
                    ),
                  ][rug]
                }
              </p>
              <fieldset className="rugvariants">
                  <legend>
                    {t("Preview a design", "Pratonton reka bentuk")} · {rugs[rug]} {design}
                  </legend>
                  <div>
                    {swatches[rug].map((n) => (
                      <button
                        key={n} type="button" aria-pressed={n === design}
                        aria-label={`${rugs[rug]} ${n}`} onClick={() => setDesign(n)}
                      >
                        <img
                          src={`/images/rug-variants/${rugFile}-${n}-swatch.webp`}
                          alt="" width="220" height="150" loading="lazy"
                        />
                        <span>{String(n).padStart(2, "0")}</span>
                      </button>
                    ))}
                  </div>
              </fieldset>
              <p>
                {rug === 2
                  ? t(
                      "Polypropylene rug made in Indonesia.",
                      "Permaidani polipropilena buatan Indonesia.",
                    )
                  : t(
                      "Polyester rug made in Turkey, listed at one million knots.",
                      "Permaidani poliester buatan Turki dengan satu juta simpulan.",
                    )}
              </p>
              <p>
                {t(
                  "Check sizes and availability in our Shopee store.",
                  "Semak saiz dan ketersediaan di kedai Shopee kami.",
                )}
              </p>
              <Btn href={shopee}>
                {t("Shop this collection", "Beli koleksi ini")}
              </Btn>
            </div>
          </div>
        </Group>
      )}
    </>
  );
}
export default function Site({ bm, page, families }) {
  useEffect(() => {
    document.documentElement.lang = bm ? "ms-MY" : "en-MY";
  }, [bm]);
  const i = collectionPaths.indexOf(page),
    j = productPaths.indexOf(page);
  const ctx = {
    bm,
    page,
    t: (en, ms) => (bm ? ms : en),
    title: (p) => titles[p][Number(bm)],
    url: (p) => (bm ? "/bm" : "") + (p ? "/" + p : bm ? "" : "/"),
  };
  return (
    <Context.Provider value={ctx}>
      <Header />
      <main id="main">
        {!page ? (
          <Home />
        ) : page === "collections" ? (
          <Collections />
        ) : i >= 0 ? (
          <Category i={i} families={families} />
        ) : j >= 0 ? (
          <Product i={j} />
        ) : (
          <More page={page} />
        )}
        <Contact />
      </main>
      <Footer />
    </Context.Provider>
  );
}


