

import { LOGIN } from "../graphql/mutations";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
function Signin(props) {
    // Redirects to dashboard if there's a user logged in
    const navigate = useNavigate();
  
    const [email, setEmail] = useState("alan@gmail.com");
    const [password, setPassword] = useState("12341234");
    const [error, setError] = useState('')
  
    const [doSignInMutation, { loading }] = useMutation(LOGIN);
    async function doSignIn(e) {
        e.preventDefault();
          await doSignInMutation({
            variables: {
              data: {
                email,
                password,
              },
            },
          }).then(res => {
            console.log(res)
            if (res.data.login) {
              props.onTokenChange(res.data.login);
              navigate("/");
            } else {
              setError('Veuillez vérifier votre adresse mail et votre mot de passe')
            }
          })
      }
  
    return (
      <>
        {error && (
          <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
        )}
        <p>Email:</p>
        <input
          disabled={loading}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password:</p>
        <input
          disabled={loading}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading} onClick={doSignIn}>
          Signin
        </button>
      </>
    );
  }
  
  export default Signin;