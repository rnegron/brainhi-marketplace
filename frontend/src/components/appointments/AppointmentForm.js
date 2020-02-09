import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import React from "react";
import { withRouter } from "react-router-dom";

import { convertToTimeZone } from "date-fns-timezone/dist/convertToTimeZone";

import api from "../../services/api";

import {
  Button,
  Divider,
  Dropdown,
  Form,
  Grid,
  Message
} from "semantic-ui-react";

const HOUR_OPTIONS = [
  {
    key: "6am",
    text: "6 AM",
    value: "06:00"
  },
  {
    key: "7am",
    text: "7 AM",
    value: "07:00"
  },
  {
    key: "8am",
    text: "8 AM",
    value: "08:00"
  },
  {
    key: "9am",
    text: "9 AM",
    value: "09:00"
  },
  {
    key: "10am",
    text: "10 AM",
    value: "10:00"
  },
  {
    key: "11am",
    text: "11 AM",
    value: "11:00"
  },
  {
    key: "1 pm",
    text: "1 PM",
    value: "13:00"
  },
  {
    key: "2 pm",
    text: "2 PM",
    value: "14:00"
  },
  {
    key: "3 pm",
    text: "3  PM",
    value: "15:00"
  },
  {
    key: "4 pm",
    text: "4 PM",
    value: "16:00"
  },
  {
    key: "5 pm",
    text: "5 PM",
    value: "17:00"
  },
  {
    key: "6 pm",
    text: "6 PM",
    value: "18:00"
  }
];

const GENDER_OPTIONS = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
  { key: "p", text: "Prefer not to say", value: "n/a" }
];

class AppointmentForm extends React.Component {
  state = {
    providerId: "",
    providerName: "PROVIDER NAME HERE",

    fieldFirstName: "",
    fieldLastName: "",
    fieldGender: "",
    fieldPhone: "",
    fieldInsurance: "",
    fieldDateOfBirth: "",
    fieldAppointmentReason: "",
    fieldAppointmentDate: "",
    fieldAppointmentTime: "",

    formSuccess: null,
    resultLoading: false,
    errors: {
      fieldFirstName: null,
      fieldLastName: null,
      fieldGender: null,
      fieldPhone: null,
      fieldInsurance: null,
      fieldDateOfBirth: null,
      fieldAppointmentReason: null,
      fieldAppointmentDate: null,
      fieldAppointmentTime: null
    }
  };

  handleSubmit = async e => {
    e.preventDefault();

    let providerId = this.props.match.params.id;

    let {
      fieldFirstName,
      fieldLastName,
      fieldPhone,
      fieldGender,
      fieldInsurance,
      fieldDateOfBirth,
      fieldAppointmentReason,
      fieldAppointmentDate,
      fieldAppointmentTime
    } = this.state;

    // POST form result
    this.setState({ resultLoading: true });
    try {
      // TODO:Merge fieldAppointmentDate and fieldAppointmentTime
      // TODO: Remove time from patientDateOfBirth

      console.log({ fieldAppointmentDate, fieldAppointmentTime });
      let response = await api.post(`/providers/${providerId}/appointment/`, {
        start_time: null,
        appointment_reason: fieldAppointmentReason,
        patient_name: `${fieldFirstName} ${fieldLastName}`,
        patient_insurance: fieldInsurance,
        patient_gender: fieldGender,
        patient_date_of_birth: fieldDateOfBirth,
        patient_phone_number: fieldPhone
      });

      this.setState({ resultLoading: false });

      if (response.status === 201) {
        this.setState({ formSuccess: true });
      } else {
        // TODO: Handle errors
        this.setState({ formSuccess: false });
      }

      console.log({ appointmentResponse: response });
    } catch (error) {
      console.error(error);
      // TODO: Handle errors
      this.setState({ resultLoading: false });
    }
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    const {
      fieldFirstName,
      fieldLastName,
      fieldPhone,
      fieldInsurance,
      fieldDateOfBirth,
      fieldAppointmentReason,
      fieldAppointmentDate,
      fieldAppointmentTime,

      formSuccess,
      resultLoading,
      errors
    } = this.state;

    return (
      <Grid centered columns={2} verticalAlign="middle">
        <Grid.Column style={{ margin: "4em 0em" }}>
          <Form size="large" success={formSuccess} onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                id="form-input-control-first-name"
                fluid
                label="First Name"
                placeholder="First name"
                required
                name="fieldFirstName"
                onChange={this.handleChange}
                value={fieldFirstName}
                error={errors.firstNameError}
              />

              <Form.Input
                id="form-input-control-last-name"
                fluid
                label="Last name"
                placeholder="Last name"
                required
                name="fieldLastName"
                onChange={this.handleChange}
                value={fieldLastName}
                error={errors.lastNameError}
              />

              <Form.Select
                id="form-input-control-gender"
                fluid
                label="Gender"
                options={GENDER_OPTIONS}
                defaultValue="n/a"
                name="fieldGender"
                onChange={this.handleChange}
                required
                error={errors.genderError}
              />
            </Form.Group>

            <Form.Group>
              <Form.Input
                label="Phone Number"
                id="form-input-control-phone"
                required
                placeholder="7877877878"
                name="fieldPhone"
                onChange={this.handleChange}
                value={fieldPhone}
                error={errors.fieldPhone}
              ></Form.Input>

              <Form.Field required>
                <label>Date of Birth</label>
                <SemanticDatepicker
                  datePickerOnly={true}
                  placeholder="Date of birth"
                  onChange={(_, data) =>
                    this.setState({
                      fieldDateOfBirth: convertToTimeZone(data.value, {
                        timeZone: "Etc/UTC"
                      })
                    })
                  }
                  type="basic"
                  format="MMMM, Qo YYYY"
                />
              </Form.Field>
            </Form.Group>

            <Divider />

            <Form.Input
              fluid
              id="form-input-control-insurance"
              label="Insurance"
              placeholder="Your Insurance Company"
              required
              name="fieldInsurance"
              onChange={this.handleChange}
              value={fieldInsurance}
              error={errors.fieldInsurance}
            />

            <Form.TextArea
              label="Appointment Reason"
              placeholder="Tell us about the reason for your appointment..."
              required
              name="fieldAppointmentReason"
              onChange={this.handleChange}
              value={fieldAppointmentReason}
            />

            <Form.Group widths={"equal"}>
              <Form.Field required>
                <label>Appointment Date</label>
                <SemanticDatepicker
                  datePickerOnly={true}
                  placeholder="Appointment Date"
                  type="basic"
                  format="MMMM, Qo YYYY"
                  onChange={(_, data) =>
                    this.setState({
                      fieldAppointmentDate: convertToTimeZone(data.value, {
                        timeZone: "Etc/UTC"
                      })
                    })
                  }
                />
              </Form.Field>
              <Form.Field required>
                <label>Appointment Hour</label>
                <Dropdown placeholder="Hour" selection options={HOUR_OPTIONS} />
              </Form.Field>
            </Form.Group>
            <Message
              success
              header="Form Completed"
              content="Your appointment is confirmed!"
            />

            <Grid style={{ marginTop: "0.5em" }}>
              <Grid.Column textAlign="center">
                <Button
                  loading={resultLoading}
                  primary
                  large="true"
                  content={"Request Appointment"}
                />
              </Grid.Column>
            </Grid>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(AppointmentForm);
