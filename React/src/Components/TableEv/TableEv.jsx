import React from "react";
import "./TableEv.css";

import editPen from "../../assets/images/edit-pen.svg";
import trashDelete from "../../assets/images/trash-delete.svg";
import { dateFormatDbToView } from "../../Utils/stringFunctions";
import { Tooltip } from "react-tooltip";

const TableEv = ({ dados, fnUpdate, fnDelete }) => {
  return (
    <table className="table-data">
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--big">
            Título
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Tipo de Evento
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Descrição
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Data
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Editar
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Deletar
          </th>
        </tr>
      </thead>

      <tbody>
        {dados.map((e) => {
          return (
            <tr key={e.idEvento} className="table-data__head-row">
              <td className="table-data__data table-data__data--big">
                {e.nomeEvento}
              </td>
              <td className="table-data__data table-data__data--big">
                {e.tiposEvento.titulo}
              </td>

              <td
                data-tooltip-id={e.idEvento}
                data-tooltip-content={e.descricao}
                data-tooltip-place="top"
                className="table-data__data table-data__data--big table-data__description"
              >
                <Tooltip className="custom-tooltip" id={e.idEvento} />
                {e.descricao}
              </td>
              <td className="table-data__data table-data__data--big ">
                {dateFormatDbToView(e.dataEvento)}
              </td>

              <td className="table-data__data table-data__data--little">
                <img
                  className="table-data__icon"
                  src={editPen}
                  alt=""
                  onClick={() => {
                    fnUpdate(e.idEvento);
                  }}
                />
              </td>

              <td className="table-data__data table-data__data--little">
                <img
                  className="table-data__icon"
                  src={trashDelete}
                  alt=""
                  onClick={() => fnDelete(e.idEvento)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableEv;
