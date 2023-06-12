import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';
import { Sub, SubsResponseFromApi } from './types';
import axios from 'axios';

// const INITIAL_STATE = [
//   {
//     nick: 'dapelu',
//     subMonths: 3,
//     avatar: 'https://i.pravatar.cc/150?u=dapelu',
//     description: 'Dapelu hace dfe moderador a veces'
//   },
//   {
//     nick: 'sergio_serrano',
//     subMonths: 7,
//     avatar: 'https://i.pravatar.cc/150?u=sergio_serrano'
//   }];

interface AppState {
  subs: Array<Sub>
  newSubsNumber: number
};

function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([]);
  const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumber"]>(0);

  const divRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   setSubs(INITIAL_STATE)
  // }, []);
  useEffect(() => {
    const fetchSubs = (): Promise<SubsResponseFromApi> => {
      return axios
        .get('http://localhost: 3001/subs')
        .then(response => response.data)
    }
    const mapFromApiToSubs = (apiResponse: SubsResponseFromApi): Array<Sub> => {
      return apiResponse.map(subFromApi => {
        const {
          nick,
          months: subMonths,
          profileUrl: avatar,
          description
        } = subFromApi

        return {
          nick,
          description,
          avatar,
          subMonths
        }
      })
    }
    fetchSubs()
      .then(mapFromApiToSubs)
      .then(setSubs)
  }, []);

  const handleNewSub = (newSub: Sub): void => {
    setSubs(subs => [...subs, newSub])
    setNewSubsNumber(n => n + 1)
  }

  return (
    <div className="App" ref={divRef}>
      <h1>Alex subs</h1>
      <List subs={subs} />
      New Subs: {newSubsNumber}
      <Form onNewSub={handleNewSub} />
    </div>
  );
}

export default App;