import React, { useState } from "react";
import { GET_PLACES, CREATE_PLACE } from "../graphql/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Card from "../components/cards/place";
import PlaceForm from "../components/forms/place";
import Hourform from "../components/forms/hour";

const Places = () => {
  const [places, setPlaces] = useState(null);
  const [createPlace] = useMutation(CREATE_PLACE);

  const { error, loading } = useQuery(GET_PLACES, {
    onCompleted: ({ getPlaces }) => {
      console.log(getPlaces);
      setPlaces(getPlaces);
    }
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
        keywords,
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

  return (
    <section style={{ minHeight: "100vh", border: "5px solid pink" }}>
      {loading && <div>Loading...</div>}
      {!loading && places && renderCards(places)}
      <PlaceForm
        onSubmit={values => {
          // TEMP
          setTimeout(() => {
            window.location.reload();
          }, 500);
          createPlace({
            variables: {
              name: values.name,
              number: values.number,
              street: values.street,
              zipCode: values.zipCode,
              type: values.type,
              category: values.category
            }
          });
        }}
      />
    </section>
  );
};

export default Places;
