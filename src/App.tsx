import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import './App.css';
import UserContext from './ApplicationContext/AppContext';
import { Films } from './components/Films/Films';
import { GET_USER_NAME } from './gql/gql';

export const App = () => {
  const [user, setUser] = useState({ user: '' });
  const { loading, error, data } = useQuery(GET_USER_NAME);
  useEffect(() => {
    async function getUser() {}
    if (!loading) {
      setUser(data);
    }
    getUser();
  }, [data]);

  return (
    <UserContext.Provider value={user}>
      <div className='App'>
        <Films />
      </div>
    </UserContext.Provider>
  );
};
