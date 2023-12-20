import React from "react";
import growhut from "../assets/growhut.jpeg";
import madmonkey from "../assets/madmonkey.jpeg";
import { Col } from "react-bootstrap";

const ExperienceCard = ({ data }) => {
  return (
    <Col lg="6">
      <div className="">
        <img width="100px" className="" src={data.company === "Growhut" ? growhut : madmonkey} alt={data.company} />
        
        <p className="lead">
          {data.role}
          <br />
          {data.company}
          <br/>
          {data.date}
        </p>
      </div>
    </Col>
  );
};

export default ExperienceCard;