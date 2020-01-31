import React, { useState } from "react";
import { GET_USERS } from "../../graphql/queries/clients";
import { DELETE_USER } from "../../graphql/mutations/clients";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Card as Cards, Dimmer } from "tabler-react";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";
import { Link } from "react-router-dom";
import Table from "../../components/table";
import Tabs from "../../components/Tabs/Tabs.jsx";

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
      <Cards title="Loading" isClosable isCollapsible>
        <Cards.Body>
          <Dimmer active loader />
        </Cards.Body>
      </Cards>
    );
  }

  const columns = [
    { title: "Nom du commerçant", key: "name" },
    { title: "Email", key: "email" },
    { title: "Role", key: "role" },
    { label: "Delete", handleClick: deleteUser },
    { label: "Edit", handleClick: () => console.log("Edit") },
    { label: "Info", handleClick: () => console.log("Info") }
  ];

  return (
    <section style={{ minHeight: "100%" }}>
      {/* <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a href='/client/create' className="button is-small go-to-right">Ajouter un client</a>
              </div>
            </div>
          </div>
        </div>
      </nav> */}
      <Tabs tabs={[{ title: "All clients", filter: () => true }]} action={{label:"Ajouter un Client", url: "/client/create"}}/>
      <div class="padding16">
        <Table data={clients} columns={columns} /> 
      </div>
    </section>
  );
};

export default withAuthenticationCheck(ClientsIndex, ["SUPER_ADMIN"]);
