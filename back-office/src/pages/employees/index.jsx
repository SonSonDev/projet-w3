import React, { useState } from "react";
import { GET_USERS, CREATE_USER } from "../../graphql/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Card from "../../components/cards/user";
import UserForm from "../../components/forms/user";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";

const Employees = () => {
  const [users, setUsers] = useState(null);

  const [createUser] = useMutation(CREATE_USER);

  const { error, loading } = useQuery(GET_USERS, {
    onCompleted: ({ getUsers }) => setUsers(getUsers)
  });

  const renderCards = users =>
    users.map(({ id, name, email, role }) => (
      <Card key={id} name={name} email={email} role={role} id={id} />
    ));

  if (error) return <div>{error.message}</div>;

  return (
    <section style={{ minHeight: "100%" }}>
      {loading && <div>Loading...</div>}
      {!loading && users && renderCards(users)}
      <UserForm
        onSubmit={values => {
          console.log(values);
          // TEMP
          setTimeout(() => {
            window.location.reload();
          }, 500);
          createUser({
            variables: {
              name: values.name,
              password: values.password,
              email: values.email,
              role: values.role
            }
          });
        }}
      />
    </section>
  );
};

export default withAuthenticationCheck(Employees, ['ADMIN']);
