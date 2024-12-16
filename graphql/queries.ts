import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
   mutation ($name: String!, $surname: String!, $email: String!, $password: String!) {
      createUser(name: $name, surname: $surname, email: $email, password: $password) {
         username
      }
   }
`;

export const GET_USER_BY_USERNAME = gql`
   query ($username: String!) {
      getUser(username: $username) {
         id
         name
         surname
         email
         username
         profileImage
         status
      }
   }
`;

export const LOGIN_MUTATION = gql`
   mutation ($email: String!, $password: String!) {
      login(email: $email, password: $password) {
         username
      }
   }
`;
