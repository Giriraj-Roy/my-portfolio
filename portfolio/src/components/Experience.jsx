import React from 'react';
import ExperienceCard from "./ExperienceCard";
import {
  Container,
  Row,
} from "react-bootstrap";

const Experience = () => {

  const experiences = {
    data : [
      {
        role: "Frontend Development Engineer",
        company: "Growhut",
        companylogo: `../assets/growhut.jpeg`,
        date: "Jan 2023 – Mar 2023",
      },
      {
        role: "Frontend Developer Intern",
        company: "Mad Monkey",
        companylogo: `../assets/madmonkey.jpeg`,
        date: "Oct 2022 – Jan 2023",
      },

    ],
  }

  return (
    <section className="section">
      <Container>
          <h2 className="">
            {experiences.heading}
          </h2>
          <Row>
            {
              experiences.data.map((ele, index) => {
                return <ExperienceCard key={index} data={ele} />
              })
            }
          </Row>
      </Container>
    </section>
  );
}

export default Experience;