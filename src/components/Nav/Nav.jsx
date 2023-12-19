import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import LogoMobile from "../../assets/images/logo-white.svg";
import LogoDesktop from "../../assets/images/logo-pink.svg";
import { UserContext } from "../../context/AuthContext";

const Nav = ({ setExibeNavbar, exibeNavbar }) => {
  const { userData, setUserData } = useContext(UserContext);
  return (
    <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""} `}>
      <span
        className="navbar__close"
        onClick={() => {
          setExibeNavbar(false);
        }}
      >
        x
      </span>

      <Link to="">
        <img
          className="eventlogo__logo-image"
          src={window.innerWidth >= 992 ? LogoDesktop : LogoMobile}
          alt="Event plus logo"
        />
      </Link>

      <div className="navbar__items-box">
        <Link to={"/"} className="navbar__item">
          Home
        </Link>
        {userData.role === "Administrador" ? (
          <>
            <Link to={"/tipo-eventos"} className="navbar__item">
              Tipo Eventos
            </Link>
            <Link to={"/eventos"} className="navbar__item">
              Eventos
            </Link>
          </>
        ) : (
          userData.role === "Comum" ? (<Link to={"/eventos-alunos"} className="navbar__item">Eventos alunos</Link>) : (null)
        )}
      </div>
    </nav>
  );
};

export default Nav;
