import React, { useState } from "react";
import { GET_USERS } from "../../graphql/queries/employees";
import { useQuery } from "@apollo/react-hooks";
import Card from "../../components/card/employee";
import { Card as Cards, Dimmer } from "tabler-react";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";
import { Button } from "tabler-react";
import { Link } from "react-router-dom";

const EmployeesIndex = () => {
  console.log("EmployeesIndex");
  const [users, setUsers] = useState(null);

  const { error, loading } = useQuery(GET_USERS, {
    variables: { role: "USER" },
    onCompleted: ({ getUsers }) => setUsers(getUsers),
    onError: error => console.log(error.message)
  });

  const renderCards = users =>
    users.map(({ id, name, email, role }) => (
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
        to={`/employee/create`}
        color="green"
        size="sm"
      >
        Add
      </Button>
      {!loading && users && renderCards(users)}
    </section>
  );
};

export default withAuthenticationCheck(EmployeesIndex, ["ADMIN", "USER"]);
