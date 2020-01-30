import React, { useState } from "react";
import { GET_USERS } from "../../graphql/queries/clients";
import { useQuery } from "@apollo/react-hooks";
import Card from "../../components/card/client";
import { Card as Cards, Dimmer } from "tabler-react";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";
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
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <Link to="/clients" class="navbar-item">
              All
            </Link>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <Link to={`/client/create`} class="button is-primary">
                  <strong>Add</strong>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* {!loading && clients && renderCards(clients)} */}
      <table>
        <thead>
          <tr>
            <th>Nom du commerçant</th>
            <th>Type de client</th>
            <th>Adresse</th>
            <th>Nbr user</th>
            <th>Représentant</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!loading && clients && renderCards(clients)}
        </tbody>
      </table>
    </section>
  );
};

export default withAuthenticationCheck(ClientsIndex, ["SUPER_ADMIN"]);
