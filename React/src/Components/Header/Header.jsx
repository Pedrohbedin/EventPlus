import React, { useState } from "react";
import "./Header.css";
import Container from "../Container/Container";
import Nav from "../Nav/Nav";
import PerfilUsuario from "../PerfilUsuarios/PerfilUsuario";
import MenuBar from "../../assets/images/menubar.png";

const Header = () => {
  const [exibeNavbar, setExibeNavbar] = useState(false);
  return (
    <header className="headerpage">
      <Container>
        <div className="header-flex">
          <img
            className="headerpage__menubar"
            src={MenuBar}
            alt="Imagem menu de barras, serve para exibir ou esconder o menu do smarthphone"
            onClick={() => {
              setExibeNavbar(true);
            }}
          />

          <Nav exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} />

          <PerfilUsuario />
        </div>
      </Container>
    </header>
  );
};

export default Header;
