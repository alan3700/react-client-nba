import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';  // Remplacez 'Switch' par 'Routes'
import Accueil from './page/Accueil';
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  createHttpLink,
} from "@apollo/client";
import Signup from './page/Signup';
import Signin from './page/Signin';
import { GET_LOGGED_USER } from './graphql/queries';
import { UserContext } from './UserContext';
import { Sign } from 'crypto';
import NbaPage from './page/NbaPage';
import { setContext } from "@apollo/client/link/context";
import API_URL from './config';
import { isContext } from 'vm';
import Navbar from './Composant/Navbar/Navbar';

const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function Main() {
  const [user, setUser] = useState(null);
  const { data, refetch, error } = useQuery(GET_LOGGED_USER);

  useEffect(() => {
    if (error) {
      setUser(null);
    }
  }, [error]);
  
  async function onTokenChange(token?: string) {
    if (token) {
      console.log("Token")
      localStorage.setItem("token", token);
    } else {
      console.log("remove")
      localStorage.removeItem("token");
    }
    try {
      const { data } = await refetch();
      console.log(data)
      setUser(data?.loggedUser);
    } catch (err: any) {
      if (err.message.includes("Access denied!")) {
        setUser(null);
      }
    }
  }

  useEffect(() => {
    setUser(data?.loggedUser);
    console.log(user)
  }, [data]);

console.log(user)
  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
      <div>
      <Navbar onTokenChange={onTokenChange} />
        <Routes>
        <Route path="/" element={<Accueil  />} />
            {user ? (
              <>
                <Route path="/Nba" element={<NbaPage />} />
              </>
            ) : (
              <>
                <Route path="/signin"element={<Signin onTokenChange={onTokenChange} />}/>
                <Route path="/signup" element={<Signup />} />
                
              </>
            )}
            
        </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}



function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}

export default App;
