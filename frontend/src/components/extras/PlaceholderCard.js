import React from "react";
import { Card, Button, Placeholder } from "semantic-ui-react";

class PlaceholderCard extends React.Component {
  render() {
    return (
      <Card>
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
        <Card.Content>
          <Card.Meta>
            <Placeholder>
              <Placeholder.Line length="very short" />{" "}
            </Placeholder>
          </Card.Meta>
          <Card.Description>
            <Placeholder>
              <Placeholder.Paragraph>
                <Placeholder.Line length="short" />
                <Placeholder.Line length="medium" />
              </Placeholder.Paragraph>
            </Placeholder>
          </Card.Description>
        </Card.Content>
        <Card.Content textAlign={"center"} extra>
          <Button disabled primary content={"Details"}/>
        </Card.Content>
      </Card>
    );
  }
}

export default PlaceholderCard;
