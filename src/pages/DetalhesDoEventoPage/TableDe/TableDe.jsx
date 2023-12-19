import React from "react";
// importa a biblioteca de tootips ()
import { Tooltip } from "react-tooltip";

import "./TableDe.css";

const Table = ({ dado, titulo, nF }) => {
  return (
    <table className="tbal-data">
      <thead className="tbal-data__head">
        <tr className="tbal-data__head-row tbal-data__head-row--red-color">
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Evento
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Data
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            descricao
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Tipo de Evento
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Instituicao
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="tbal-data__head-row" key={Math.random()}>
          <td className="tbal-data__data tbal-data__data--big">
            {dado.nomeEvento}
          </td>

          <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
            {new Date(dado.dataEvento).toLocaleDateString()}
          </td>

          <td
            data-tooltip-id={dado.idEvento}
            data-tooltip-content={dado.descricao}
            data-tooltip-place="top"
            className="event-card__description"
          >
            <Tooltip className="tooltip" id={dado.idEvento} />
            {dado.descricao}
          </td>

          <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
            {titulo}
          </td>

          <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
            {nF}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
