import React from "react";
import { Button } from "semantic-ui-react";

class LogoutButton extends React.Component {
  render() {
    return (
      <Button color="blue" fluid size="large" onClick={this.props.onClick}>
        Logout
      </Button>
    );
  }
}

export default LogoutButton;
