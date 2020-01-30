import React from "react";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";

const ClientInfo = () => {
  console.log("ClientInfo");

  return <h1>SOON</h1>;
};

export default withAuthenticationCheck(ClientInfo, ["SUPER_ADMIN"]);
