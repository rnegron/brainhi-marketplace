import React from "react";

import {
  Segment,
  // Header,
  Container,
  Grid,
  Flag,
  Icon
} from "semantic-ui-react";

class MarketplaceFooter extends React.Component {
  render() {
    return (
      <Segment
        inverted
        vertical
        style={{ margin: "2em 0em 0em", padding: "1em 0em" }}
      >
        <Container fluid>
          <Grid divided textAlign="center" inverted columns={3}>
            <Grid.Row>
              <Grid.Column></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {/* <Header inverted as="h4" content="About" /> */}
                <p>
                  Made with <Icon name="like" /> in <Flag name="pr" />
                </p>
                <p>
                  Source: <Icon name="github" />
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column></Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

export default MarketplaceFooter;
