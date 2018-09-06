import React from "react";

const Cat = ({ name, description, id, pictureURL }) => (
  <div className="cat">
    <a href={`/cats/${id}`}>
      <img className="cat-list-img" src={pictureURL} alt={name} />
      {name} - {description}
    </a>
  </div>
);

export default Cat;
