import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { CREATE_PLACE } from "../../graphql/mutations/places";
import { useMutation } from "@apollo/react-hooks";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";

const PlaceCreate = () => {
  console.log("PlaceCreate")
  const [createPlace] = useMutation(CREATE_PLACE, {
    onCompleted: data => {
      // TEMP
      window.location.href = "/places";
      console.log(data);
    },
    onError: error => {
      console.log(error);
    }
  });

  return (
    <section className="create">
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
          category: Yup.string().required()
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
        <Form className="create__form">
          <h1 className="title">Ajouter une nouvelle adresse</h1>

          <div className="field">
            <label htmlFor="name" className="label">Nom</label>
            <div className="control">
              <Field id="name" className="input" name="name" type="text" placeholder="Nom" />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="category">Catégorie</label>
            <div className="control">
              <div className="select is-fullwidth">
                <Field as="select" id="category" name="category">
                  <option value="" disabled>Sélectionner une catégorie</option>
                  <option value="FOOD">Restaurant</option>
                  <option value="SHOP">Boutique</option>
                  <option value="ACTIVITY">Activité</option>
                </Field>
              </div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="number" className="label">N° de rue</label>
            <div className="control">
              <Field id="number" className="input" name="number" type="number" placeholder="N° de rue" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="street" className="label">Rue</label>
            <div className="control">
              <Field id="street" className="input" name="street" type="text" placeholder="Rue" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="zipCode" className="label">Code postal</label>
            <div className="control">
              <Field id="zipCode" className="input" name="zipCode" type="number" placeholder="Code postal" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="type" className="label">Type</label>
            <div className="control">
              <Field id="type" className="input" name="type" type="text" placeholder="Type" />
            </div>
          </div>


          <div class="control">
            <button type="submit" class="button is-link is-large is-fullwidth">Valider</button>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default withAuthenticationCheck(PlaceCreate, ["SUPER_ADMIN"]);
