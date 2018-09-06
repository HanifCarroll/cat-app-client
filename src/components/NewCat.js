import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import Header from "./Header";
import PictureInput from "./PictureInput";

class NewCat extends Component {
  state = {
    name: "",
    description: "",
    picture: null
  };

  onSubmit = async () => {
    const picURL = await this.getPicURL();
    await this.sendForm(picURL);
    this.props.history.push("/cats");
  };

  getPicURL = async () => {
    const form = new FormData();
    form.append("file", this.state.picture);
    const { data } = await axios.post("/storage/uploadFile", form, {
      headers: {
        "content-type": `multipart/form-data; boundary=${form._boundary}`
      }
    });

    return data;
  };

  sendForm = async picURL => {
    await axios.post(
      "/api/cats",
      qs.stringify({
        name: this.state.name,
        description: this.state.description,
        pictureURL: picURL
      })
    );
  };

  render() {
    return (
      <div>
        <Header />
        <h1>New Cat</h1>

        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            onChange={e =>
              this.setState({
                name: e.target.value
              })
            }
            value={this.state.name}
          />
          <br />
          <label htmlFor="Description">Description: </label>
          <input
            type="text"
            name="description"
            onChange={e => this.setState({ description: e.target.value })}
            value={this.state.description}
          />
          <br />
          <br />
          <label htmlFor="picture">Picture: </label>
          <PictureInput self={this} maxSizeMb={1} />

          <br />
          <input type="submit" value="Create Cat!" onClick={this.onSubmit} />
        </div>
      </div>
    );
  }
}

export default NewCat;
