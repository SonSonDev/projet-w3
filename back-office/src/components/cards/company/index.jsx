import React from "react";
import { DELETE_COMPANY } from "../../../graphql/queries";
import { useMutation } from "@apollo/react-hooks";

const Card = ({ name, email, role, id }) => {
  const [deleteCompany] = useMutation(DELETE_COMPANY, {
    variables: { id },
    onCompleted: data => console.log(data)
  });

  return (
    <div style={{ padding: "1em" }}>
      <div>Name: {name}</div>
      <div>Email : {email}</div>
      <div>Role : {role}</div>
      <div onClick={() => deleteCompany()}>Supprimer</div>
    </div>
  );
};

export default Card;
