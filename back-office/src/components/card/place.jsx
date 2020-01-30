import React from "react";
import { DELETE_PLACE } from "../../graphql/mutations/places";
import { useMutation } from "@apollo/react-hooks";
import { Card as Cards, Button, Tag, Header } from "tabler-react";
import { Link } from "react-router-dom";

const Card = ({
  name,
  number,
  street,
  id,
  zipCode,
  type,
  category,
  hours,
  keywords
}) => {
  const [deletePlace] = useMutation(DELETE_PLACE, {
    variables: { id },
    onCompleted: data => {
      window.location.reload();
      console.log(data);
    }
  });

  return (
    <>
      <Cards>
        <Cards.Header>
          <Cards.Title>{name}</Cards.Title>
          <Cards.Options>
            <Button color="red" size="sm" onClick={() => deletePlace()}>
              Supprimer
            </Button>
            <Button
              RootComponent={Link}
              to={`/place/${id}/update`}
              color="blue"
              size="sm"
            >
              Update
            </Button>
            <Button
              RootComponent={Link}
              to={`/place/${id}`}
              color="green"
              size="sm"
            >
              Info
            </Button>
          </Cards.Options>
        </Cards.Header>
        <Cards.Body>
          <Header.H3>Schedule</Header.H3>
          <div className="card__schedule__container">
            {hours.map(h => {
              return (
                <div className="card__schedule">
                  <span className="card__day">{h.day}</span>
                  {" - "}
                  <span>{h.start}</span>
                  {" - "}
                  <span>{h.end}</span>
                </div>
              );
            })}
          </div>
          <Header.H3>Tag</Header.H3>
          <Tag.List>
            {keywords.map(key => (
              <Tag>{key}</Tag>
            ))}
          </Tag.List>
        </Cards.Body>
        <Cards.Footer>
          {number} {street} {zipCode}
        </Cards.Footer>
      </Cards>
      {/* <HourForm
        onSubmit={values => {
          // TEMP
          setTimeout(() => {
            // window.location.reload();
          }, 500);
          updateHour({
            variables: {
              id,
              day: values.day,
              start: values.start,
              end: values.end
            }
          });
        }}
      /> */}
    </>
  );
};

export default Card;
