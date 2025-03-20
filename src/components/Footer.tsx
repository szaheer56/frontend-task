import React from "react";


const Footer: React.FC = () => {
  return (
    <footer className="footer">
    <div className="footer-content">
        <div className="footer-left">
            <i className="fas "></i>
            <span><strong>innoscripta AG</strong> – Arnulfstraße 60, 80335 München</span>
        </div>
        <div className="footer-right">
            <i className="fas "></i>
            <a href="https://innoscripta.com">innoscripta.com</a>
        </div>
    </div>
</footer>

  );
};

export default Footer;
