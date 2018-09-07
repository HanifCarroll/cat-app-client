import React, { Component } from "react";

import Cat from "./Cat";
import Header from "./Header";
import { Link } from "react-router-dom";

class Cats extends Component {
  componentDidMount() {
    this.props.fetchCats();
  }

  showCats = () => {
    if (this.props.cats.length === 0)
      return (
        <h3>
          There are no cats! <Link to="/cats/new">Make one?</Link>
        </h3>
      );
    return this.props.cats.map(cat => (
      <Cat
        name={cat.name}
        description={cat.description}
        pictureURL={cat.pictureURL}
        rating={cat.averageRating}
        id={cat.id}
        key={cat.id}
      />
    ));
  };

  renderPage = () => {
    if (this.props.loading) return <h1>Loading...</h1>;
    return this.showCats();
  };

  render() {
    return (
      <div>
        <Header />
        {this.renderPage()}
      </div>
    );
  }
}

export default Cats;
