import { FC } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FILM, DELETE_FILM } from '../../../gql/gql';

export const AddNewFilm: FC = () => {
  const [addFilm] = useMutation(ADD_FILM);
  const [deleteFilm] = useMutation(DELETE_FILM);

  const addNewFilm = () => {
    addFilm({
      variables: {
        name: 'IT',
        watched: true,
        rate: 10,
        genre: 'Horror',
      },
    });
  };
  const deleteCurrentFilm = () => {
    deleteFilm({
      variables: {
        name: 'IT',
      },
    });
  };
  return (
    <div>
      <button onClick={addNewFilm}>add film</button>
      <button onClick={deleteCurrentFilm}>delete film</button>
    </div>
  );
};
