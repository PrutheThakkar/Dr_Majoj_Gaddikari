import React, { useEffect, useRef, useState } from "react";

const ReadingParagraph = ({ children }) => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const words = children.trim().split(/\s+/);
  return (
    <p ref={ref} className={`reading-paragraph${started ? " is-reading" : ""}`}>
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <span className="reading-word" style={{ "--word-delay": `${index * 180}ms` }}>
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </p>
  );
};

export default ReadingParagraph;
