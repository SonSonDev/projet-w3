import React from "react";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";

const EmployeeInfo = () => {
  console.log("EmployeeInfo");

  return <h1>SOON</h1>;
};

export default withAuthenticationCheck(EmployeeInfo, ["ADMIN", "USER"]);
