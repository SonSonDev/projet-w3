import React from "react";
import { CREATE_PLACE } from "../../graphql/queries";
import { useMutation } from "@apollo/react-hooks";
import PlaceForm from "../../components/forms/place";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";
import { Redirect } from "react-router-dom";

const Places = () => {
  const [createPlace] = useMutation(CREATE_PLACE, {
    onCompleted: data => {
      console.log(data);
      console.log("red");
      return <Redirect to="/places" />;
    },
    onError: error => {
      console.log(error);
    }
  });

  return (
    <section className="places">
      <PlaceForm
        onSubmit={values => {
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

export default withAuthenticationCheck(Places, ["SUPER_ADMIN"]);
