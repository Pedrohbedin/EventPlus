import React from "react";
import trashDelete from "../../assets/images/trash-delete-red.png";

import { Button, Input } from "../FormComponents/FormComponents";
import "./Modal.css";

const Modal = ({
  modalTitle = "Feedback",
  userId = null,
  showHideModal = false,
  fnDelete = null,
  fnGet = null,
  fnPost = null,
  fnNewCommentary = null,
  manipulationFunction = null,
  value="",
}) => {
  return (
    <div className="modal">
      <article className="modal__box">
        <h3 className="modal__title">
          {modalTitle}
          <span className="modal__close" onClick={showHideModal}>
            x
          </span>
        </h3>
        <div className="comentary">
          {fnGet.lenght < 0 ? (
            <p>Nenhum comentario...</p>
          ) : (
            fnGet.map((e) => {
              return (
                <div className="compo">
                  <p className="comentary__text">{e.descricao}</p>
                  <img
                    id={e.idComentarioEvento}
                    src={trashDelete}
                    className="comentary__icon-delete"
                    alt="Ícone de uma lixeira"
                    onClick={fnDelete}
                  />
                </div>
              );
            })
          )}
        </div>
        <Input
          placeholder="Escreva seu comentário..."
          additionalClass="comentary__entry"
          manipulationFunction={manipulationFunction}
          value={value}
        />

        <Button
          textButton="Comentar"
          additionalClass="comentary__button"
          manipulationFunction={fnPost}
        />
      </article>
    </div>
  );
};

export default Modal;
