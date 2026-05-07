import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";

import spineConditionsHero from "../images/about-hero.webp";

const spineConditions = [
  {
    icon: "spine",
    title: "Slipped Or Herniated Disc",
    description:
      "A slipped or herniated disc occurs when the soft inner portion of a spinal disc pushes outward and irritates nearby nerves. It can cause back or neck pain along with pain radiating into the arms or legs. Some patients may also experience numbness, tingling, or weakness. Symptoms often worsen with prolonged sitting, bending, or lifting.",
    treatments: [
      "Slip Disc / Disc Herniation Treatment",
      "Endoscopic Surgery",
      "Minimally Invasive Spine Surgery (MISS)",
    ],
  },
  {
    icon: "sciatica",
    title: "Sciatica & Nerve Compression",
    description:
      "Sciatica develops when spinal nerves in the lower back become compressed or irritated. It commonly causes sharp or burning pain that travels from the lower back into the buttocks and legs. Tingling, numbness, or weakness in the leg may also occur. Symptoms can worsen with prolonged sitting, bending, or sudden movements.",
    treatments: [
      "Sciatica & Nerve Compression Treatment",
      "Endoscopic Surgery",
      "Spinal Stenosis Management",
    ],
  },
  {
    icon: "neck",
    title: "Cervical Spine Disorders",
    description:
      "Cervical spine disorders affect the neck region and may involve disc degeneration, nerve compression, or spinal cord pressure. Common conditions include cervical spondylosis, radiculopathy, and myelopathy. Symptoms may include neck stiffness, arm pain, numbness, or weakness. In more advanced cases, balance and coordination may also be affected.",
    treatments: [
      "Cervical Spine Treatment",
      "Artificial Disc Replacement",
      "Spinal Fusion Surgery",
    ],
  },
  {
    icon: "lumbar",
    title: "Lumbar Spine Disorders",
    description:
      "Lumbar spine disorders affect the lower back and are commonly caused by degeneration, instability, or disc-related problems. These conditions may lead to persistent lower back pain, stiffness, or pain radiating into the legs. Daily activities such as bending, lifting, or prolonged standing may become difficult.",
    treatments: [
      "Lumbar Spine Disorders",
      "Minimally Invasive Spine Surgery (MISS)",
      "Back & Neck Pain Management",
    ],
  },
  {
    icon: "stenosis",
    title: "Spinal Stenosis",
    description:
      "Spinal stenosis occurs when the spinal canal narrows and places pressure on the spinal cord or nearby nerves. It commonly develops due to age-related changes affecting the discs, joints, and ligaments of the spine. Symptoms may include leg pain, numbness, weakness, or difficulty walking for long periods.",
    treatments: [
      "Spinal Stenosis Management",
      "Endoscopic Surgery",
      "Minimally Invasive Spine Surgery (MISS)",
    ],
  },
  {
    icon: "scoliosis",
    title: "Scoliosis & Spine Deformities",
    description:
      "Scoliosis and spinal deformities involve abnormal curvature or alignment of the spine that can affect posture and spinal balance. These conditions may develop during childhood, adolescence, or adulthood due to degeneration. Patients may notice uneven shoulders, back pain, muscle fatigue, or changes in posture.",
    treatments: [
      "Scoliosis & Spine Deformity Correction",
      "Spinal Fusion Surgery",
      "Preventive Spine Health Consultation",
    ],
  },
  {
    icon: "trauma",
    title: "Spine Trauma & Fractures",
    description:
      "Spinal trauma refers to injuries affecting the vertebrae, discs, ligaments, or spinal cord following accidents or falls. These injuries can range from minor fractures to severe instability involving nerve damage. Symptoms may include intense back or neck pain, restricted movement, numbness, or weakness.",
    treatments: [
      "Spine Trauma & Fracture Treatment",
      "Kyphoplasty & Vertebroplasty",
      "Spinal Fusion Surgery",
    ],
  },
  {
    icon: "compression",
    title: "Osteoporotic Compression Fractures",
    description:
      "Osteoporotic compression fractures occur when weakened vertebrae collapse due to reduced bone strength. These fractures are more common in older adults and may develop even after minor strain or movement. Symptoms often include sudden back pain, reduced mobility, and posture changes.",
    treatments: [
      "Kyphoplasty & Vertebroplasty",
      "Spine Trauma & Fracture Treatment",
      "Preventive Spine Health Consultation",
    ],
  },
  {
    icon: "junction",
    title: "Craniovertebral Junction Disorders",
    description:
      "Craniovertebral junction disorders affect the area where the skull meets the upper cervical spine. These conditions may involve congenital problems, trauma, instability, or compression around the brainstem and spinal cord. Patients may experience neck pain, headaches, balance problems, weakness, or coordination difficulty.",
    treatments: [
      "Craniovertebral Junction Surgery",
      "Spinal Fusion Surgery",
      "Minimally Invasive Spine Surgery (MISS)",
    ],
  },
  {
    icon: "infection",
    title: "Spinal Infections & Tuberculosis",
    description:
      "Spinal infections occur when bacteria or tuberculosis affect the bones, discs, or surrounding spinal tissues. These infections may gradually damage the vertebrae and lead to pain, stiffness, or deformity. Symptoms can include persistent back pain, fever, fatigue, or weakness.",
    treatments: [
      "Spinal Infections & Tuberculosis Treatment",
      "Spinal Fusion Surgery",
      "Minimally Invasive Spine Surgery (MISS)",
    ],
  },
  {
    icon: "tumor",
    title: "Spine Tumors",
    description:
      "Spine tumors are abnormal growths that develop within or around the spine and may affect the vertebrae, nerves, or spinal cord. These tumors can be benign or malignant depending on their origin and behaviour. Symptoms may include persistent pain, weakness, numbness, or difficulty walking.",
    treatments: [
      "Spine Tumor Management",
      "Spinal Fusion Surgery",
      "Minimally Invasive Spine Surgery (MISS)",
    ],
  },
  {
    icon: "pain",
    title: "Chronic Back & Neck Pain",
    description:
      "Chronic back and neck pain can develop due to muscle strain, poor posture, disc degeneration, or long-term spinal stress. The pain may interfere with movement, sleep, and daily activities over time. Some patients experience stiffness, headaches, or pain radiating into the arms or legs.",
    treatments: [
      "Back & Neck Pain Management",
      "Preventive Spine Health Consultation",
      "Second Opinion for Spine Surgery",
    ],
  },
];

