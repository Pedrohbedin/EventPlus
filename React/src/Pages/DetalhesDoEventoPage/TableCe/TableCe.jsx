import React from "react";
import "./TableCe.css";

const TableCe = ({ comentarios }) => {
  return (
    <div className="lista-comentarios">
      <table className="tbal-data">
        <tbody>
          {comentarios.map((e) => {
            return (
              <tr className="tbal-data__head-row" key={Math.random()}>
                <td className="tbal-data__data comentario">
                  <h1 className="comentario-escritor">{e.usuario.nome}</h1>
                  <p className="comentario-texto">{e.descricao}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableCe;
