import React from "react";
import { Card, Image, Segment, Placeholder } from "semantic-ui-react";

class PlaceholderCard extends React.Component {
  render() {
    return (
      <Card>
        <Placeholder>
          <Placeholder.Header image />
        </Placeholder>
        <Card.Content>
          <Card.Meta>
            <Placeholder></Placeholder>
          </Card.Meta>
          <Card.Description>
            <Placeholder>
              <Placeholder.Line length="medium"></Placeholder.Line>
            </Placeholder>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default PlaceholderCard;
