"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./portfolio-site.module.css";
import {
  CATEGORY_LABELS,
  CATEGORY_SIDE_LABELS,
  CATEGORY_SLUGS,
  type CategorySlug,
} from "../lib/categories";
import { BTS_CLIPS, CATEGORY_MEDIA } from "../lib/media";

type WorkItem = {
  title: string;
  page?: PageId;
  image: string;
  alt: string;
};

type VideoItem = {
  title: string;
  landscape?: boolean;
  embedSrc?: string;
  poster?: string;
  src?: string;
};

type PageId = "home" | CategorySlug;

type CategoryPage = {
  heading: string;
  sideLabel: string;
  creator?: string;
  location?: string;
  count?: string;
  items?: WorkItem[];
  videos?: VideoItem[];
  note?: string;
  video?: VideoItem;
};

const navItems: { id: PageId; label: string }[] = [
  ...CATEGORY_SLUGS.map((slug) => ({ id: slug as PageId, label: CATEGORY_LABELS[slug] })),
  { id: "home" as PageId, label: "INFO" },
];

const heroVideo = {
  desktop: { src: "/hero/hero.mp4", poster: "/hero/hero-poster.jpg" },
  mobile: { src: "/hero/hero.mp4", poster: "/hero/hero-poster.jpg" },
};

type ShowcaseItem =
  | { kind: "image"; title: string; image: string; alt: string; page?: PageId }
  | { kind: "video"; title: string; src: string; poster: string; page?: PageId; landscape?: boolean };

// Homepage running order, set by hand. Each entry names a category and which
// of its clips to use, so EVENTS can appear twice without repeating a film.
const SHOWCASE_ORDER: { source: CategorySlug | "bts"; clip: number }[] = [
  { source: "brand", clip: 0 },
  { source: "food", clip: 0 },
  { source: "events", clip: 0 },
  { source: "fashion-films", clip: 0 },
  { source: "events", clip: 1 },
  { source: "automotive", clip: 0 },
  { source: "interior", clip: 0 },
  { source: "bts", clip: 0 },
];

const showcase: ShowcaseItem[] = SHOWCASE_ORDER.map(({ source, clip }) => {
  if (source === "bts") {
    const bts = BTS_CLIPS[clip];

    return {
      kind: "video" as const,
      title: "BEHIND THE SCENES",
      src: bts.src,
      poster: bts.poster,
      landscape: bts.landscape,
    };
  }

  const media = CATEGORY_MEDIA[source];
  const label = CATEGORY_LABELS[source];

  if (media.videos.length > 0) {
    const video = media.videos[Math.min(clip, media.videos.length - 1)];

    return {
      kind: "video" as const,
      title: label,
      page: source as PageId,
      src: video.src,
      poster: video.poster,
      landscape: video.landscape,
    };
  }

  const shot = media.images[Math.min(clip, media.images.length - 1)];

  return {
    kind: "image" as const,
    title: label,
    page: source as PageId,
    image: shot.image,
    alt: shot.alt,
  };
});

const pageContent: Record<CategorySlug, CategoryPage> = Object.fromEntries(
  CATEGORY_SLUGS.map((slug, index) => {
    const media = CATEGORY_MEDIA[slug];

    return [
      slug,
      {
        heading: CATEGORY_LABELS[slug],
        sideLabel: CATEGORY_SIDE_LABELS[slug],
        creator: "Godwin",
        location: "Dubai, UAE",
        count: `${index + 1} / ${String(CATEGORY_SLUGS.length).padStart(2, "0")}`,
        videos: media.videos.map((clip) => ({
          title: clip.title,
          src: clip.src,
          poster: clip.poster,
          landscape: clip.landscape,
        })),
        items: media.images.map((shot) => ({
          title: shot.title,
          image: shot.image,
          alt: shot.alt,
        })),
      },
    ];
  }),
) as Record<CategorySlug, CategoryPage>;

const desktopSocials = [
  { label: "ig", href: "https://www.instagram.com/" },
  { label: "Be", href: "https://www.behance.net/" },
  { label: "yt", href: "https://www.youtube.com/" },
];

const mobileSocials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Behance", href: "https://www.behance.net/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

