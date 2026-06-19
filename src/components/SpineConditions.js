import React, { useEffect, useState } from "react";
import spineBody from "../images/spine-conditions-body.webp";

const conditions = [
  {
    id: "degenerative",
    title: "Degenerative Disc Disease",
    labelTitle: (
      <>
        Degenerative<br /> Disc Disease
      </>
    ),
    text: "Degenerative disc disease occurs when spinal discs gradually lose strength, hydration, and cushioning.",
    image:
      "https://drmanoj.studiosentientdemo.com/wp-content/uploads/2026/05/Degenerative-Disc-Disease-popup.webp",
    className: "point-degenerative",
    cardStyle: {
      left: "7%",
      top: "22%",
    },
  },
  {
    id: "neck",
    title: "Chronic Neck and Lower Back Pain",
    labelTitle: (
      <>
        Chronic Neck and
        <br />
        Lower Back Pain
      </>
    ),
    text: "Chronic neck and lower back pain is discomfort that lasts for more than 12 weeks and may continue even after the initial cause has settled.",
    image:
      "https://drmanoj.studiosentientdemo.com/wp-content/uploads/2026/05/Chronic-Neck-popup.webp",
    className: "point-neck",
    cardStyle: {
      right: "7%",
      top: "27%",
    },
  },
  {
  id: "stenosis",
  title: "Spinal Stenosis",
  labelTitle: <>Spinal Stenosis</>,
  text: "Spinal stenosis is a narrowing of the spaces within the spine that can place pressure on the spinal cord or nerves.",
  image:
    "https://drmanoj.studiosentientdemo.com/wp-content/uploads/2026/05/Spinal-Stenosis-popup.webp",
  className: "point-stenosis",
  cardStyle: {
    right: "6%",
    top: "40%",
  },
},
 
  {
    id: "scoliosis",
    title: "Scoliosis",
    labelTitle: <>Scoliosis</>,
    text: "Scoliosis is an abnormal sideways curve of the spine that can affect posture, balance, and movement.",
    image:
      "https://drmanoj.studiosentientdemo.com/wp-content/uploads/2026/05/Scoliosis-popup.webp",
    className: "point-scoliosis",
    cardStyle: {
      left: "7%",
      top: "53%",
    },
  },
  {
    id: "trauma",
    title: "Spine Trauma and Fractures",
    labelTitle: (
      <>
        Spine Trauma and
        <br />
        Fractures
      </>
    ),
    text: "Spine trauma and fractures may occur after injury, falls, or accidents and need careful evaluation.",
    image:
      "https://drmanoj.studiosentientdemo.com/wp-content/uploads/2026/05/Spine-Trauma-Fractures-popup.webp",
    className: "point-trauma",
    cardStyle: {
      right: "6%",
      top: "62%",
    },
  },
  {
    id: "slipped",
    title: "Slipped or Herniated Disc",
    labelTitle: (
      <>
        Slipped or
        <br />
        Herniated Disc
      </>
    ),
    text: "A slipped or herniated disc can press on nearby nerves and cause pain, numbness, or weakness.",
    image:
      "https://drmanoj.studiosentientdemo.com/wp-content/uploads/2026/05/Slipped-Herniated-Disc-popup.webp",
    className: "point-slipped",
    cardStyle: {
      left: "8%",
      top: "75%",
    },
  },
  {
    id: "sciatica",
    title: "Sciatica",
    labelTitle: <>Sciatica</>,
    text: "Sciatica causes pain that travels from the lower back down the leg along the sciatic nerve.",
    image:
      "https://drmanoj.studiosentientdemo.com/wp-content/uploads/2026/05/Sciatica-popup.webp",
    className: "point-sciatica",
    cardStyle: {
      right: "40%",
      top: "82%",
    },
  },
];

const SpineConditions = () => {
  const [activeCondition, setActiveCondition] = useState(null);
  const [isPopupMode, setIsPopupMode] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsPopupMode(window.innerWidth <= 1280);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  useEffect(() => {
    if (isPopupMode && activeCondition) {
      document.body.classList.add("condition-popup-open");
    } else {
      document.body.classList.remove("condition-popup-open");
    }

    return () => {
      document.body.classList.remove("condition-popup-open");
    };
  }, [isPopupMode, activeCondition]);

  const closePopup = () => {
    setActiveCondition(null);
  };

  return (
    <section className="spine-conditions-section" id="spine-conditions">
      <div className="container">
        <h2>Spine Conditions</h2>

        <div
          className="conditions-visual-wrap"
          onMouseLeave={() => {
            if (!isPopupMode) {
              setActiveCondition(null);
            }
          }}
        >
          <div className="conditions-body-wrap">
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
                onMouseEnter={() => {
                  if (!isPopupMode) {
                    setActiveCondition(item);
                  }
                }}
                onFocus={() => {
                  if (!isPopupMode) {
                    setActiveCondition(item);
                  }
                }}
                onClick={() => {
                  if (isPopupMode) {
                    setActiveCondition(item);
                  }
                }}
                aria-label={item.title}
              >
                <span className="point-dot"></span>
                <span className="point-line"></span>
                <span className="point-title">
                  {item.labelTitle || item.title}
                </span>
              </button>
            ))}
          </div>

          {/* Desktop hover card */}
          {activeCondition && !isPopupMode && (
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
          Each condition affects the spine differently, which is why treatment
          begins with careful evaluation
        </h3>
      </div>

      {/* Mobile / Tablet popup */}
      {activeCondition && isPopupMode && (
        <div className="condition-popup-overlay" onClick={closePopup}>
          <div
            className="condition-popup-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="condition-popup-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="condition-popup-close"
              onClick={closePopup}
              aria-label="Close popup"
            >
              ×
            </button>

            <h3 id="condition-popup-title">{activeCondition.title}</h3>

            <img
              src={activeCondition.image}
              alt={activeCondition.title}
              loading="lazy"
            />

            <p>{activeCondition.text}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SpineConditions;