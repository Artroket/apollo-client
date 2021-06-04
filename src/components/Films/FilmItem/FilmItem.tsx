import { FC } from 'react';

export const FilmItem: FC<{ film: string }> = (props) => {
  return <div>{props.film}</div>;
};
