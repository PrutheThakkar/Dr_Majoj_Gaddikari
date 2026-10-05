import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import spineExplainedImg from "../images/spine-explained.webp";
import spineExplainedImgmob from "../images/spine-exp-new1.svg";

gsap.registerPlugin(ScrollTrigger);

const mobilePoints = [
  {
    id: "vertebrae",
    title: "VERTEBRAE",
    point: [127.654 / 1706 * 100, 617.09 / 1144 * 100],
    text: "Individual bones that stack and protect the spinal cord",
  },
  {
    id: "joints",
    title: "JOINTS",
    point: [821.876 / 1706 * 100, 273.48 / 1144 * 100],
    text: "Facets that connect vertebrae and guide motion",
  },
  {
    id: "disc",
    title: "DISC",
    point: [424.43 / 1706 * 100, 769.62 / 1144 * 100],
    text: "Soft cushions that absorb shock and allow smooth movement",
  },
  {
    id: "muscles",
    title: "MUSCLES",
    point: [1492.75 / 1706 * 100, 557.691 / 1144 * 100],
    text: "Strong supportive tissues that stabilize and move the spine",
  },
  {
    id: "nerves",
    title: "NERVES",
    point: [1407.45 / 1706 * 100, 821.59 / 1144 * 100],
    text: "Nerve roots that carry signals between the spine and the body",
  },
];

const SpineExplained = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const mobileRef = useRef(null);
  const [activePoint, setActivePoint] = useState(0);
  const [mobileAnimated, setMobileAnimated] = useState(false);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(max-width: 1000px) and (prefers-reduced-motion: no-preference)", () => {
      setMobileAnimated(true);
      setActivePoint(0);
      return () => setMobileAnimated(false);
    });
    return () => media.revert();
  }, []);

  useEffect(() => {
    if (!mobileAnimated) return;

    const section = sectionRef.current;
    const panel = section.querySelector(".container");
    const header = document.querySelector(".site-header");
    let top = 70;
    let distance = 1;
    let frame;
    let disposed = false;
    const updateProgress = () => {
      const progress = Math.max(0, Math.min(1,
        (top - section.getBoundingClientRect().top) / distance
      ));
      setActivePoint(Math.min(mobilePoints.length - 1, Math.floor(progress * mobilePoints.length)));
    };
    const measure = () => {
      top = Math.ceil(header?.getBoundingClientRect().height || 70);
      section.style.setProperty("--spine-header-height", `${top}px`);
      distance = Math.max(240, window.innerHeight * 0.4) * (mobilePoints.length - 1);
      section.style.height = `${panel.offsetHeight + distance}px`;
      updateProgress();
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    if (header) observer.observe(header);
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(() => { if (!disposed) measure(); });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      section.style.removeProperty("height");
      section.style.removeProperty("--spine-header-height");
    };
  }, [mobileAnimated]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.innerWidth <= 1000) return;

    const ctx = gsap.context(() => {
      gsap.set(".spine-label", {
        opacity: 0,
        y: 25,
      });

      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.92,
        y: 40,
        xPercent: -50,
        yPercent: -50,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        xPercent: -50,
        yPercent: -50,
        duration: 1.2,
        ease: "power3.out",
      });

      tl.to(
        ".spine-label",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.25,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`spine-explained-section${mobileAnimated ? " has-mobile-story" : ""}`} ref={sectionRef}>
      <div className="container">
        <h2 data-aos={mobileAnimated ? undefined : "fade-up"}>The Spine Explained</h2>

        {/* Desktop */}
        <div className="spine-visual-wrap">
          <img
            ref={imageRef}
            src={spineExplainedImg}
            alt="Spine anatomy explained"
            className="spine-explained-img"
            loading="lazy"
          />

          <div className="spine-label label-vertebrae">
            <h4>VERTEBRAE</h4>
            <p>Individual bones that stack and protect the spinal cord</p>
            <span></span>
          </div>

          <div className="spine-label label-joints">
            <h4>JOINTS</h4>
            <p>Facets that connect vertebrae and guide motion</p>
            <span></span>
          </div>

          <div className="spine-label label-disc">
            <span></span>
            <h4>DISC</h4>
            <p>Soft cushions that absorb shock and allow smooth movement</p>
          </div>

          <div className="spine-label label-muscles">
            <h4>MUSCLES</h4>
            <p>Strong supportive tissues that stabilize and move the spine</p>
            <span></span>
          </div>

          <div className="spine-label label-nerves">
            <span></span>
            <h4>NERVES</h4>
            <p>Nerve roots that carry signals between the spine and the body</p>
          </div>
        </div>

        {/* Mobile */}
        <div className={`spine-mobile-wrap${mobileAnimated ? " is-scroll-animated" : ""}`} ref={mobileRef}>
          <div className="spine-mobile-visual-wrap">
            <img
              src={spineExplainedImgmob}
              alt="Spine anatomy explained"
              className="spine-mobile-main-img"
              loading="lazy"
            />
            {mobileAnimated && mobilePoints.map((item, index) => (
              <span
                key={item.id}
                className={`spine-mobile-hotspot${index === activePoint ? " is-active" : ""}`}
                style={{ left: `${item.point[0]}%`, top: `${item.point[1]}%` }}
                aria-hidden="true"
              />
            ))}
          </div>

          <div className="spine-mobile-info-list">
            {mobilePoints.map((item, index) => (
              <div
                className={`spine-mobile-info-card${index === activePoint ? " is-active" : ""}`}
                key={item.id}
                aria-hidden={mobileAnimated ? index !== activePoint : undefined}
              >
                <div className="spine-mobile-info-head">
                  <span className="info-dot"></span>
                  <h4>{item.title}</h4>
                </div>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          {mobileAnimated && (
            <div className="spine-mobile-progress" aria-hidden="true">
              <span>{String(activePoint + 1).padStart(2, "0")} / 05</span>
              <div className="spine-mobile-progress-track">
                <span style={{ width: `${(activePoint + 1) / mobilePoints.length * 100}%` }} />
              </div>
              <span>Scroll to explore</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SpineExplained;
