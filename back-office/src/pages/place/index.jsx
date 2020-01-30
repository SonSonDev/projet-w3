import React, { useState } from "react";
import { GET_PLACES } from "../../graphql/queries/places";
import { useQuery } from "@apollo/react-hooks";
import Card from "../../components/card/place";
import { Card as Cards, Dimmer } from "tabler-react";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";
import { Button } from "tabler-react";
import { Link } from "react-router-dom";

const PlacesIndex = () => {
  console.log("PlacesIndex");
  const [places, setPlaces] = useState(null);

  const { error, loading } = useQuery(GET_PLACES, {
    onCompleted: ({ getPlaces }) => setPlaces(getPlaces),
    onError: error => console.log(error.message)
  });

  const renderCards = places =>
    places.map(
      ({
        id,
        name,
        address: { street, zipCode, number },
        hours,
        type,
        category,
        keywords
      }) => (
        <Card
          key={id}
          name={name}
          number={number}
          street={street}
          id={id}
          zipCode={zipCode}
          type={type}
          category={category}
          hours={hours}
          keywords={keywords}
        />
      )
    );

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
    <section className="places">
      <div className="places_cards">
        <Button
          RootComponent={Link}
          to={`/place/create`}
          color="green"
          size="sm"
        >
          Add
        </Button>
        {!loading && places && renderCards(places)}
      </div>
    </section>
  );
};

export default withAuthenticationCheck(PlacesIndex, ["SUPER_ADMIN", "ADMIN", "USER"]);
