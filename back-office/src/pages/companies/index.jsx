import React, { useState } from "react";
import { GET_COMPANIES } from "../../graphql/queries/companies";
import { useQuery } from "@apollo/react-hooks";
import Card from "../../components/card/company";
import { Card as Cards, Dimmer } from "tabler-react";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";
import { Button } from "tabler-react";
import { Link } from "react-router-dom";

const CompaniesIndex = () => {
  console.log("CompaniesIndex");
  const [companies, setCompanies] = useState(null);

  const { error, loading } = useQuery(GET_COMPANIES, {
    onCompleted: ({ getCompanies }) => setCompanies(getCompanies),
    onError: error => console.log(error.message)
  });

  const renderCards = companies =>
    companies.map(({ id, name, email, role }) => (
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
        to={`/company/create`}
        color="green"
        size="sm"
      >
        Add
      </Button>
      {!loading && companies && renderCards(companies)}
    </section>
  );
};

export default withAuthenticationCheck(CompaniesIndex, ["SUPER_ADMIN"]);
