import React from "react";
import { DELETE_PLACE, UPDATE_HOUR } from "../../../graphql/queries";
import { useMutation } from "@apollo/react-hooks";
import { Card as Cards, Button, Tag, Header } from "tabler-react";
import HourForm from "../../forms/hour";

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
  const [updateHour] = useMutation(UPDATE_HOUR, {
    onCompleted: data => {
      window.location.reload();
      console.log(data);
    }
  });

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
    <div style={{ padding: "1em" }}>
      <div>Name: {name}</div>
      <div>type: {type}</div>
      <div>category: {category}</div>
      <div>Keyword: {keywords.map(k => k).join(", ")}</div>
      <div style={{ border: "2px solid grey", padding: "1em" }}>
        <div style={{ color: "grey", marginBottom: "1em" }}>Address</div>
        <div>number: {number}</div>
        <div>street: {street}</div>
        <div>zipCode: {zipCode}</div>
      </div>
      <div style={{ border: "2px solid grey", padding: "1em" }}>
        <div style={{ color: "grey", marginBottom: "1em" }}>hours</div>
        {hours.map(h => {
          return (
            <div>
              <span>{h.day}</span>
              {" - "}
              <span>{h.start}</span>
              {" - "}
              <span>{h.end}</span>
            </div>
          );
        })}
      </div>
      <div
        onClick={() => deletePlace()}
        style={{ color: "red", cursor: "pointer" }}
      >
        Supprimer
      </div>
      <HourForm
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
      />
    </div>
    <Cards>
      <Cards.Header>
        <Cards.Title>{name}</Cards.Title>
        <Cards.Options>
          <Button color="red" size="sm" onClick={() => deletePlace()}>
            Supprimer
          </Button>
        </Cards.Options>
      </Cards.Header>
      <Cards.Body>
        <Header.H3>Schedule</Header.H3>
        <div class="card__schedule__container">
          {hours.map(h => {
              return (
                <div class="card__schedule">
                  <span class="card__day">{h.day}</span>
                  {" - "}
                  <span>{h.start | "N/A"}</span>
                  {" - "}
                  <span>{h.end | "N/A"}</span>
                </div>
              );
            })}
        </div>
        <Header.H3>Tag</Header.H3>
          <Tag.List>
            {keywords.map(key => <Tag>{key}</Tag>)}
          </Tag.List>
      </Cards.Body>
      <Cards.Footer>{number} {street} {zipCode}</Cards.Footer>
    </Cards>
</>
  );
};

export default Card;
