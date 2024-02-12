import { gql } from "@apollo/client";

export const createUser = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      id
    }
  }
  
`;
export const LOGIN = gql`
  mutation login($data: UserInput!) {
    login(data: $data)
  }
`;

