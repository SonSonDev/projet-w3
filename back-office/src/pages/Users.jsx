import React, { useState } from "react";
import { GET_USERS } from "../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import Card from "../components/cards/user";
import UserForm from "../components/forms/user";

const Users = () => {
  const [users, setUsers] = useState(null);

  const { error, loading } = useQuery(GET_USERS, {
    onCompleted: ({ getUsers }) => setUsers(getUsers)
  });

  const renderCards = users =>
    users.map(({ id, name, email, role }) => (
      <Card key={id} name={name} email={email} role={role} id={id} />
    ));

  if (error) return <div>{error.message}</div>;

  return (
    <section style={{ minHeight: "100vh", border: "5px solid pink" }}>
      {loading && <div>Loading...</div>}
      {!loading && users && renderCards(users)}
      <UserForm onSubmit={values => console.log(values)} />
    </section>
  );
};

export default Users;
