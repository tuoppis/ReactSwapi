import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import FetchButton from "./FetchButton";
import FetchList from "./FetchList";
import List from "./List";

function PeopleFilter({peopleList, disabled}) {
    const [people, setPeople] = useState([]);
    const [homeWorld, setHomeWorld] = useState(null);
    const getLocations = () => {
        if (people.length === 0) return []; 
        let location = {};
        let array = [];
        for (let p of people) {
            let loc = p.homeworld;
            if (loc.name in location) {
                array.push(loc.name);
                location[loc.name] = loc;
            }
        }
        array.sort();
        return array;
    }

    const getFiltered = () => {
        if (homeWorld === null) return people;
        return people.filter(x => x.homeworld === homeWorld); 
    }


    return (
        <Row>
            <Col xs={12} sm={6} md={4}>
                <List id="people-list" items={getFiltered()} selector="name" title="People"/>
            </Col>
            <Col>
                <ButtonGroup>
                    <FetchButton items={peopleList} chooseFunction={(x) => x.gender ==="n/a"} 
                        callBack={setPeople} label="Robots" disabled={disabled} />
                    <FetchButton items={peopleList} chooseFunction={(x) => x.gender ==="male"} 
                        callBack={setPeople} label="Male" disabled={disabled} />
                    <FetchButton items={peopleList} chooseFunction={(x) => x.gender ==="female"} 
                        callBack={setPeople} label="Female" disabled={disabled} />
                    <FetchButton items={peopleList} chooseFunction={() => true}
                        callBack={setPeople} label="All" disabled={disabled} />
                </ButtonGroup>
            </Col>
            <Col>
                <FetchList items={getLocations()} title="From" anyOption="Anywhere"
                    callBack={setHomeWorld} disabled={disabled} />
            </Col>
        </Row>
    );
}

export default PeopleFilter;