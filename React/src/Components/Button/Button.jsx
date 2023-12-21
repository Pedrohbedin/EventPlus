import React from 'react';
import "./Button.css";

const Button = (props) => {
    return (
        <div>
            <button type={props.tipo}>{props.textoBotao}</button>
        </div>
    );
};

export default Button;