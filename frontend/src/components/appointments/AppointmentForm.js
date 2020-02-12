import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import React from "react";
import { withRouter } from "react-router-dom";

import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import isBefore from "date-fns/isBefore";
import addHours from "date-fns/addHours";
import getHours from "date-fns/getHours";
import startOfDay from "date-fns/startOfDay";
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
    key: "12pm",
    text: "12 PM",
    value: "12:00" 
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

const INSURANCE_CHOICES = [
  { key: "mapfre", text: "Mapfre", value: "Mapfre" },
  { key: "humana", text: "Humana", value: "Humana" },
  { key: "first-medical", text: "First Medical", value: "First Medical" },
  { key: "mmm", text: "MMM", value: "MMM" },
  { key: "triple-s", text: "Triple-S", value: "Triple-S" }
];

const GENDER_OPTIONS = [
  { key: "m", text: "Male", value: "MALE" },
  { key: "f", text: "Female", value: "FEMALE" },
  { key: "o", text: "Other", value: "OTHER" },
  { key: "p", text: "Prefer not to say", value: "PREFER NOT TO SAY" }
];

const TODAY = new Date();

const INITIAL_STATE_FOR_FIELDS = {
  fieldFirstName: "",
  fieldLastName: "",
  fieldGender: "",
  fieldPhone: "",
  fieldAppointmentReason: ""
};

class AppointmentForm extends React.Component {
  state = {
    ...INITIAL_STATE_FOR_FIELDS,

    formSuccess: null,
    formError: false,
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

  filterAppointmentDate = date => !isBefore(date, TODAY);
  filterDateOfBirth = date => isBefore(date, TODAY);

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
      // Create an ISO representation of the appointment time
      let formattedFieldAppointmentTime = parseISO(
        `2020-01-01T${fieldAppointmentTime}:00`
      );

      // Obtain an integer hour count for the appointment time
      let hoursForAppointment = getHours(formattedFieldAppointmentTime);

      // Add the integer hours to the chosen appointment date
      let startTimeForAppointment = addHours(
        startOfDay(fieldAppointmentDate),
        hoursForAppointment
      );

      let response = await api.post(`/providers/${providerId}/appointment/`, {
        start_time: startTimeForAppointment,
        appointment_reason: fieldAppointmentReason,
        patient_name: `${fieldFirstName} ${fieldLastName}`,
        patient_insurance: fieldInsurance,
        patient_gender: fieldGender,
        patient_date_of_birth: format(fieldDateOfBirth, "yyyy-MM-dd"),
        patient_phone_number: fieldPhone
      });

      this.setState({
        formError: false,
        formSuccess: false,
        resultLoading: false
      });

      if (response.status === 201) {
        // Clear out form and mark as success
        this.setState({
          formSuccess: true,
          ...INITIAL_STATE_FOR_FIELDS
        });
      } else {
        let errors = response.data.errors;
        this.setState({
          formSuccess: false,
          formError: true,
          errors: {
            fieldFirstName: errors.patient_name,
            fieldLastName: errors.patient_name,
            fieldPhone: errors.patient_phone_number,
            fieldGender: errors.patient_gender,
            fieldInsurance: errors.patient_insurance,
            fieldDateOfBirth: errors.patient_date_of_birth,
            fieldAppointmentReason: errors.appointment_reason,
            fieldAppointmentDate: errors.start_time,
            fieldAppointmentTime: errors.start_time
          }
        });
      }
    } catch (error) {
      this.setState({ formError: true, resultLoading: false });
    }
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    const {
      fieldFirstName,
      fieldLastName,
      fieldPhone,
      fieldAppointmentReason,
      fieldAppointmentDate,

      formSuccess,
      formError,
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
                error={errors.fieldFirstName}
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
                error={errors.fieldLastName}
              />

              <Form.Select
                id="form-input-control-gender"
                fluid
                label="Gender"
                options={GENDER_OPTIONS}
                name="fieldGender"
                onChange={this.handleChange}
                required
                error={errors.fieldGender}
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
                  required={true}
                  filterDate={this.filterDateOfBirth}
                  placeholder="Date of birth"
                  name="fieldDateOfBirth"
                  error={errors.fieldDateOfBirth}
                  onChange={(_, data) =>
                    this.setState({
                      fieldDateOfBirth: convertToTimeZone(data.value, {
                        timeZone: "Etc/UTC"
                      })
                    })
                  }
                  type="basic"
                  format="MMMM, Do YYYY"
                />
              </Form.Field>
            </Form.Group>

            <Divider />

            <Form.Select
              fluid
              id="form-input-control-insurance"
              label="Insurance"
              placeholder="Your Insurance Company"
              required={true}
              options={INSURANCE_CHOICES}
              name="fieldInsurance"
              onChange={this.handleChange}
              error={errors.fieldInsurance}
            />

            <Form.TextArea
              label="Appointment Reason"
              placeholder="Tell us about the reason for your appointment..."
              required
              name="fieldAppointmentReason"
              onChange={this.handleChange}
              error={errors.fieldAppointmentReason}
              value={fieldAppointmentReason}
            />

            <Form.Group widths={"equal"}>
              <Form.Field required>
                <label>Appointment Date</label>
                <SemanticDatepicker
                  datePickerOnly={true}
                  required={true}
                  filterDate={this.filterAppointmentDate}
                  placeholder="Appointment Date"
                  type="basic"
                  error={errors.fieldAppointmentDate}
                  format="MMMM, Do YYYY"
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
                <Dropdown
                  selection
                  required
                  name="fieldAppointmentTime"
                  onChange={this.handleChange}
                  placeholder="Hour"
                  error={this.fieldAppointmentTime}
                  options={HOUR_OPTIONS}
                />
              </Form.Field>
            </Form.Group>
            <Message
              success
              header="Form Completed"
              content="Your appointment is confirmed!"
            />

            <Message
              error
              header="An error occured!"
              content="Please double-check the provided values."
              visible={formError}
            />

            <Grid style={{ marginTop: "0.5em" }}>
              <Grid.Column textAlign="center">
                <Button
                  loading={resultLoading}
                  disabled={resultLoading}
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
