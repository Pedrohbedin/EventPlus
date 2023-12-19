import React, { useEffect, useState } from "react";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import MainContent from "../../Components/MainContent/MainContent";
import Title from "../../Components/Title/Title";
import "./TipoEventosPage.css";
import eventTypeImage from "../../assets/images/tipo-evento.svg";
import Container from "../../Components/Container/Container";
import { Input, Button } from "../../Components/FormComponents/FormComponents";
import api from "../../Services/Services";
import Notification from "../../Components/Notification/Notification";
import TableTb from "../../Components/TableTb/TableTb";
import Spinner from "../../Components/Spinner/Spinner";

const TipoEventosPage = () => {
  const [notifyUser, setNotifyUser] = useState({});

  const [frmEdit, setFrmEdit] = useState(false);

  const [titulo, setTitulo] = useState("");

  const [idEvento, setIdEvento] = useState("");

  const [tipoEventos, setTipoEventos] = useState([]);
  
  const [showSpinner, setShowSpinner] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();

    if (titulo.trim().length < 3) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `O título deve conter no mínimo 3 caractéres!`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
      return;
    }

    try {
      await api.post("/TiposEvento", { titulo: titulo });
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
      const promise = await api.get("/TiposEvento");
      setTipoEventos(promise.data);
      setTitulo("");
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Tipo de evento não cadastrado!`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (titulo.trim().length < 3) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `O título deve conter no mínimo 3 caractéres!`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
      return;
    }
    try {
      await api.put(`/TiposEvento/` + idEvento, {
        titulo: titulo,
      });

      const retornoGet = await api.get("/TiposEvento");
      setTipoEventos(retornoGet.data);
      const promise = await api.get("/TiposEvento");
      setTipoEventos(promise.data);
      editActionAbort();
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro ao atualizar o tipo de evento`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
    }
  }

  async function showUpdateForm(idElemento) {
    setFrmEdit(true);
    try {
      const retorno = await api.get("/TiposEvento/" + idElemento);
      setTitulo(retorno.data.titulo);
      setIdEvento(idElemento);
      const promise = await api.get("/TiposEvento");
      setTipoEventos(promise.data);
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro ao listar os tipos de evento`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
    }
  }

  function editActionAbort() {
    setFrmEdit(false);
    setTitulo("");
    setIdEvento(null);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/TiposEvento/${id}`);
      tipoEventos.filter((tipoEvento) => tipoEvento.idTipoEvento !== id);
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Deletado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
      const promise = await api.get("/TiposEvento");
      setTipoEventos(promise.data);
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro ao deletar!`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
    }
  }

  useEffect(() => {
    async function getTipoEventos() {
      setShowSpinner(true);
      setShowSpinner(true)
      try {
        const promise = await api.get("/TiposEvento");
        setTipoEventos(promise.data);
      } catch (error) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: `Erro ao receber dados da api`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });
      }
      setShowSpinner(false);
    }
    getTipoEventos();
  }, []);

  return (
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
      {showSpinner ? <Spinner /> : null}
      { showSpinner ? <Spinner/> : null}
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title
              titleText={"Cadastro tipo de eventos"}
              additionalClass={"cor-titulo"}
              color={""}
            />
            <ImageIllustrator alterText="" imageRender={eventTypeImage} />
            <form
              className="ftipo-evento"
              onSubmit={frmEdit ? handleUpdate : handleSubmit}
            >
              {!frmEdit ? (
                <>
                  <Input
                    type={"text"}
                    id={"text"}
                    name={"titulo"}
                    placeholder={"Título"}
                    required={"required"}
                    value={titulo}
                    manipulationFunction={(e) => {
                      setTitulo(e.target.value);
                    }}
                  />
                  <Button
                    type={"submit"}
                    id={"cadastrar"}
                    name={"cadastrar"}
                    textButton={"Cadastrar"}
                  />
                </>
              ) : (
                <>
                  <Input
                    type={"text"}
                    id={"titulo"}
                    name={"titulo"}
                    placeholder={"Título"}
                    required={"required"}
                    value={titulo}
                    manipulationFunction={(e) => {
                      setTitulo(e.target.value);
                    }}
                  />
                  <div className="buttons-editbox">
                    <Button
                      type={"submit"}
                      id={"atualizar"}
                      name={"atualizar"}
                      textButton={"Atualizar"}
                      aditionalClass="button-component--midle"
                    />
                    <Button
                      type={"button"}
                      id={"cancelar"}
                      name={"cancelar"}
                      textButton={"Cancelar"}
                      manipulationFunction={editActionAbort}
                      aditionalClass="button-component--midle"
                    />
                  </div>
                </>
              )}
            </form>
          </div>
        </Container>
      </section>

      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Lista Tipo de Eventos"} color="white" />
          <TableTb 
            href="#ftipo-evento"
            dados={tipoEventos}
            fnUpdate={showUpdateForm}
            fnDelete={handleDelete}
          />
        </Container>
      </section>
    </MainContent>
  );
};

export default TipoEventosPage;
