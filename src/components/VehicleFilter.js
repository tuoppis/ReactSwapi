import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import List from "./List";
import FetchButton from "./FetchButton";
import MinMaxReader from "./MinMaxReader";

function VehicleFilter({vehicleList, disabled}) {
    const maxPassengerLimits = {min: 0, max: 100};
    const [vehicles, setVehicles] = useState([]);
    const [passengerLimit, setPassengerLimit] = useState(maxPassengerLimits);
    const minMax = (val, limits, maxLimit) => {
        val = Number(val);
        if (!maxLimit) return (val >= limits.min) && (val <= limits.max);
        let minCond = (limits.min === maxLimit.min) || (val >= limits.min);
        let maxCond = (limits.max === maxLimit.max) || (val <= limits.max);

        return minCond && maxCond;
    };

    return (
        <Row>
            <Col xs={12} sm={6} md={4}>
                <List items={vehicles} showProp="name" title="Vehicles"/>
            </Col>
                <MinMaxReader id="passenger" label="Passengers" 
                    currentRange={passengerLimit} maxRange={maxPassengerLimits} callBack={setPassengerLimit} />
            <Col>
                <FetchButton items={vehicleList} chooseFunction={x => minMax(x.passengers, passengerLimit, maxPassengerLimits)} 
                    callBack={setVehicles} label="Vehicles" disabled={disabled}/>
            </Col>
        </Row>
    );
}

export default VehicleFilter;