function FooterMark() {
  return (
    <div className={styles.footerMark} aria-hidden="true">
      <svg fill="none" viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
        <circle cx="42" cy="42" fill="currentColor" r="20" />
        <path
          d="M25 36.5c0-6.351 5.149-11.5 11.5-11.5 3.972 0 7.474 2.016 9.54 5.082C48.102 27.016 51.604 25 55.576 25c6.351 0 11.5 5.149 11.5 11.5v12.391c0 6.351-5.149 11.5-11.5 11.5-3.972 0-7.474-2.016-9.508-5.034-2.066 3.018-5.568 5.034-9.568 5.034-6.351 0-11.5-5.149-11.5-11.5V36.5Z"
          stroke="#f3f3f0"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.8"
        />
      </svg>
    </div>
  );
}

function DesktopFooter() {
  return (
    <footer className={styles.desktopFooter} id="info">
      <div className={styles.desktopFooterRow}>
        <div className={styles.desktopFooterLead}>
          <a
            className={styles.desktopFooterNewsletter}
            href="mailto:inspiremediasite@gmail.com?subject=Project%20enquiry"
          >
            <span>Start a project</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
          <p className={styles.desktopFooterCopy}>
            Tell us about the shoot and we will come back to you with a treatment and a quote.
          </p>
        </div>
        <FooterMark />
        <div className={styles.desktopFooterMeta}>
          <div>
            <span>CONTACT</span>
            <a href="tel:+971544724435">+971 54 472 4435</a>
            <a href="mailto:inspiremediasite@gmail.com">inspiremediasite@gmail.com</a>
            <a href="https://inspiremedia.site" rel="noreferrer" target="_blank">
              inspiremedia.site
            </a>
            <p>Office 2501R, Aspin Tower, Sheikh Zayed Road, Dubai, UAE</p>
          </div>
          <div>
            <span>FOLLOW US</span>
            {mobileSocials.map((item) => (
              <a href={item.href} key={item.label} rel="noreferrer" target="_blank">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.footerLine} />
      <div className={styles.desktopFooterBottom}>
        <p>&copy; 2026 INSPIRE MEDIA. ALL RIGHTS RESERVED.</p>
        <a href="#top">SCROLL TO TOP</a>
      </div>
    </footer>
  );
}

function MobileFooter() {
  return (
    <footer className={styles.mobileFooter} id="mobile-info">
      <FooterMark />
      <a
        className={styles.mobileFooterLead}
        href="mailto:inspiremediasite@gmail.com?subject=Project%20enquiry"
      >
        <span>Start a project</span>
        <span aria-hidden="true">&rarr;</span>
      </a>
      <p className={styles.mobileFooterCopy}>
        Tell us about the shoot and we will come back to you with a treatment and a quote.
      </p>
      <div className={styles.mobileFooterColumns}>
        <div>
          <span>CONTACT</span>
          <a href="tel:+971544724435">+971 54 472 4435</a>
          <a href="mailto:inspiremediasite@gmail.com">inspiremediasite@gmail.com</a>
          <p>Office 2501R, Aspin Tower, Sheikh Zayed Road, Dubai, UAE</p>
        </div>
        <div>
          <span>FOLLOW US</span>
          {mobileSocials.map((item) => (
            <a href={item.href} key={item.label} rel="noreferrer" target="_blank">
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <div className={styles.mobileFooterBottom}>
        <p>&copy; 2026 INSPIRE MEDIA. ALL RIGHTS RESERVED.</p>
        <a href="#top">SCROLL TO TOP</a>
      </div>
    </footer>
  );
}

export function PortfolioSite({ page = "home" }: { page?: PageId }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const activePage = page;
  const [isScrolled, setIsScrolled] = useState(false);
  const desktopCarouselRef = useRef<HTMLDivElement | null>(null);
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);
  const foodVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [foodPlaying, setFoodPlaying] = useState<Record<string, boolean>>({});

  const playFoodVideo = (key: string) => {
    const element = foodVideoRefs.current[key];
    if (!element) {
      return;
    }
    element.muted = true;
    void element
      .play()
      .then(() => setFoodPlaying((prev) => ({ ...prev, [key]: true })))
      .catch(() => undefined);
  };

  const pauseFoodVideo = (key: string) => {
    const element = foodVideoRefs.current[key];
    if (!element) {
      return;
    }
    element.pause();
    setFoodPlaying((prev) => ({ ...prev, [key]: false }));
  };

  const toggleFoodVideo = (key: string) => {
    if (foodPlaying[key]) {
      pauseFoodVideo(key);
    } else {
      playFoodVideo(key);
    }
  };





  useEffect(() => {
    const rail = mobileCarouselRef.current;
    if (!rail) {
      return;
    }

    let timer = 0;
    let paused = false;

    const getStep = () => {
      const firstCard = rail.querySelector<HTMLElement>("[data-mobile-bts-card='true']");
      if (!firstCard) {
        return 0;
      }

      const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap || "0");
      return firstCard.offsetWidth + gap;
    };

    const start = rail.scrollWidth / 3;
    rail.scrollLeft = start;

    const advance = () => {
      if (!paused) {
        const step = getStep();
        if (step > 0) {
          rail.scrollTo({ left: rail.scrollLeft + step, behavior: "smooth" });
          if (rail.scrollLeft >= start * 2) {
            rail.scrollLeft = start;
          }
        }
      }

      timer = window.setTimeout(advance, 2200);
    };

    const onPointerEnter = () => {
      paused = true;
    };

    const onPointerLeave = () => {
      paused = false;
    };

    rail.addEventListener("pointerenter", onPointerEnter);
    rail.addEventListener("pointerleave", onPointerLeave);
    advance();

    return () => {
      window.clearTimeout(timer);
      rail.removeEventListener("pointerenter", onPointerEnter);
      rail.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  useEffect(() => {
    const rail = desktopCarouselRef.current;
    if (!rail) {
      return;
    }

    let timer = 0;
    let paused = false;

    const getStep = () => {
      const firstCard = rail.querySelector<HTMLElement>("[data-desktop-bts-card='true']");
      if (!firstCard) {
        return 0;
      }

      const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap || "0");
      return firstCard.offsetWidth + gap;
    };

    const start = rail.scrollWidth / 3;
    rail.scrollLeft = start;

    const advance = () => {
      if (!paused) {
        const step = getStep();
        if (step > 0) {
          rail.scrollTo({ left: rail.scrollLeft + step, behavior: "smooth" });
          if (rail.scrollLeft >= start * 2) {
            rail.scrollLeft = start;
          }
        }
      }

      timer = window.setTimeout(advance, 2400);
    };

    const onPointerEnter = () => {
      paused = true;
    };

    const onPointerLeave = () => {
      paused = false;
    };

    rail.addEventListener("pointerenter", onPointerEnter);
    rail.addEventListener("pointerleave", onPointerLeave);
    advance();

    return () => {
      window.clearTimeout(timer);
      rail.removeEventListener("pointerenter", onPointerEnter);
      rail.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openPage = (target: PageId) => {
    setMenuOpen(false);
    router.push(target === "home" ? "/" : `/${target}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const scrollToInfo = (mobile = false) => {
    setMenuOpen(false);

    const scroll = () =>
      document.getElementById(mobile ? "mobile-info" : "info")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    if (activePage !== "home") {
      router.push("/");
      window.setTimeout(scroll, 320);
      return;
    }

    window.setTimeout(scroll, 80);
  };


  const renderHero = (mobile: boolean) => {
    return (
      <section className={mobile ? styles.mobileHeroSection : styles.heroSection}>
        <div className={mobile ? styles.mobileHeroFrame : styles.heroFrame}>
          <video
            autoPlay
            className={styles.heroVideoFrame}
            loop
            muted
            playsInline
            poster={mobile ? heroVideo.mobile.poster : heroVideo.desktop.poster}
            preload="auto"
            src={mobile ? heroVideo.mobile.src : heroVideo.desktop.src}
          />
        </div>
      </section>
    );
  };

  const renderSelectedWork = (mobile: boolean) => {
    const items = mobile ? showcase.slice(0, 8) : showcase;

    return (
      <section className={styles.sectionBlock}>
        <h2 className={mobile ? styles.mobileSectionTitle : styles.sectionTitle}>SELECTED WORK</h2>
        <div className={mobile ? styles.mobileWorkGrid : styles.workGrid}>
          {items.map((item, index) => {
            const patternClass = !mobile ? styles[`workCardPattern${(index % 8) + 1}`] : "";
            const cardClass = mobile ? styles.mobileWorkCard : styles.workCard;

            if (item.kind === "video") {
              const key = `${mobile ? "m" : "d"}-s${index}`;

              return (
                <article
                  className={`${cardClass} ${styles.showcaseVideoCard} ${styles.reveal} ${
                    item.landscape ? styles.videoCardLandscape : ""
                  } ${item.page ? styles.showcaseVideoLink : ""} ${patternClass}`}
                  data-reveal
                  key={`${item.title}-${index}`}
                  onClick={() => item.page && openPage(item.page)}
                  onMouseEnter={() => !mobile && playFoodVideo(key)}
                  onMouseLeave={() => !mobile && pauseFoodVideo(key)}
                >
                  <video
                    data-food-key={key}
                    loop
                    muted
                    playsInline
                    poster={item.poster}
                    preload="metadata"
                    ref={(element) => {
                      foodVideoRefs.current[key] = element;
                    }}
                    src={item.src}
                  />
                  <div className={styles.videoUi}>
                    <button
                      aria-label={foodPlaying[key] ? "Pause video" : "Play video"}
                      className={styles.playButton}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleFoodVideo(key);
                      }}
                      type="button"
                    >
                      {foodPlaying[key] ? "\u275a\u275a" : "\u25b6"}
                    </button>
                  </div>
                  <span>{item.title}</span>
                </article>
              );
            }

            return (
              <Link
                className={`${cardClass} ${styles.workCardButton} ${styles.reveal} ${patternClass}`}
                data-reveal
                href={item.page ? `/${item.page}` : "/"}
                key={`${item.title}-${index}`}
              >
                <img alt={item.alt} src={item.image} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </section>
    );
  };




  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const nodes = Object.entries(foodVideoRefs.current)
      .filter((entry): entry is [string, HTMLVideoElement] => entry[0].startsWith("m-") && Boolean(entry[1]))
      .map((entry) => entry[1]);

    if (nodes.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLVideoElement;
          const key = element.dataset.foodKey ?? "";

          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            element.muted = true;
            void element
              .play()
              .then(() => setFoodPlaying((prev) => ({ ...prev, [key]: true })))
              .catch(() => undefined);
          } else if (!element.paused) {
            element.pause();
            setFoodPlaying((prev) => ({ ...prev, [key]: false }));
          }
        });
      },
      { threshold: [0, 0.6, 1] },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [activePage]);


  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduce) {
      targets.forEach((node) => node.setAttribute("data-revealed", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    targets.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [activePage]);

  const renderDesktopHeader = () => (
    <header className={styles.desktopHeader}>
      <div className={styles.desktopHeaderTop}>
        <div className={styles.desktopHeaderSpacer} />
        <button className={styles.desktopBrand} onClick={() => openPage("home")} type="button">
          INSPIRE MEDIA
        </button>
        <div className={styles.desktopSocials}>
          {desktopSocials.map((item) => (
            <a href={item.href} key={item.label} rel="noreferrer" target="_blank">
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <nav className={styles.desktopNav}>
        {navItems.map((item) =>
          item.id === "home" ? (
            <button
              className={styles.navLink}
              key={item.id}
              onClick={() => scrollToInfo(false)}
              type="button"
            >
              {item.label}
            </button>
          ) : (
            <Link
              className={`${styles.navLink} ${activePage === item.id ? styles.activeNavItem : ""}`}
              href={`/${item.id}`}
              key={item.id}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ),
        )}
      </nav>
    </header>
  );

  const renderMobileHeader = () => (
    <header className={`${styles.mobileHeader} ${isScrolled ? styles.mobileHeaderScrolled : ""}`}>
      <button
        className={`${styles.mobileBrand} ${isScrolled ? styles.mobileBrandScrolled : ""}`}
        onClick={() => openPage("home")}
        type="button"
      >
        INSPIRE MEDIA
      </button>
      <button
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className={`${styles.menuButton} ${menuOpen ? styles.menuButtonOpen : ""}`}
        onClick={() => setMenuOpen((open) => !open)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );

  const renderDesktopHome = () => (
    <div className={styles.homeView}>
      {renderHero(false)}
      {renderSelectedWork(false)}
      <DesktopFooter />
    </div>
  );

  const renderMobileHome = () => (
    <div className={styles.homeView}>
      {renderHero(true)}
      {renderSelectedWork(true)}
      <MobileFooter />
    </div>
  );

  const renderDesktopCategory = () => {
    const page = pageContent[activePage as Exclude<PageId, "home">];

    if (!page) {
      return null;
    }

    return (
      <div className={styles.categoryView}>
        <aside className={styles.sidebar}>
          <button className={styles.backButton} onClick={() => openPage("home")} type="button">
            &larr; HOME
          </button>

          <div className={styles.sidebarMetaBlock}>
            <span>CATEGORY</span>
            <strong>{page.sideLabel}</strong>
          </div>

          <div className={styles.sidebarMetaBlock}>
            <span>CREATOR</span>
            <strong>{page.creator}</strong>
          </div>

          <div className={styles.sidebarMetaBlock}>
            <span>LOCATION</span>
            <strong>{page.location}</strong>
          </div>

          <div className={styles.sidebarMetaBlock}>
            <span>VIEWS</span>
            <strong>{page.count}</strong>
          </div>
        </aside>

        <section className={styles.categoryContent}>
          <div className={styles.categoryTopBar}>
            <strong>{page.heading}</strong>
            <span>{page.sideLabel}</span>
          </div>

          {page.video ? (
            <div className={styles.featureVideoWrap}>
              <video className={styles.featureVideo} controls poster={page.video.poster} src={page.video.src} />
            </div>
          ) : !page.items?.length && !page.videos?.length ? (
            <div className={styles.categoryGrid}>
              {Array.from({ length: 6 }).map((_, slot) => (
                <article
                  className={`${styles.placeholderCard} ${slot % 3 === 1 ? styles.placeholderCardAlt : ""}`}
                  key={`placeholder-${slot}`}
                >
                  <span>{page.heading}</span>
                  <em>Coming soon</em>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.categoryGrid}>
              {page.videos?.map((clip, clipIndex) => {
                const key = `d-${clipIndex}`;

                return (
                  <article
                    className={`${styles.categoryVideoCard} ${clip.landscape ? styles.videoCardLandscape : ""}`}
                    key={clip.title}
                    onMouseEnter={() => playFoodVideo(key)}
                    onMouseLeave={() => pauseFoodVideo(key)}
                  >
                    <video
                      data-food-key={key}
                      loop
                      muted
                      playsInline
                      poster={clip.poster}
                      preload="metadata"
                      ref={(element) => {
                        foodVideoRefs.current[key] = element;
                      }}
                      src={clip.src}
                    />
                    <div className={styles.videoUi}>
                      <button
                        aria-label={foodPlaying[key] ? "Pause video" : "Play video"}
                        className={styles.playButton}
                        onClick={() => toggleFoodVideo(key)}
                        type="button"
                      >
                        {foodPlaying[key] ? "❚❚" : "▶"}
                      </button>
                    </div>
                    <span>{clip.title}</span>
                  </article>
                );
              })}
              {page.items?.map((item) => (
                <article className={`${styles.desktopCategoryCard} ${styles.reveal}`} data-reveal key={item.title}>
                  <img alt={item.alt} src={item.image} />
                  <span>{item.title}</span>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  };

  const renderMobileCategory = () => {
    const page = pageContent[activePage as Exclude<PageId, "home">];

    if (!page) {
      return null;
    }

    return (
      <div className={styles.mobileCategoryView}>
        <div className={styles.mobileCategoryTopBar}>
          <button onClick={() => openPage("home")} type="button">
            &larr; HOME
          </button>
          <strong>{page.heading}</strong>
        </div>

        {page.video ? (
          <div className={styles.mobileFeatureVideoWrap}>
            <video className={styles.mobileFeatureVideo} controls poster={page.video.poster} src={page.video.src} />
          </div>
        ) : !page.items?.length && !page.videos?.length ? (
          <div className={styles.mobileWorkGrid}>
            {Array.from({ length: 4 }).map((_, slot) => (
              <article
                className={`${styles.placeholderCard} ${slot % 3 === 1 ? styles.placeholderCardAlt : ""}`}
                key={`placeholder-${slot}`}
              >
                <span>{page.heading}</span>
                <em>Coming soon</em>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.mobileWorkGrid}>
            {page.videos?.map((clip, clipIndex) => {
              const key = `m-${clipIndex}`;

              return (
                <article className={`${styles.mobileVideoCard} ${clip.landscape ? styles.videoCardLandscape : ""}`} key={clip.title}>
                  <video
                    data-food-key={key}
                    loop
                    muted
                    playsInline
                    poster={clip.poster}
                    preload="metadata"
                    ref={(element) => {
                      foodVideoRefs.current[key] = element;
                    }}
                    src={clip.src}
                  />
                  <div className={styles.videoUi}>
                    <button
                      aria-label={foodPlaying[key] ? "Pause video" : "Play video"}
                      className={styles.playButton}
                      onClick={() => toggleFoodVideo(key)}
                      type="button"
                    >
                      {foodPlaying[key] ? "❚❚" : "▶"}
                    </button>
                  </div>
                  <span>{clip.title}</span>
                </article>
              );
            })}
            {page.items?.map((item) => (
              <article className={`${styles.mobileWorkCard} ${styles.reveal}`} data-reveal key={item.title}>
                <img alt={item.alt} src={item.image} />
                <span>{item.title}</span>
              </article>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.pageShell} id="top">
      <h1 className={styles.srOnly}>
        Inspire Media — photography and film production studio in Dubai, UAE
      </h1>
      <div className={styles.desktopOnly}>
        {renderDesktopHeader()}
        <main className={styles.desktopContentArea}>
          <div className={styles.viewTransition} key={activePage}>
            {activePage === "home" ? renderDesktopHome() : renderDesktopCategory()}
          </div>
        </main>
      </div>

      <div className={styles.mobileOnly}>
        {renderMobileHeader()}

        <div
          aria-hidden={!menuOpen}
          className={`${styles.mobileMenuBackdrop} ${menuOpen ? styles.mobileMenuBackdropOpen : ""}`}
          onClick={() => setMenuOpen(false)}
        />

        <aside className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
          <div className={styles.mobileMenuHeader}>
            <button className={styles.mobileMenuBrand} onClick={() => openPage("home")} type="button">
              INSPIRE MEDIA
            </button>
            <button
              aria-label="Close menu"
              className={`${styles.menuButton} ${styles.menuButtonOpen} ${styles.mobileClose}`}
              onClick={() => setMenuOpen(false)}
              type="button"
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <nav className={styles.mobileNav}>
            {navItems.map((item) =>
              item.id === "home" ? (
                <button
                  className={styles.navLink}
                  key={item.id}
                  onClick={() => scrollToInfo(true)}
                  type="button"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  className={`${styles.navLink} ${activePage === item.id ? styles.activeNavItem : ""}`}
                  href={`/${item.id}`}
                  key={item.id}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className={styles.mobileInfo}>
            <span>INFORMATION</span>
            <a href="tel:+971544724435">+971 54 472 4435</a>
            <a href="mailto:inspiremediasite@gmail.com">inspiremediasite@gmail.com</a>
            <p>Office 2501R, Aspin Tower, Sheikh Zayed Road, Dubai, UAE</p>
            <span>FOLLOW US</span>
            {mobileSocials.map((item) => (
              <a href={item.href} key={item.label} rel="noreferrer" target="_blank">
                {item.label}
              </a>
            ))}
          </div>
        </aside>

        <main className={styles.mobileContentArea}>
          <div className={styles.viewTransition} key={activePage}>
            {activePage === "home" ? renderMobileHome() : renderMobileCategory()}
          </div>
        </main>
      </div>
    </div>
  );
}
