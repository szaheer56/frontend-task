import React from "react";
//import "bootstrap/dist/css/bootstrap.min.css";

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src="/logo.png" alt="Logo" width="150" />
        </a>
      </div>
    </nav>
  );
};

export default Header;
