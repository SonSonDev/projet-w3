import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button } from "tabler-react";
import { useParams } from "react-router-dom";
import { GET_PLACE } from "../../graphql/queries/index";
import { useQuery } from "@apollo/react-hooks";

const Update = () => {
  let { id } = useParams("id");

  const { error, loading, data } = useQuery(GET_PLACE, {
    variables: { id },
    onCompleted: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    }
  });

  if (error) return <div>{error.message}</div>;
  if (loading) return <div>Loading...</div>;
  if (!loading && data)
    return (
      <Formik
        initialValues={{
          name: data.getPlace.name,
          number: data.getPlace.address.number,
          street: data.getPlace.address.street,
          zipCode: data.getPlace.address.zipCode,
          type: data.getPlace.type,
          category: data.getPlace.category
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

export default Update;
