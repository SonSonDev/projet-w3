import React from "react";
import { DELETE_USER } from "../../graphql/mutations/clients";
import { useMutation } from "@apollo/react-hooks";
import { Card as Cards, Button, Header } from "tabler-react";
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
    <Cards>
      <Cards.Header>
        <Cards.Title>NAME : {name}</Cards.Title>
        <Cards.Options>
          <Button color="red" size="sm" onClick={() => deleteUser()}>
            Supprimer
          </Button>
          <Button
            RootComponent={Link}
            to={`/client/${id}/update`}
            color="blue"
            size="sm"
          >
            Update
          </Button>
          <Button
            RootComponent={Link}
            to={`/client/${id}`}
            color="green"
            size="sm"
          >
            Info
          </Button>
        </Cards.Options>
      </Cards.Header>
      <Cards.Body>
        <Header.H3>Email</Header.H3>
        {email}
      </Cards.Body>
      {/* <Cards.Footer>{role}</Cards.Footer> */}
    </Cards>
  );
};

export default Card;
