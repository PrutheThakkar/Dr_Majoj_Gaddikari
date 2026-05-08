import React, { useState } from "react";

const TreatmentPopup = ({ treatment }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button onClick={handleClick} className="popup-btn">
        {treatment} →
      </button>

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{treatment}</h2>
            <p>Detailed information about the {treatment} treatment goes here.</p>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TreatmentPopup;