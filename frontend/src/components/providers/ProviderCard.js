import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { Card, Image, Button } from "semantic-ui-react";

class ProviderCard extends React.Component {
  render() {
    const { id, picture, name, specialty, bio } = this.props;

    return (
      <Card>
        <Image src={picture} />

        <Card.Content>
          <Card.Header>{name}</Card.Header>

          <Card.Meta>
            <span className="specialty">{specialty}</span>
          </Card.Meta>

          <Card.Description>{bio}</Card.Description>
        </Card.Content>

        <Card.Content extra textAlign={"center"}>
          <Button as={Link} to={`/providers/${id}`} primary content="Details"></Button>
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(ProviderCard);
