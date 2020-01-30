import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button } from "tabler-react";
import { CREATE_PLACE } from "../../graphql/mutations/places";
import { useMutation } from "@apollo/react-hooks";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";

const PlaceCreate = () => {
  console.log("PlaceCreate")
  const [createPlace] = useMutation(CREATE_PLACE, {
    onCompleted: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    }
  });

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
        street: "",
        zipCode: "",
        type: "",
        category: ""
      }}
      validationSchema={Yup.object({
        name: Yup.string(),
        number: Yup.number(),
        street: Yup.string(),
        zipCode: Yup.number(),
        type: Yup.string(),
        category: Yup.string()
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
        }, 400);
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
    >
      <Form className="places__form">
        <div className="places__field">
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />
        </div>

        <div>
          <div className="places__field">
            <label htmlFor="number">Number</label>
            <Field name="number" type="number" />
          </div>

          <div className="places__field">
            <label htmlFor="street">Street</label>
            <Field name="street" type="text" />
          </div>

          <div className="places__field">
            <label htmlFor="zipCode">ZipCode</label>
            <Field name="zipCode" type="number" />
          </div>
        </div>

        <div className="places__field">
          <label htmlFor="type">Type</label>
          <Field name="type" type="text" />
        </div>

        <div className="places__field">
          <label htmlFor="category">Category</label>
          <Field as="select" name="category">
            <option value="FOOD">Food</option>
            <option value="SHOP">Shop</option>
            <option value="ACTIVITY">Activity</option>
          </Field>
        </div>

        <Button color="primary" type="submit" className="places__btn">
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

export default withAuthenticationCheck(PlaceCreate, ["SUPER_ADMIN"]);
