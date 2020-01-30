import React from "react";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";

const ClientUpdate = () => {
  console.log("ClientUpdate")
  return <h1>SOON</h1>;
};

export default withAuthenticationCheck(ClientUpdate, ["SUPER_ADMIN"]);
