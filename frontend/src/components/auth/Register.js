import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Header,
  Segment
} from "semantic-ui-react";

class Register extends React.Component {
  state = { email: "", password: "", confirmPassword: "" };

  render() {
    const { email, password, confirmPassword } = this.state;

    return (
      <Grid centered columns={2} verticalAlign="middle">
        <Grid.Column style={{ marginTop: "5em" }}>
          <Header as="h2" style={{ color: "#47da93" }} textAlign="center">
            <div className="content">Register for a Marketplace account</div>
          </Header>
          <Segment>
            <Form size="large">
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Email address"
                value={email}
                required
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                required
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                required
              />
              <Form.Field>
                <Checkbox label="I agree to the Terms and Conditions" />
              </Form.Field>
              <Button
                color="blue"
                fluid
                size="large"
                disabled={
                  !this.state.email ||
                  !this.state.password ||
                  !this.state.confirmPassword
                }
              >
                Login
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
