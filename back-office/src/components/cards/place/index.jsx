import React from "react";
import { DELETE_PLACE, UPDATE_HOUR } from "../../../graphql/queries";
import { useMutation } from "@apollo/react-hooks";
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
  );
};

export default Card;
