import React from "react";
import { DELETE_PLACE, UPDATE_HOUR } from "../../../graphql/queries";
import { useMutation } from "@apollo/react-hooks";
import { Card as Cards, Button, Tag, Header } from "tabler-react";
import HourForm from "../../forms/hour";
import { Redirect } from "react-router-dom";

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
  // const [updateHour] = useMutation(UPDATE_HOUR, {
  //   onCompleted: data => {
  //     window.location.reload();
  //     console.log(data);
  //   }
  // });

  const redirect = () => {
    console.log('ok')
    return <Redirect to="/" />;
  };

  const [deletePlace] = useMutation(DELETE_PLACE, {
    variables: { id },
    onCompleted: data => {
      // TEMP
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
            <Button color="blue" size="sm" onClick={() => redirect()}>
              Update
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
