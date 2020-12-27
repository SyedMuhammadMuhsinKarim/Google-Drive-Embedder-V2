import React, { Component } from "react";
import "./styles.css";
import Video from "./Components/Video";
import image from "./Components/Form/719.gif";
import { withServer } from "./Api/context";
import dotenv from "dotenv";
import { withRouter } from "react-router-dom";
import NotFound from "./Components/NotFoundPage";
dotenv.config();

const INITIAL_STATE = {
  loading: true,
  error: undefined,
  id: undefined,
  my_res: undefined
};

class Drive extends Component {
  constructor() {
    super();
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.fetchingData();
  }

  fetchingData() {
    this.props.server
      .getLinkWithId(this.props.match.params.id)
      .then((response) =>
        this.setState({ my_res: response.data, loading: false })
      )
      .catch((error) => this.setState({ error, loading: false }));
  }

  render() {
    const { my_res, error } = this.state;
    // console.log(my_res);
    return (
      <>
        {this.state.loading === true ? (
          <img
            className="mid"
            width="64px"
            height="64px"
            alt="Loading"
            src={image}
          />
        ) : my_res ? (
          <Video video={my_res} />
        ) : (
          <NotFound />
        )}
      </>
    );
  }
}

export default withRouter(withServer(Drive));
