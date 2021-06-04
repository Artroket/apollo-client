import { FC } from 'react';
import { useSubscription } from '@apollo/client';
import { NEW_FILM_ADDED } from '../../../gql/gql';

export const FilmAdded: FC = () => {
  const { data, error, loading } = useSubscription(NEW_FILM_ADDED, {
    variables: {
      rate: 10,
    },
  });

  if (loading) {
    return <p>Waiting for new films...</p>;
  }
  if (error) return <p>Error! : {error}</p>;
  return <div>new film added: {data.goodFilmAdded.name}</div>;
};
