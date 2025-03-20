import React from "react";
import Banner from "../components/Banner";
import Welcome from "../components/Welcome";
import NewsComponent from "../components/NewsComponent";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Banner />
      <Welcome />
      <NewsComponent />
      <Footer />
    </div>
  );
};

export default Home;
