import React from "react";
import { Grid, Message, Form, Segment, Button } from "semantic-ui-react";

import { Link } from "react-router-dom";

class Login extends React.Component {
  state = { email: "", password: "" };

  render() {
    const { email, password } = this.state;

    return (
      <Grid centered columns={2} verticalAlign="middle">
        <Grid.Column style={{ marginTop: "4em" }}>
          <Segment>
            <Form size="large">
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Email address"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              <Button
                color="blue"
                fluid
                size="large"
                disabled={!email || !password}
              >
                Login
              </Button>
            </Form>
          </Segment>
          <Message>
            Don't have an account?{" "}
            <Link to="/register">Register for an account</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
