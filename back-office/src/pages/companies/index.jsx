import React, { useState } from "react";
import { GET_COMPANIES } from "../../graphql/queries/companies";
import { DELETE_COMPANY } from "../../graphql/mutations/companies";
import { useQuery, useMutation } from "@apollo/react-hooks";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";
import Table from "../../components/table";
import Tabs from "../../components/Tabs/Tabs.jsx";
import Loader from "../../components/loader";

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
      <Loader/>
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
    <section className="list-page">
      <Tabs tabs={[{ title: "All company", filter: () => true }]} action={{label:"Ajouter une entreprise", url: "/company/create"}}/>
      <div className="padding16">
        <Table data={companies} columns={columns} />
      </div>
    </section>
  );
};

export default withAuthenticationCheck(CompaniesIndex, ["SUPER_ADMIN"]);
