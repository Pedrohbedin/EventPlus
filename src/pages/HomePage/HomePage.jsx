import React, { useEffect, useState } from "react";
import "./HomePage.css";

import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/MainContent/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Title/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import api from "../../Services/Service";
import Notification from "../../components/Notification/Notification";
import { nextEventResource } from "../../Services/Service";
import { dateFormatDbToView } from "../../Utils/stringFunctions";

const HomePage = () => {
  useEffect(() => {
    async function getProximosEventos() {
      try {
        const promise = await api.get("/Evento/ListarProximos");

        console.log(promise.data);
        setNextEvents(promise.data);
      } catch (error) {
        console.log("Deu ruim na api");
      }
    }
    getProximosEventos();
    console.log("A home foi montada");
  }, []);

  const [nextEvent, setNextEvents] = useState([]);

  return (
    <MainContent>
      <Banner />
      {/* Proximos eventos */}
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"} />
          <div className="events-box">
            {nextEvent.map((e) => {
              return (
                <NextEvent
                  key={e.idEvento}
                  idEvent={e.idEvento}
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
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
