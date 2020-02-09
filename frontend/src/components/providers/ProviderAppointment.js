import React from "react";

import { AppointmentForm } from "../appointments";

class ProviderAppointment extends React.Component {
  render() {
    return <AppointmentForm {...this.props} />;
  }
}

export default ProviderAppointment;
