import React from "react";
import Na from "../cf/na";
const Navbar = () => {
  return (
    <>
    <div className="t6">
      <Na/>
     </div>
    <nav className="navbar">
       <ul className="navbar-links">
        <li><a href="/cl">complaint</a></li>
        <li><a href="/about">status</a></li>
        <li><a href="/services">leadarboard</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <div><input className="in" type="text" placeholder="search"/></div>
    </nav>
    </>
  );
};

export default Navbar;

 