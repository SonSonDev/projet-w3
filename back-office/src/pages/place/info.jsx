import React from "react";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";

const PlaceInfo = () => {
  console.log("PlaceInfo");

  return <h1>SOON</h1>;
};

export default withAuthenticationCheck(PlaceInfo, ["SUPER_ADMIN", "ADMIN", "USER"]);
