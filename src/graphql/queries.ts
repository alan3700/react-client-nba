import { gql } from "@apollo/client";

export const GET_LOGGED_USER = gql`
  query LoggedUser {
    loggedUser {
      id
      email
      password
    }
  }
`;
export const GET_TEAMS = gql`
query GetTeams {
  teams {
    name
    id
  }
}
`