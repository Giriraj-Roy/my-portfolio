import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProjectCard from "./ProjectCard";
import '../App.css';
import axios from "axios";

const dummyProject = {
  name: null,
  description: null,
  svn_url: null,
  stargazers_count: null,
  languages_url: null,
  pushed_at: null,
};
const API = "https://api.github.com";
// const gitHubQuery = "/repos?sort=updated&direction=desc";
// const specficQuerry = "https://api.github.com/repos/hashirshoaeb/";

const Projects = ({
  // heading, username, 
    // len, specfic 
  }
  ) => {
  const heading = "Recent Projects"
  const username = "Giriraj-Roy"
  var length = 4
  let specfic = []

  const allReposAPI = `${API}/users/${username}/repos?sort=updated&direction=desc`;
  const specficReposAPI = `${API}/repos/${username}`;
  const dummyProjectsArr = new Array(length + specfic.length).fill(
    dummyProject
  );

  const [projectsArray, setProjectsArray] = useState([]);

  const fetchRepos = useCallback(async () => {
    let repoList = [];
    try {
      // getting all repos
      const response = await axios.get(allReposAPI);
      // slicing to the length
      repoList = [...response.data.slice(0, length)];
      // adding specified repos
      try {
        for (let repoName of specfic) {
          const response = await axios.get(`${specficReposAPI}/${repoName}`);
          repoList.push(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
      // setting projectArray
      // TODO: remove the duplication.
      setProjectsArray(repoList);
    } catch (error) {
      console.error(error.message);
    }
  }, [allReposAPI, length, specfic, specficReposAPI]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return (
    <div>

          {/* <Jumbotron fluid id="projects" className=""> */}
            <Container className="project-head">
              <h2 className="">{heading}</h2>
              <Row className="project-row">
                {projectsArray.length 
                  ? projectsArray.map((project, index) => (
                    <ProjectCard
                      key={`project-card-${index}`}
                      id={`project-card-${index}`}
                      value={project}
                    />
                  ))
                  : dummyProjectsArr.map((project, index) => (
                    <ProjectCard
                      key={`dummy-${index}`}
                      id={`dummy-${index}`}
                      value={project}
                    />
                  ))}
              </Row>
            </Container>
          {/* // </Jumbotron> */}
          
    </div>
  );
};

export default Projects;