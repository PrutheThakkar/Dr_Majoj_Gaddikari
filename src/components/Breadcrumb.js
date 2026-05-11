import React from "react";
import { Link } from "gatsby";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li className="breadcrumb-item" key={index}>
              <span className="breadcrumb-sep">›</span>
              {isLast || !item.link ? (
                <span className="breadcrumb-current">{item.label}</span>
              ) : (
                <Link to={item.link}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;