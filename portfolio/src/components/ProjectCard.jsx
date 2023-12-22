import React, { useState, useEffect, useCallback } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

const ProjectCard = ({ value }) => {
  const {
    name,
    description,
    svn_url,
    stargazers_count,
    languages_url,
    pushed_at,
  } = value;
  return (
      <Card className="project-card">
        <Card.Body>
          <Card.Title as="h5">{name || <Skeleton />} </Card.Title>
          {/* <Card.Text>{(!description) ? "" : description || <Skeleton count={3} />} </Card.Text> */}
          {svn_url ? <CardButtons svn_url={svn_url} /> : <Skeleton count={2} />}
          <hr />
          {languages_url ? (
            <Language languages_url={languages_url} repo_url={svn_url} />
          ) : (
            <Skeleton count={3} />
          )}
          {value ? (
            <CardFooter star_count={stargazers_count} repo_url={svn_url} pushed_at={pushed_at} />
          ) : (
            <Skeleton />
          )}
        </Card.Body>
      </Card>
  );
};

const CardButtons = ({ svn_url }) => {
  return (
    <div className="project-card-cta">
      <a
        href={`${svn_url}/archive/master.zip`}
        className="project-card-cta"
      >
        <i className="project-card-cta" /> Clone Project
      </a>
      <a href={svn_url} target=" _blank" className="project-card-cta">
        <i className="project-card-cta" /> Repo
      </a>
    </div>
  );
};

const Language = ({ languages_url, repo_url }) => {
  const [data, setData] = useState([]);

  const handleRequest = useCallback(async () => {
    try {
      const response = await axios.get(languages_url);
      return setData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }, [languages_url]);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  const array = [];
  let total_count = 0;
  for (let index in data) {
    array.push(index);
    total_count += data[index];
  }

  return (
    <div className="">
      Languages:{" "}
      {array.length
        ? array.map((language) => (
          // <a
          //   key={language}
          //   className="card-link"
          //   href={repo_url + `/search?l=${language}`}
          //   target=" _blank"
          //   rel="noopener noreferrer"
          // >
            <span className="">
              {language}:{" "}
              {Math.trunc((data[language] / total_count) * 1000) / 10} %
            </span>
          // </a>

        ))
        : "--"}
    </div>
  );
};

const CardFooter = ({ star_count, repo_url, pushed_at }) => {
  const [updated_at, setUpdated_at] = useState("0 mints");

  const handleUpdatetime = useCallback(() => {
    const date = new Date(pushed_at);
    const nowdate = new Date();
    const diff = nowdate.getTime() - date.getTime();
    const hours = Math.trunc(diff / 1000 / 60 / 60);

    if (hours < 24) {
      if (hours < 1) return setUpdated_at("just now");
      let measurement = hours === 1 ? "hour" : "hours";
      return setUpdated_at(`${hours.toString()} ${measurement} ago`);
    } else {
      const options = { day: "numeric", month: "long", year: "numeric" };
      const time = new Intl.DateTimeFormat("en-US", options).format(date);
      return setUpdated_at(`on ${time}`);
    }
  }, [pushed_at]);

  useEffect(() => {
    handleUpdatetime();
  }, [handleUpdatetime]);

  return (
    <p className="">
      <small className="">Updated {updated_at}</small>
    </p>
  );
};

export default ProjectCard;