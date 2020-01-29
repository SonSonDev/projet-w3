import React, { useState } from "react";
import { LOGIN } from "../graphql/queries";
import { useMutation } from "@apollo/react-hooks";
import LoginForm from "../components/forms/login";

const Login = () => {
  const [err, setErr] = useState({ active: false, msg: null });

  const [login] = useMutation(LOGIN, {
    onCompleted: user => {
      // redirect
      // put on localstorage
      console.log(user);
    },
    onError: error => {
      // SHOW MESSAGES
      console.log(error.message);
      setErr({ active: true, msg: error.message });
    }
  });

  return (
    <section
      style={{
        minHeight: "100vh",
        border: "5px solid pink",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <LoginForm
        onSubmit={values =>
          login({
            variables: { email: values.email, password: values.password }
          })
        }
      />
      <div style={err.active ? { color: "red" } : { color: "blue" }}>
        {err.msg}
      </div>
    </section>
  );
};

export default Login;
