import { FC, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FILMS_PAGE } from '../../gql/gql';
import { FilmAdded } from './FilmAddedNotification/FilmAddedNotification';
import { FilmItem } from './FilmItem/FilmItem';
import { AddNewFilm } from './AddFilm/AddFilm';
import usePagination from '../common/Pagination';
import UserContext from '../../ApplicationContext/AppContext';

const PAGE_SIZE = 5;

export const Films: FC = () => {
  const [films, setFilms] = useState<any>([]);
  const { loading, error, data, refetch } = useQuery(GET_FILMS_PAGE, {
    variables: { offset: 0, limit: PAGE_SIZE },
  });

  const totalCount = !loading ? data.films.meta.count : 0;
  const loadMoreButton = usePagination(PAGE_SIZE, totalCount, refetch);

  useEffect(() => {
    async function getFilmList() {
      if (!loading) {
        const newFilms = data.films.data.map((item: any) => <FilmItem key={item.name} film={item.name} />);
        setFilms([...films, newFilms]);
      }
    }
    getFilmList();
  }, [data]);

  if (loading) return <p>Loading ...</p>;

  return (
    <div>
      <div>{films}</div>
      <div>
        {loadMoreButton}
        <FilmAdded />
        <AddNewFilm />
        <UserContext.Consumer>{(user) => <div>films by {user.user}</div>}</UserContext.Consumer>
      </div>
    </div>
  );
};
