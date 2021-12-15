import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import Swapi from './components/Swapi';
import Container from 'react-bootstrap/Container';
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import PeopleFilter from './components/PeopleFilter';
import VehicleFilter from './components/VehicleFilter';

function App() {
  let [apiLoaded, setApiLoaded] = useState(false);
  let [tryAgain, setTryAgain] = useState(false);
  const [swapi, setSwapi] = useState({});

  useEffect( () => {
    const startSwapi = async () => {
      try {
        let swapi = new Swapi();
        await swapi.promise;
        setSwapi(swapi);
        setApiLoaded(true);
      } catch (err) {
        //setSwapi({});
        setTryAgain(true);
        window.alert(err);
      }
    }
    if (!apiLoaded) startSwapi();
  }, [swapi]);  

  return (
    <Container>
      <Stack gap={3}>
        <h1>Starwars-Api Test</h1>
        <PeopleFilter peopleList={swapi.people} disabled={!apiLoaded} />
        <VehicleFilter vehicleList={swapi.vehicles} disabled={!apiLoaded} />
        {tryAgain && <Button variant="primary" onClick={() => {setSwapi({}); setTryAgain(false);}}>Could Not Load: Try Again?</Button> }
      </Stack>
    </Container>
  );
}

export default App;
