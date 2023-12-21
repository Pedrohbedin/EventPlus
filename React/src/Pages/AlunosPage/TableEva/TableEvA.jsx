import React from "react";
import comentaryIcon from "../../../assets/images/comentary-icon.svg";
import { dateFormatDbToView } from "../../../Utils/stringFunctions";
import ToggleSwitch from "../../../Components/ToggleSwitch/Toggle";
// importa a biblioteca de tootips ()
import { Tooltip } from "react-tooltip";

import "./TableEvA.css";

const Table = ({
  dados,
  fnConnect = null,
  fnShowModal = null,
  setarId = null,
}) => {
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
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {dados.map((e) => {
          const now = new Date();
          const eventDate = new Date(e.dataEvento);
          const toggleActive = eventDate <= now;
          const toggleActiveSwitch = eventDate >= now
          return (
            <tr className="tbal-data__head-row" key={Math.random()}>
              <td className="tbal-data__data tbal-data__data--big">
                {e.nomeEvento}
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                {/* {e.dataEvento} */}
                {dateFormatDbToView(e.dataEvento)}
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                {toggleActive ? (
                  <img
                    className="tbal-data__icon"
                    id={e.idEvento}
                    src={comentaryIcon}
                    alt=""
                    onClick={fnShowModal}
                  />
                ) : null}
                {toggleActiveSwitch ? (
                  <ToggleSwitch
                  manipulationFunction={() => {
                    fnConnect(e.idEvento, e.situacao, e.idPresencaEvento);
                  }}
                  toggleActive={e.situacao}
                />
                ) : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
