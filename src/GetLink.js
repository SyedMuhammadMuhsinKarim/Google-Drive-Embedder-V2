import React, { Component } from "react";
import Form from "./Components/Form";
import "./styles.css";
import Swal from "sweetalert2";
import { withServer } from "./Api/context";

const INITIAL_STATE = {
  link: "",
  api: "",
  post: undefined,
  result: undefined,
  loading: false
};

class SubmitData extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    this.setState({
      loading: true,
      host: undefined,
      post: {
        link: this.state.link,
        apiKey: this.state.api
      }
    });

    this.sendInfo();
    event.preventDefault();
  };

  sendInfo() {
    this.props.server
      .postLink(this.state.post)
      .then((res) => {
        this.setState({ host: res.data._id });
      })
      .then(() => this.setState({ loading: false }))
      .catch((error) => {
        Swal.fire("Something Wrong", error.response.data, "error");
        this.setState({ loading: false });
      });
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { link, loading, host, api } = this.state;
    const isInvalid = !link || !api;
    return (
      <>
        <Form
          link={link}
          api={api}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          disabled={isInvalid}
          loading={loading}
          host={host}
        />
      </>
    );
  }
}

export default withServer(SubmitData);
