import React from "react";
import ReactStars from "react-stars";

const Cat = ({ name, description, id, pictureURL, rating }) => (
  <a href={`/cats/${id}`}>
    <div className="cat">
      <img className="cat-list-img" src={pictureURL} alt={name} />
      <span>{name}</span> {"  "} <span>{description}</span> {"  "}
      <ReactStars value={rating} edit={false} className="cat-list-rating" />
    </div>
  </a>
);

export default Cat;
