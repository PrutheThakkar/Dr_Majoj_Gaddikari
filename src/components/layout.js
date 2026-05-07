import React from "react";
import Header from "../components/header";
import "../css/common.css";
import "../css/home.css";
import "../css/about.css";
import "../css/spine-conditions.css";
import "../css/patient-journey.css";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
       <Footer />
    </>
  );
};

export default Layout;