import React, { useState } from "react";
import './Input.css'

const Input = (props) => {
  const [meuValor, setMeuValor] = useState();
  return (
    <div>
      <input
        type={props.tipo}
        id={props.id}
        name={props.nome}
        placeholder={props.ph}
        value={props.valor}
        onChange={(e)=> {
          props.fnAltera(e.target.value)
        }}
      />
      <span>{meuValor}</span>
    </div>
  );
};

export default Input;
