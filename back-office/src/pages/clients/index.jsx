import React, { useState } from "react";
import { GET_USERS } from "../../graphql/queries/clients";
import { DELETE_USER } from "../../graphql/mutations/clients";
import { useQuery, useMutation } from "@apollo/react-hooks";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";
import Table from "../../components/table";
import Tabs from "../../components/Tabs/Tabs.jsx";
import Loader from "../../components/loader";

const ClientsIndex = () => {

  const [clients, setClients] = useState([]);
  
  const { error, loading } = useQuery(GET_USERS, {
    variables: { role: "ADMIN" },
    fetchPolicy: "no-cache",
    onCompleted: ({ getUsers }) => setClients(getUsers),
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
      <Loader/>
    );
  }

  const columns = [
    { title: "Prénom", key: "firstName" },
    { title: "Nom", key: "lastName" },
    { title: "Email", key: "email" },
    { title: "Role", key: "role" },
    { label: "Delete", handleClick: deleteUser },
    { label: "Edit", handleClick: () => console.log("Edit") },
    { label: "Info", handleClick: () => console.log("Info") }
  ];

  return (
    <section className="list-page">
      <Tabs tabs={[{ title: "All clients", filter: () => true }]} action={{label:"Ajouter un Client", url: "/client/create"}}/>
      <div className="padding16">
        <Table data={clients} columns={columns} /> 
      </div>
    </section>
  );
};

export default withAuthenticationCheck(ClientsIndex, ["SUPER_ADMIN"]);
