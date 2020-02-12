import React from "react";
import { withRouter, Link } from "react-router-dom";

// import truncate from "lodash/truncate";

import { Card, Icon, Image, Button, Divider } from "semantic-ui-react";

class ProviderCard extends React.Component {
  render() {
    const { id, picture, name, specialty, address, phone } = this.props;

    return (
      <Card data-test-id="provider-card">
        <Image src={picture} wrapped ui={false} />

        <Card.Content>
          <Card.Header>{name}</Card.Header>

          <Divider />

          <Card.Meta>
            <span className="specialty">
              <Icon name="doctor" style={{ marginRight: "0.5em" }} />
              {specialty}
            </span>
          </Card.Meta>

          <Divider />

          <Card.Meta>
            <span className="phone">
              <Icon name="phone" style={{ marginRight: "0.5em" }} />
              {phone}
            </span>
          </Card.Meta>

          <Divider />
          <Card.Meta>
            <span className="address">
              <Icon name="home" style={{ marginRight: "0.5em" }} />
              {address}
            </span>
          </Card.Meta>

          {/* <Card.Description>{address}</Card.Description> */}
        </Card.Content>

        <Card.Content extra textAlign={"center"}>
          <Button
            data-test-id="provider-detail-button"
            as={Link}
            to={`/providers/${id}`}
            primary
            content="Details"
          ></Button>
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(ProviderCard);
