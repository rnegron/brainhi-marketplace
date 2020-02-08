import React from "react";

import { Card } from "semantic-ui-react";

class ProviderCardGroup extends React.Component {
  render() {
    return <Card.Group itemsPerRow={5}>{this.props.children}</Card.Group>;
  }
}

export default ProviderCardGroup;
