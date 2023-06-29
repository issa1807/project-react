import React from "react";
import { useParams } from "react-router-dom";
const PortfolioDetail = () => {
  const { slug } = useParams();
  return (
    <div>
      <h2>Portfolio Detail for {slug}</h2>
    </div>
  );
};
export default PortfolioDetail;
