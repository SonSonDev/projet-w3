import React, { useState } from "react";
import { GET_PLACES } from "../../graphql/queries/places";
import { DELETE_PLACE } from "../../graphql/mutations/places";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Card as Cards, Dimmer } from "tabler-react";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";
import { Button } from "tabler-react";
import { Link } from "react-router-dom";
import Table from "../../components/table";

const PlacesIndex = () => {

  const [places, setPlaces] = useState([]);

  const { error, loading } = useQuery(GET_PLACES, {
    onCompleted: ({ getPlaces }) => setPlaces(getPlaces),
    onError: error => console.log(error.message)
  });

  const [deletePlace] = useMutation(DELETE_PLACE, {
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
    { title: "Catégorie", key: "category" },
    { title: "Adresse", key: "address" },
    { label: "Delete", handleClick: deletePlace },
    { label: "Edit", handleClick: () => console.log("Edit") },
    { label: "Info", handleClick: () => console.log("Info") }
  ];

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
        <Table
          data={places.map(({ address: { street, zipCode, number }, ...place }) => ({
              ...place,
              address: `${number} ${street} ${zipCode}`
            })
          )}
          columns={columns}
        />
      </div>
    </section>
  );
};

export default withAuthenticationCheck(PlacesIndex, [
  "SUPER_ADMIN",
  "ADMIN",
  "USER"
]);
