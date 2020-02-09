import React from "react";
import { withRouter } from "react-router";

import { Card, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class ProviderCard extends React.Component {
  getButton = id => {
    return (
      <Button
        as={Link}
        to={`/providers/${id}`}
        primary
        content="Details"
      ></Button>
    );
  };

  render() {
    const { id } = this.props;

    return (
      <Card>
        <Image src={this.props.picture} />

        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>

          <Card.Meta>
            <span className="specialty">{this.props.specialty}</span>
          </Card.Meta>

          <Card.Description>{this.props.bio}</Card.Description>
        </Card.Content>

        <Card.Content extra textAlign={"center"}>
          {this.getButton(id)}
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(ProviderCard);
