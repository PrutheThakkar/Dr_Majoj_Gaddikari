import React from "react";
import Layout from "../components/layout";

import aboutHero from "../images/about-hero.webp";
import doctorImg from "../images/about-dr.webp";

import medConsultImg from "../images/medical-consult.webp";
import medCheckImg from "../images/medical-check.webp";
import medSpineImg from "../images/medical-spine.webp";
import medSurgeryImg from "../images/medical-surgery.webp";

import treatmentPhysioImg from "../images/treatment-physio.webp";
import treatmentExerciseImg from "../images/treatment-exercise.webp";
import treatmentMedicationImg from "../images/treatment-medication.webp";
import diagnosisImg from "../images/diagnosis-spine.webp";

const expertiseItems = [
    "Slipped Or Herniated Discs",
    "Sciatica And Nerve Compression",
    "Spinal Stenosis",
    "Degenerative Disc Disease",
    "Scoliosis And Spinal Deformities",
    "Spine Trauma And Fractures",
    "Minimally Invasive Spine Surgery",
    "Endoscopic Spine Procedures",
];
const treatmentItems = [
    {
        title: "Physiotherapy",
        image: treatmentPhysioImg,
    },
    {
        title: "Strengthening Exercises",
        image: treatmentExerciseImg,
    },
    {
        title: "Medication",
        image: treatmentMedicationImg,
    },
];

const AboutPage = () => {
    return (
        <Layout>
            <main className="about-page">
                {/* Hero Section */}
                <section className="about-hero-section">
                    <div className="about-hero-bg">
                        <img src={aboutHero} alt="Spine care background" />
                    </div>

                    <div className="about-hero-content">
                        <h1>About Dr. Gaddikeri</h1>

                        <p>
                            Dr. Manojkumar Gaddikeri brings a focused and thoughtful approach
                            to spine care, with experience in diagnosing and treating a wide
                            range of spinal conditions. His work centres on understanding each
                            patient’s concerns and offering treatment plans that are precise,
                            minimally invasive, and tailored to long-term recovery.
                        </p>
                    </div>
                </section>

                {/* Doctor Intro Section */}
                <section className="about-doctor-detail-section">
                    <div className="container">
                        <h2>
                            Spine Problems Can Affect How People Move, Work, And Perform
                            Everyday Activities
                        </h2>

                        <div className="about-doctor-image-wrap">
                            <img
                                src={doctorImg}
                                alt="Dr. Manojkumar Gaddikeri"
                                className="about-doctor-main-img"
                            />
                        </div>

                        <div className="about-doctor-copy">
                            <p>
                                Dr. Manojkumar Gaddikeri is an orthopaedic spine surgeon who
                                focuses on diagnosing and treating conditions affecting the
                                spine. His work includes managing common spine problems such as
                                slipped discs and sciatica, as well as more complex conditions
                                involving nerve compression, spinal instability, or deformity.
                            </p>

                            <p>
                                The aim of treatment is to identify the source of symptoms and
                                guide patients toward the most effective treatment option.
                            </p>
                        </div>

                    </div>
                </section>

                {/* Medical Background Section */}
                <section className="medical-background-section">
                    <div className="container">
                        <h2>Medical Background</h2>

                        <div className="medical-bg-layout">
                            <img
                                src={medConsultImg}
                                alt="Doctor consultation"
                                className="medical-floating-img medical-img-one"
                            />

                            <img
                                src={medCheckImg}
                                alt="Spine examination"
                                className="medical-floating-img medical-img-two"
                            />

                            <div className="medical-bg-copy">
                                <p>
                                    Dr. Gaddikeri trained in orthopaedic surgery before developing
                                    a specialised focus on spinal disorders.
                                </p>

                                <p>
                                    His experience includes evaluating and treating a wide range
                                    of spine conditions across different age groups and activity
                                    levels. Over time, his work has focused increasingly on
                                    conditions involving nerve compression, disc problems, and
                                    degenerative changes in the spine. His training includes
                                    experience in advanced spine procedures and minimally invasive
                                    surgical techniques.
                                </p>
                            </div>

                            <img
                                src={medSpineImg}
                                alt="Spine model consultation"
                                className="medical-floating-img medical-img-three"
                            />

                            <img
                                src={medSurgeryImg}
                                alt="Spine surgery"
                                className="medical-floating-img medical-img-four"
                            />
                        </div>

                        <div className="expertise-area-wrap">
                            <h2>Areas of Expertise</h2>

                            <div className="expertise-grid">
                                {expertiseItems.map((item, index) => (
                                    <div className="expertise-card" key={index}>
                                        <span className="expertise-icon">
                                            <svg
                                                width="34"
                                                height="34"
                                                viewBox="0 0 34 34"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M17 3C14.8 6.1 14.8 8.5 17 11.5C19.2 14.5 19.2 17 17 20C14.8 23 14.8 25.9 17 31"
                                                    stroke="#0c3048"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M10 7H20.5M13 12H23M10.5 17H21.5M13 22H23.5M10 27H20.5"
                                                    stroke="#0c3048"
                                                    strokeWidth="1.6"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </span>

                                        <h3>{item}</h3>
                                    </div>
                                ))}
                            </div>

                            <p className="expertise-bottom-text">
                                These conditions often require careful evaluation because
                                multiple structures in the spine may be involved.
                            </p>

                            <a href="#contact" className="about-page-btn">
                                Book a consultation
                            </a>
                        </div>
                    </div>
                </section>

              

                {/* Treatment Approach Section */}
                <section className="about-treatment-section">
                    <div className="container">
                        <h2>Approach To Treatment</h2>

                        <p className="about-treatment-intro">
                            One of the most common questions patients have is whether surgery will be
                            required. In many situations, spine conditions can be treated without
                            surgery. Physiotherapy, strengthening exercises, posture correction, and
                            medication may help reduce symptoms and improve function.
                        </p>

                        <div className="about-treatment-grid">
                            {treatmentItems.map((item, index) => (
                                <div className="about-treatment-card" key={index}>
                                    <img src={item.image} alt={item.title} />
                                    <h3>{item.title}</h3>
                                </div>
                            ))}
                        </div>

                        <div className="consultation-diagnosis-wrap">
                            <h2>Consultation And Diagnosis</h2>

                            <p>
                                A spine consultation involves understanding the patient’s symptoms as
                                well as reviewing imaging studies.
                            </p>

                            <div className="diagnosis-image-card">
                                <img src={diagnosisImg} alt="Spine diagnosis" />
                                <span>Detailed Discussion Of Symptoms</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default AboutPage;