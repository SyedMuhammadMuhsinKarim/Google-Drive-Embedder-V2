import React, { Component } from "react";
import "./styles.css";
import Video from "./Components/Video";
import image from "./Components/Form/719.gif";
import { withServer } from "./Api/context";
import dotenv from "dotenv";
dotenv.config();

class Drive extends Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

  componentDidMount() {
    const path = this.props.match.params.id;
    this.setState({ id: path });
    this.fetchingData();
  }

  fetchingData() {
    const { id } = this.state;
    this.props.server
      .getLinkWithId(id)
      .then(response =>
        this.setState({ my_res: response.data, loading: false })
      )
      .catch(error => this.setState({ error, loading: false }));
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
          <h3>404 Page Error: Lagta hai aap bhatak gaye ho rasta.</h3>
        )}
      </>
    );
  }
}

export default withServer(Drive);
