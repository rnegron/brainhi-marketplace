import React from "react";

import { Card } from "semantic-ui-react";

class ProviderCard extends React.Component {
  render() {
    return (
      <Card
        image={this.props.picture}
        header={this.props.name}
        meta={this.props.specialty}
        description={this.props.bio}
      />
    );
  }
}

export default ProviderCard;
