import React from "react";
import { Link } from "react-router-dom";
import { Menu, Container, Image } from "semantic-ui-react";

import logo from "../../images/logo.png";

class MarketplaceHeader extends React.Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted>
        <Container>
          <Menu.Item
            name="home"
            onClick={this.handleItemClick}
            as={Link}
            to="/"
            header
          >
            <Image size="tiny" src={logo} style={{ marginRight: "1.5em" }} />
            Marketplace
          </Menu.Item>
          <Menu.Item
            name="home"
            onClick={this.handleItemClick}
            as={Link}
            to="/"
            header
          >
            Home
          </Menu.Item>
        </Container>
        <Menu.Menu position="right">
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={this.handleItemClick}
            as={Link}
            to="/register"
          >
            Register
          </Menu.Item>
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={this.handleItemClick}
            as={Link}
            to="/login"
          >
            Login
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default MarketplaceHeader;
