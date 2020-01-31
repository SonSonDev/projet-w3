import React, { useState } from "react";
import { GET_USERS } from "../../graphql/queries/employees";
import { DELETE_USER } from "../../graphql/mutations/clients";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Card as Cards, Dimmer } from "tabler-react";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";
import { Button } from "tabler-react";
import { Link } from "react-router-dom";
import Table from "../../components/table";
import Tabs from "../../components/Tabs/Tabs.jsx";

const EmployeesIndex = () => {
  console.log("EmployeesIndex");
  const [users, setUsers] = useState([]);

  const { error, loading } = useQuery(GET_USERS, {
    variables: { role: "USER" },
    onCompleted: ({ getUsers }) => setUsers(getUsers),
    onError: error => console.log(error.message)
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: data => {
      window.location.reload();
      console.log(data);
    }
  });

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

  const columns = [
    { title: "Nom de l’employé", key: "name" },
    { title: "Email", key: "email" },
    { label: "Delete", handleClick: deleteUser },
    { label: "Edit", handleClick: () => console.log("Edit") },
    { label: "Info", handleClick: () => console.log("Info") }
  ];

  return (
    <section style={{ minHeight: "100%" }}>
      <Tabs tabs={[{ title: "All Employee", filter: () => true }]} action={{label:"Ajouter un employé", url: "/employee/create"}}/>
      <div class="padding16">
        <Table data={users} columns={columns} />
      </div>
    </section>
  );
};

export default withAuthenticationCheck(EmployeesIndex, ["ADMIN", "USER"]);
