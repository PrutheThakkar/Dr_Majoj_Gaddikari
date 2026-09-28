import React, { useEffect } from "react";
import { navigate } from "gatsby";

const TreatmentsPage = () => {
  useEffect(() => {
    navigate("/spine-condition/slipped-or-herniated-disc/?view=all", { replace: true });
  }, []);

  return null;
};

export default TreatmentsPage;