import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import spineExplainedImg from "../images/spine-explained.webp";
import spineExplainedImgmob from "../images/spine-exp.svg";

gsap.registerPlugin(ScrollTrigger);

const SpineExplained = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

 useEffect(() => {
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
    <section className="spine-explained-section" ref={sectionRef}>
      <div className="container">
        <h2 data-aos="fade-up">The Spine Explained</h2>

        <div className="spine-visual-wrap">
          <img
            ref={imageRef}
            src={spineExplainedImg}
            alt="Spine anatomy explained"
            className="spine-explained-img"
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
        <div className="img-wrap">
          <img src={spineExplainedImgmob} alt="Spine anatomy explained" />
        </div>

      </div>
    </section>
  );
};

export default SpineExplained;