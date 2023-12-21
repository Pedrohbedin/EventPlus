import React from "react";
import Title from "../Title/Title";
import "./VisionSection.css";

const VisionSection = () => {
  return (
    <section className="vision"> 
      <div className="vision__box">
        <Title
          titleText={"Visão"}
          color="white"
          additionalClass="vision__title"
        />

        <p className="vision__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          odio quasi quia ratione cum illum minus dolore nostrum. Iusto nesciunt
          est omnis praesentium necessitatibus velit fuga debitis harum aliquid
          nihil!
        </p>
      </div>
    </section>
  );
};

export default VisionSection;
