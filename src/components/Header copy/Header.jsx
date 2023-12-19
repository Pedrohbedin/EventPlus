import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <nav>
                <Link to={"/"}>Home</Link>
                <br />
                <Link to={"/tipo-eventos"}>TipoEventosPage</Link>
                <br />  
                <Link to={"/eventos"}>EventosPage</Link>
                <br />
                <Link to={"/login"}>LoginPage</Link>
                <br />
                <Link to={"/testes"}>TestePage</Link>
            </nav>
        </header>
    );
};

export default Header;