const ConditionIcon = ({ type }) => {
  return (
    <span className={`condition-icon condition-icon-${type}`}>
      <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 5C18.7 8.5 18.7 11.4 21 14.6C23.3 17.8 23.3 20.8 21 24C18.7 27.2 18.7 30.6 21 37"
          stroke="#102f45"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M13 9H24.5M16 14H28M13.5 19H25.5M16 24H28.5M13 29H24.5"
          stroke="#102f45"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};

const SpineConditionsPage = () => {
  return (
    <Layout>
      <main className="spine-conditions-page">
        {/* Hero */}
        <section className="conditions-hero-section">
          <img
            src={spineConditionsHero}
            alt="Understanding spine conditions"
            className="conditions-hero-bg"
          />

          <div className="conditions-hero-content">
            <h1>
              Understanding <br />
              Spine Conditions
            </h1>

            <p>
              Understanding the underlying cause of spine pain is the first step
              toward effective treatment and long-term recovery.
            </p>
          </div>
        </section>

        {/* Conditions List */}
        <section className="conditions-list-section">
          <div className="container">
            <h2>Spine Conditions</h2>

            <p className="conditions-section-intro">
              Comprehensive evaluation and treatment for a wide range of spinal
              disorders affecting the neck, back, and nerves.
            </p>

            <div className="conditions-list-wrap">
              {spineConditions.map((condition, index) => (
                <div className="condition-row" key={index}>
                  <div className="condition-left">
                    <ConditionIcon type={condition.icon} />

                    <h3>{condition.title}</h3>

                    <p>{condition.description}</p>
                  </div>

                  <div className="condition-right">
                    <h4>Major Treatment Approaches</h4>

                    <div className="treatment-option-list">
                      {condition.treatments.map((item, itemIndex) => (
                        <Link
                          to="/treatments/"
                          className="treatment-option"
                          key={itemIndex}
                        >
                          <span>{item}</span>
                          <span className="arrow">→</span>
                        </Link>
                      ))}
                    </div>

                    <Link to="/treatments/" className="view-treatment-btn">
                      View All Treatment Options
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default SpineConditionsPage;