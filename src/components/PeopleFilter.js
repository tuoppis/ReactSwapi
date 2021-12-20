import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import ButtonGroup from "react-bootstrap/ButtonGroup";
//import FetchButton from "./FetchButton";
import FetchList from "./FetchList";
import List from "./List";

function PeopleFilter({peopleList, disabled}) {
    const [people, setPeople] = useState([]);
    const [genderList, setGenderList] = useState([]);
    const [locations, setLocations] = useState([]);

    const getLocations = (list) => {
        if (list.length === 0) return []; 
        let locations = {};
        let array = [];
        for (let p of list) {
            let loc = p.homeworld;
            if (!(loc.name in locations)) {
                //console.log(loc);
                array.push(loc.name);
                locations[loc.name] = loc;
            }
        }
        //console.log(array);
        setLocations(array.sort());
    }

    const handleGender = gend => {
        let workingList = peopleList || []
        if (gend === null) setGenderList(workingList);
        else setGenderList(workingList.filter(x => x.gender === gend));
        getLocations(genderList);
        //handleHome(null);
    }

    const handleHome = home => {
        if (home === null) setPeople(genderList);
        else setPeople(genderList.filter(x => x.homeworld.name === home))
    }

useEffect(() => {
    if (Array.isArray(peopleList) && genderList.length === 0) {
        handleGender(null);
    } else {
        getLocations(genderList);
    }
    handleHome(null);
}, [genderList]);

    return (
        <Row>
            <Col xs={12} sm={6} md={4}>
                <List items={people} showProp="name" title="People"/>
            </Col>
            <Col>
                <FetchList items={["male", "female", "n/a"]} title="Gender" nullOption="Any"
                    callBack={handleGender} disabled={disabled} />
            </Col>
            <Col xs={12} sm={6} md={4}>
                <FetchList items={locations} title="From" nullOption="Anywhere"
                    callBack={handleHome} disabled={disabled} />
            </Col>
        </Row>
    );
}
/*
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
*/
export default PeopleFilter;