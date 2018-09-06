import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import Axios from "axios";

import Cats from "./Cats";
import NewCat from "./NewCat";
import ShowCat from "./ShowCat";
import NoMatch from "./NoMatch";
import Home from "./Home";

class App extends Component {
  state = {
    cats: [],
    loading: true
  };

  componentDidMount() {
    this.fetchCats();
  }

  fetchCats = () => {
    this.setState({ loading: true });
    Axios.get("/api/cats")
      .then(data => this.setState({ cats: data.data, loading: false }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={Home} />
          <Route
            exact
            path="/cats"
            render={() => (
              <Cats
                cats={this.state.cats}
                loading={this.state.loading}
                fetchCats={this.fetchCats}
              />
            )}
          />
          <Route exact path="/cats/new" component={NewCat} />
          <Route exact path="/cats/:id" component={ShowCat} />
          <Route exact path="/cats/:id/edit" component={ShowCat} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
