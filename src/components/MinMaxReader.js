import ValueReader from "./ValueReader";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion"
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionItem from "react-bootstrap/esm/AccordionItem";

function MinMaxReader({id, label, currentRange, maxRange, callBack}) {
    const minId = id + "-min";
    const maxId = id + "-max";
    const minChanged = (min) => {
        let max = document.getElementById(maxId).value;
        if (min > max) document.getElementById(minId).value = min = max; 
        callBack({min:min, max:max});
    }
    
    const maxChanged = (max) => {
        let min = document.getElementById(minId).value;
        if (max < min) document.getElementById(maxId).value = max = min;
        callBack({min:min, max:max});
    }

    return (
        <Col>
        <Accordion flush>
            <AccordionItem eventKey="0" >
            <AccordionHeader>{label}</AccordionHeader>
            <AccordionBody>
                <Row sm={1} md={2}>
                <ValueReader id={minId} label="Minimum" range={maxRange} value={currentRange.min} callBack={minChanged} />
                <ValueReader id={maxId} label="Maximum" range={maxRange} value={currentRange.max} callBack={maxChanged} />
                </Row>
            </AccordionBody>
            </AccordionItem>
        </Accordion>
        </Col>
    );
}

export default MinMaxReader;
