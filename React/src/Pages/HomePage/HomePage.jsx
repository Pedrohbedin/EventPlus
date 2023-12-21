import React, { useEffect, useState } from "react";
import MainContent from "../../Components/MainContent/MainContent";
import Banner from "../../Components/Banner/Banner";
import VisionSection from "../../Components/VisionSection/VisionSection";
import ContatctSection from "../../Components/ContactSection/ContactSection";
import NextEvent from "../../Components/NextEvent/NextEvent";
import Container from "../../Components/Container/Container";
import Title from "../../Components/Title/Title";
import { dateFormatDbToView } from "../../Utils/stringFunctions";
import api from "../../Services/Services";
import { Select } from "../../Components/FormComponents/FormComponents";


import "./HomePage.css";

const HomePage = () => {
  // select mocado
  const [tipoDeEvento] = useState([
    { value: "1", text: "Próximos eventos" },
    { value: "2", text: "Evento passados" },
  ]);

  const [tipoEvento, setTipoEvento] = useState("1");

  useEffect(() => {
    async function getProximosEventos() {
      try {
        const promise = await api.get("/Evento");
        setEvents(promise.data);
      } catch (error) {
        console.log("Deu ruim na api");
      }
    }
    getProximosEventos();
    console.log("A home foi montada");
  }, []);

  const [event, setEvents] = useState([]);

  return (
    <MainContent>
      <Banner />
      {/* Proximos eventos */}
      <section className="proximos-eventos">
        <Container>
        <Title
            titleText={"Eventos"}
          />
          {/* Seleção do Eventos */}
          <Select
            id="id-tipo-de-evento"
            name="tipo-de-evento"
            aditionalClass="select-tp-evento"
            dados={tipoDeEvento}
            manipulationFunction={(e) => setTipoEvento(e.target.value)}
            defaultText="Selecione"
            defaultValue="1"
            titleKey="text"
            idKey="value"
          />
          <div className="events-box">
            {tipoEvento === "1"
              ? event
                  .filter((e) => new Date(e.dataEvento) >= new Date())
                  .map((e) => {
                    return (
                      <NextEvent
                        key={e.idEvento}
                        idEvento={e.idEvento}
                        title={e.nomeEvento}
                        description={e.descricao}
                        eventDate={dateFormatDbToView(e.dataEvento)}
                      />
                    );
                  })
              : event
                  .filter((e) => new Date(e.dataEvento) < new Date())
                  .map((e) => {
                    return (
                      <NextEvent
                        key={e.idEvento}
                        idEvento={e.idEvento}
                        title={e.nomeEvento}
                        description={e.descricao}
                        eventDate={dateFormatDbToView(e.dataEvento)}
                      />
                    );
                  })}
          </div>
        </Container>
      </section>
      <VisionSection />
      <ContatctSection />
    </MainContent>
  );
};

export default HomePage;
