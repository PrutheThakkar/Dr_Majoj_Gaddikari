import React, { useState } from "react";
import spineBody from "../images/spine-conditions-body.webp";

const conditions = [
  {
    id: "degenerative",
    title: "Degenerative Disc Disease",
    text: "Degenerative disc disease occurs when spinal discs gradually lose strength, hydration, and cushioning.",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80",
    className: "point-degenerative",
    cardStyle: {
      left: "7%",
      top: "22%",
    },
  },
  {
    id: "neck",
    title: "Chronic Neck and Lower Back Pain",
    text: "Chronic neck and lower back pain is discomfort that lasts for more than 12 weeks and may continue even after the initial cause has settled.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    className: "point-neck",
    cardStyle: {
      right: "7%",
      top: "27%",
    },
  },
  {
    id: "scoliosis",
    title: "Scoliosis",
    text: "Scoliosis is an abnormal sideways curve of the spine that can affect posture, balance, and movement.",
    image:
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=800&q=80",
    className: "point-scoliosis",
    cardStyle: {
      left: "7%",
      top: "53%",
    },
  },
  {
    id: "trauma",
    title: "Spine Trauma and Fractures",
    text: "Spine trauma and fractures may occur after injury, falls, or accidents and need careful evaluation.",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    className: "point-trauma",
    cardStyle: {
      right: "6%",
      top: "62%",
    },
  },
  {
    id: "slipped",
    title: "Slipped or Herniated Disc",
    text: "A slipped or herniated disc can press on nearby nerves and cause pain, numbness, or weakness.",
    image:
      "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=800&q=80",
    className: "point-slipped",
    cardStyle: {
     left: "8%",
    top: "75%",
    },
  },
  {
    id: "sciatica",
    title: "Sciatica",
    text: "Sciatica causes pain that travels from the lower back down the leg along the sciatic nerve.",
    image:
      "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&w=800&q=80",
    className: "point-sciatica",
    cardStyle: {
      right: "40%",
    top: "82%",
    },
  },
];

const SpineConditions = () => {
  const [activeCondition, setActiveCondition] = useState(null);

  return (
    <section className="spine-conditions-section" id="spine-conditions">
      <div className="container">
        <h2>Spine Conditions</h2>

        <div
          className="conditions-visual-wrap"
          onMouseLeave={() => setActiveCondition(null)}
        >
          <img
            src={spineBody}
            alt="Spine conditions"
            className="conditions-body-img"
          />

          {conditions.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`condition-point ${item.className}`}
              onMouseEnter={() => setActiveCondition(item)}
              onFocus={() => setActiveCondition(item)}
            >
              <span className="point-dot"></span>
              <span className="point-line"></span>
              <span className="point-title">{item.title}</span>
            </button>
          ))}

          {activeCondition && (
            <div
              className="condition-hover-card"
              style={activeCondition.cardStyle}
            >
              <h3>{activeCondition.title}</h3>

              <img
                src={activeCondition.image}
                alt={activeCondition.title}
                loading="lazy"
              />

              <p>{activeCondition.text}</p>
            </div>
          )}
        </div>

        <h3 className="conditions-bottom-text">
          Each condition affects the spine differently, which is why treatment begins with careful evaluation
        </h3>
      </div>
    </section>
  );
};

export default SpineConditions;