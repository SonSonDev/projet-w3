import React from "react";
import { DELETE_PLACE } from "../../../graphql/queries";
import { useMutation } from "@apollo/react-hooks";

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
              <span>{h.start | "N/A"}</span>
              {" - "}
              <span>{h.end | "N/A"}</span>
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
    </div>
  );
};

export default Card;
