import React, { useEffect, useState } from "react";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import axios from "axios";

const Homepage = () => {
  const [homepageData, setHomepageData] = useState();

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:2900/api/admin");
      setHomepageData(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <SectionOne />
      <SectionTwo />
      <SectionThree homepageData={homepageData} />
      <SectionFour />
    </div>
  );
};

export default Homepage;
