import React, { useState } from "react";
import { GET_USERS } from "../../graphql/queries/clients";
import { useQuery } from "@apollo/react-hooks";
import Card from "../../components/card/client";
import { Card as Cards, Dimmer } from "tabler-react";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";
import { Button } from "tabler-react";
import { Link } from "react-router-dom";

const ClientsIndex = () => {
  console.log("ClientsIndex");
  const [clients, setClients] = useState(null);

  const { error, loading } = useQuery(GET_USERS, {
    variables: { role: "ADMIN" },
    fetchPolicy: "no-cache",
    onCompleted: ({ getUsers }) => setClients(getUsers),
    onError: error => console.log(error.message)
  });

  const renderCards = clients =>
    clients.map(({ id, name, email, role }) => (
      <Card key={id} name={name} email={email} role={role} id={id} />
    ));

  if (error) return <div>{error.message}</div>;

  if (loading) {
    return (
      <Cards title="Loading" isClosable isCollapsible>
        <Cards.Body>
          <Dimmer active loader />
        </Cards.Body>
      </Cards>
    );
  }

  return (
    <section style={{ minHeight: "100%" }}>
      <Button
        RootComponent={Link}
        to={`/client/create`}
        color="green"
        size="sm"
      >
        Add
      </Button>
      {!loading && clients && renderCards(clients)}
    </section>
  );
};

export default withAuthenticationCheck(ClientsIndex, ["SUPER_ADMIN"]);
