import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
   mutation ($name: String!, $surname: String!, $email: String!, $password: String!) {
      createUser(name: $name, surname: $surname, email: $email, password: $password) {
         id
         username
      }
   }
`;
