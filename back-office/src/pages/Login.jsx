import React, { useState } from "react";
import { LOGIN } from "../graphql/queries";
import { useMutation } from "@apollo/react-hooks";
import LoginForm from "../components/forms/login";

const Login = () => {
  const [err, setErr] = useState({ active: false, msg: null });

  const [login] = useMutation(LOGIN, {
    onCompleted: ({
      login: {
        user: { id, name, email, role }
      }
    }) => {
      // redirect
      // put on localstorage
      const user = {
        id,
        name,
        email,
        role
      };
      localStorage.setItem("isLoggedIn", "true");
      console.log(JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "http://localhost:80/";
      console.log({ id, name, email, role });
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
        minHeight: "100%",
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
