import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import {
  Header,
  Image,
  Container,
  Button,
  Segment,
  Grid
} from "semantic-ui-react";

// import ProviderAppointment from "./ProviderAppointment";

import api from "../../services/api";

const INITIAL_STATE = {
  id: null,
  name: null,
  bio: null,
  specialty: null,
  picture: null
};

class ProviderDetails extends React.Component {
  state = INITIAL_STATE;

  componentDidMount = async () => {
    const id = this.props.match.params.id;

    console.log("props:", this.props);
    console.log({ id });
    try {
      this.setState({ loading: true });

      let response = await api.get(`providers/${id}`);
      console.log({ response });

      let result = response.data.results;
      this.setState({
        ...result,
        id,
        loading: false
      });
    } catch (err) {
      console.error(err);
      this.setState({ ...INITIAL_STATE, loading: false });
    }
  };

  render() {
    const { name, picture, specialty, bio } = this.state;

    return (
      <Container text textAlign={"center"} style={{ marginTop: "5em" }}>
        <Segment
          style={{ minHeight: 500, padding: "1em 0em" }}
          vertical
          loading={this.state.loading}
        >
          <Grid container stackable verticalAlign="middle">
            <Grid.Row centered>
              <Grid.Column floated="left" width={6}>
                <Image bordered rounded size="large" src={picture} />
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as="h1">{name}</Header>
                <Header as="h3">{specialty}</Header>
                <p style={{ fontSize: "1.30em", marginTop: "1em" }}>{bio}</p>
                <Button
                  as={Link}
                  to={`/providers/${this.state.id}/appointment`}
                  size="huge"
                >
                  Book an appointment
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default withRouter(ProviderDetails);
