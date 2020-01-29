import React, { useState } from "react";
import { GET_COMPANIES } from "../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import Card from "../components/cards/company";
import CompanyForm from "../components/forms/company";
import withAuthenticationCheck from "../components/hocs/withAuthenticationCheck";

const Clients = () => {
  const [companies, setCompanies] = useState(null);

  const { error, loading } = useQuery(GET_COMPANIES, {
    onCompleted: ({ getCompanies }) => setCompanies(getCompanies)
  });

  const renderCards = companies =>
    companies.map(({ id, name, email, role }) => (
      <Card key={id} name={name} email={email} role={role} id={id} />
    ));

  if (error) return <div>{error.message}</div>;

  return (
    <section style={{ minHeight: "100%" }}>
      {loading && <div>Loading...</div>}
      {!loading && companies && renderCards(companies)}
      <CompanyForm onSubmit={values => console.log(values)} />
    </section>
  );
};

export default withAuthenticationCheck(Clients, ['SUPER_ADMIN']);
