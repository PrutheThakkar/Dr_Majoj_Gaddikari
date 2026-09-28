import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { Link } from "gatsby";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SymptomsHorizontal = ({
  symptomsList = [],
  heading = "When The Spine Is Affected; Symptoms Appear",
  description,
  bottomText,
  buttonText,
  buttonLink = "/contact",
}) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const symptomItems = useMemo(() => {
    return symptomsList
      ?.filter((item) => item?.title || item?.subtitle || item?.svg)
      ?.map((item) => ({
        title: item?.title || "",
        subtitle: item?.subtitle || "",
        svg: item?.svg || "",
      }));
  }, [symptomsList]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track || !symptomItems?.length) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 821px)", () => {
      let active = true;
      let refreshFrame;
      const viewport = track.parentElement;
      const refresh = () => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
          if (active) ScrollTrigger.refresh();
        });
      };
      const ctx = gsap.context(() => {
        const getDistance = () =>
          Math.max(0, track.scrollWidth - viewport.clientWidth);
        const getHeaderHeight = () =>
          document.querySelector(".site-header")?.offsetHeight || 0;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: () => `top top+=${getHeaderHeight()}`,
            end: () => `+=${Math.max(1, getDistance()) + window.innerHeight * 0.25}`,
            // Follow scroll exactly so the strip finishes before the pin releases.
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.fromTo(track, { x: 0 }, {
          x: () => -getDistance(),
          duration: 1,
          ease: "none",
        });
        // Keep the final card in view for a little more scroll before continuing.
        timeline.to({}, { duration: 0.2 });
      }, section);

      const observer = new ResizeObserver(refresh);
      observer.observe(track);
      observer.observe(viewport);
      document.fonts?.ready.then(() => {
        if (active) refresh();
      });
      refresh();

      return () => {
        active = false;
        observer.disconnect();
        cancelAnimationFrame(refreshFrame);
        ctx.revert();
      };
    });

    return () => {
      mm.revert();
    };
  }, [symptomItems?.length]);

  if (!symptomItems?.length) return null;

  const renderSvg = (svg) => {
    if (!svg) return null;

    return (
      <div
        className="symptom-svg"
        dangerouslySetInnerHTML={{
          __html: svg,
        }}
      />
    );
  };

  const renderSymptomCard = (item, index) => (
    <div className="symptom-card" key={`${item.title}-${index}`}>
      {item.svg && (
        <div className="symptom-icon">
          {renderSvg(item.svg)}
        </div>
      )}

      {item.title && <h3>{item.title}</h3>}

      {item.subtitle && <p>{item.subtitle}</p>}
    </div>
  );

  return (
    <section className="symptoms-horizontal-section" ref={sectionRef}>
      {(heading || description) && (
        <div className="symptoms-heading-wrap">
          {heading && <h2 data-aos="fade-up">{heading}</h2>}

          {description && (
            <p className="symptoms-description" data-aos="fade-up">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="symptoms-scroll-area symptoms-desktop-area">
        <div className="symptoms-track" ref={trackRef}>
          {symptomItems.map((item, index) => renderSymptomCard(item, index))}
        </div>
      </div>

      <div className="symptoms-mobile-slider">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          slidesPerView={1}
          spaceBetween={18}
          loop={symptomItems.length > 1}
          speed={800}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {symptomItems.map((item, index) => (
            <SwiperSlide key={`${item.title}-mobile-${index}`}>
              {renderSymptomCard(item, index)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {(bottomText || buttonText) && (
        <div className="symptoms-bottom">
          <div className="container">
            {bottomText && <h3>{bottomText}</h3>}

            {buttonText && (
              <Link to={buttonLink} className="common-btn">
                <span className="common-btn-text">{buttonText}</span>
                <span className="common-btn-icon">→</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default SymptomsHorizontal;
