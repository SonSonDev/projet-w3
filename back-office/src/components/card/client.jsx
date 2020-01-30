import React from "react";
import { DELETE_USER } from "../../graphql/mutations/clients";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

const Card = ({ name, email, id }) => {
  const [deleteUser] = useMutation(DELETE_USER, {
    variables: { id },
    onCompleted: data => {
      window.location.reload();
      console.log(data);
    }
  });

  return (
    <tr>
      <td>{name}</td>
      <td>placeholder type</td>
      <td>placeholder adresse</td>
      <td>ph count user</td>
      <td>ph representative</td>
      <td>
        <div class="buttons">
          <a class="button" onClick={() => deleteUser()}>
            Supprimer
          </a>
        </div>
      </td>
      <td>
        <div class="buttons">
          <a to={`/client/${id}/update`} class="button">
            Update
          </a>
        </div>
      </td>
      <td>
        <div class="buttons">
          <a to={`/client/${id}`} class="button">
            Info
          </a>
        </div>
      </td>
    </tr>
  );
};

export default Card;
