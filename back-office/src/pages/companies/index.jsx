import React, { useState } from "react";
import { GET_COMPANIES } from "../../graphql/queries/companies";
import { DELETE_COMPANY } from "../../graphql/mutations/companies";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Card as Cards, Dimmer } from "tabler-react";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";
import { Button } from "tabler-react";
import { Link } from "react-router-dom";
import Table from "../../components/table";
import Tabs from "../../components/Tabs/Tabs.jsx";

const CompaniesIndex = () => {
  const [companies, setCompanies] = useState([]);

  const { error, loading } = useQuery(GET_COMPANIES, {
    onCompleted: ({ getCompanies }) => setCompanies(getCompanies),
    onError: error => console.log(error.message)
  });

  const [deleteCompany] = useMutation(DELETE_COMPANY, {
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
    { title: "Nom", key: "name" },
    { title: "Email", key: "email" },
    { label: "Delete", handleClick: deleteCompany },
    { label: "Edit", handleClick: () => console.log("Edit") },
    { label: "Info", handleClick: () => console.log("Info") }
  ];

  return (
    <section style={{ minHeight: "100%" }}>
      {/* <Button
        RootComponent={Link}
        to={`/company/create`}
        color="green"
        size="sm"
      >
        Add
      </Button> */}
      <Tabs tabs={[{ title: "All company", filter: () => true }]} action={{label:"Ajouter une entreprise", url: "/company/create"}}/>
      <div class="padding16">
        <Table data={companies} columns={columns} />
      </div>
    </section>
  );
};

export default withAuthenticationCheck(CompaniesIndex, ["SUPER_ADMIN"]);
