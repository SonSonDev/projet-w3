import React from "react";
import { DELETE_USER } from "../../../graphql/queries";
import { useMutation } from "@apollo/react-hooks";

const Card = ({ name, email, role, id }) => {
  const [deleteUser] = useMutation(DELETE_USER, {
    variables: { id },
    onCompleted: data => {
      // TEMP
      window.location.reload();
      console.log(data);
    }
  });

  return (
    <div style={{ padding: "1em" }}>
      <div>Name: {name}</div>
      <div>Email : {email}</div>
      <div>Role : {role}</div>
      <div onClick={() => deleteUser()}>Supprimer</div>
    </div>
  );
};

export default Card;
