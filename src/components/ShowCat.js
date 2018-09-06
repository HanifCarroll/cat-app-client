import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import Header from "./Header";
import PictureInput from "./PictureInput";

class ShowCat extends Component {
  state = {
    cat: {},
    loading: true,
    id: this.props.match.params.id,
    edit: false,
    editedCat: { name: "", description: "" },
    changePicture: false,
    picture: null
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true });
    axios
      .get(`/api/cats/${this.props.match.params.id}`)
      .then(data =>
        this.setState({ cat: data.data, editedCat: data.data, loading: false })
      );
  };

  onDelete = () => {
    if (window.confirm("Are you sure you want to delete this cat?")) {
      axios
        .delete(`/api/cats/${this.state.id}`)
        .then(() => this.props.history.push("/cats"));
    }
  };

  onEdit = () => {
    return (
      <div>
        <input
          type="text"
          value={this.state.editedCat.name}
          onChange={e =>
            this.setState({
              editedCat: { ...this.state.editedCat, name: e.target.value }
            })
          }
        />
        <br />
        <input
          type="text"
          value={this.state.editedCat.description}
          onChange={e =>
            this.setState({
              editedCat: {
                ...this.state.editedCat,
                description: e.target.value
              }
            })
          }
        />
        <br />
        <button onClick={this.onEditCancel}>Cancel</button>
        <br />
        <button onClick={this.onEditSubmit}>Save</button>
      </div>
    );
  };

  onEditCancel = () => {
    this.setState({ edit: false, editedCat: { ...this.state.cat } });
  };

  onEditSubmit = async () => {
    await axios
      .patch(
        `/api/cats/${this.state.id}`,
        qs.stringify({ ...this.state.editedCat })
      )
      .catch(e => console.log(e));

    await this.fetchData();

    this.setState({ edit: false });
  };

  changePictureInput = () => {
    if (!this.state.changePicture) return null;

    return (
      <div>
        <PictureInput self={this} maxSizeMb={1} />
        <button
          onClick={() => this.setState({ changePicture: false, picture: null })}
        >
          Cancel
        </button>
        <button onClick={this.onPictureSubmit}>Submit</button>
      </div>
    );
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

  submitForm = async picURL => {
    await axios
      .patch(
        `/api/cats/${this.state.id}`,
        qs.stringify({
          ...this.state.cat,
          pictureURL: picURL
        })
      )
      .catch(e => console.log(e));
  };

  onPictureSubmit = async () => {
    if (!this.state.picture) return alert("No ");
    const picURL = await this.getPicURL();
    await this.submitForm(picURL);
    await this.fetchData();
    this.setState({ changePicture: false });
  };

  showCat = () => {
    if (this.state.cat === null) {
      return <h1>Cat not Found</h1>;
    }

    return (
      <div>
        <h1>{this.state.cat.name}</h1>
        <br />
        <img
          className="cat-view-img"
          src={this.state.cat.pictureURL}
          alt={this.state.cat.name}
        />
        <br />
        <p>{this.state.cat.description}</p>
        <button onClick={() => this.setState({ edit: true })}>
          Edit Details
        </button>
        <br />
        <button
          onClick={() => {
            this.setState(prevState => ({
              changePicture: !prevState.changePicture
            }));
          }}
        >
          Change Picture
        </button>
        {this.changePictureInput()}
        <br />
        <button onClick={this.onDelete}>Delete</button>
      </div>
    );
  };

  renderPage = () => {
    if (this.state.loading) return <h1>Loading...</h1>;
    if (this.state.edit) return this.onEdit();
    return this.showCat();
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

export default ShowCat;
