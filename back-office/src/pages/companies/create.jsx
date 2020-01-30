import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button } from "tabler-react";
import { CREATE_COMPANY } from "../../graphql/mutations/companies";
import { useMutation } from "@apollo/react-hooks";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";

const CompanyCreate = () => {
  console.log("CompanyCreate")
  const [createCompany] = useMutation(CREATE_COMPANY, {
    onCompleted: data => {
      // TEMP
      window.location.href = "http://localhost:80/companies";
      console.log(data);
    },
    onError: error => {
      console.log(error);
    }
  });

  return (
    <Formik
      initialValues={{ name: "", email: "" }}
      validationSchema={Yup.object({
        name: Yup.string(),
        email: Yup.string()
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          createCompany({
            variables: { name: values.name, email: values.email }
          });
        }, 400);
      }}
    >
      <Form>
        <label htmlFor="name">Name</label>
        <Field name="name" type="text" />

        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />

        <Button color="primary" type="submit" className="places__btn">
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

export default withAuthenticationCheck(CompanyCreate, ["SUPER_ADMIN"]);
