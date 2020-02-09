import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import React from "react";

import { Grid, Segment, Form } from "semantic-ui-react";

class AppointmentForm extends React.Component {
  submitAppointment = e => console.log({ e });

  render() {
    return (
      <Grid centered columns={2} verticalAlign="middle">
        <Grid.Column style={{ margin: "4em 0em" }}>
          <Segment>
            <Form>
              <Form.Field>
                <label>First Name</label>
                <input placeholder="First Name" />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input placeholder="Last Name" />
              </Form.Field>
              <Form.Field>
                <SemanticDatepicker
                  locale="en-US"
                  onChange={e => console.log(e)}
                  type="range"
                />
              </Form.Field>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AppointmentForm;
