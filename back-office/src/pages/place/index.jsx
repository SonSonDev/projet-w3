import React, { useState } from "react";
import { GET_PLACES, CREATE_PLACE } from "../../graphql/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Card from "../../components/cards/place";
import PlaceForm from "../../components/forms/place";
import { Card as Cards, Dimmer } from "tabler-react";
import Hourform from "../../components/forms/hour";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";

const Index = () => {
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
    <section className='places'>
      <div className='places_cards'>
        {loading && 
        <Cards title="Loading" isClosable isCollapsible>
          <Cards.Body>
            <Dimmer active loader>
            </Dimmer>
          </Cards.Body>
        </Cards>}
        
        {!loading && places && renderCards(places)}
      </div>
    </section>
  );
};

export default withAuthenticationCheck(Index, ['SUPER_ADMIN']);
