import { gql } from '@apollo/client';

export const GET_FILMS_PAGE = gql`
  query getPage($offset: Int!, $limit: Int!) {
    films(offset: $offset, limit: $limit) {
      data {
        name
      }
      meta {
        count
      }
    }
  }
`;

export const NEW_FILM_ADDED = gql`
  subscription ($rate: Float!) {
    goodFilmAdded(rate: $rate) {
      name
      genre
    }
  }
`;

export const GET_COUNT = gql`
  {
    numberOfFilms
  }
`;

export const GET_USER_NAME = gql`
  {
    user
  }
`;

export const ADD_FILM = gql`
  mutation newFilm($name: String!, $watched: Boolean!, $rate: Int!, $genre: String!) {
    createFilm(input: { name: $name, watched: $watched, rate: $rate, genre: $genre }) {
      name
      watched
      genre
      rate
    }
  }
`;

export const DELETE_FILM = gql`
  mutation deleteFilm($name: String!) {
    deleteFilm(name: $name) {
      name
    }
  }
`;
