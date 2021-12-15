import React from "react";
import { FormSelect, FloatingLabel } from "react-bootstrap";
import {useState} from "react";

function FetchList({items, title, callBack, disabled, anyOption}) {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const hasNoFunction = !((Array.isArray(items) && items.length > 0) && typeof callBack ==="function");
    const makeOptions = () => {
        //if (!Array.isArray(items) || items.length === 0) return (<></>);
        return (
            <>
                <option key="-1" value="-1">{anyOption || "Any"}</option>
                {Array.isArray(items) && items.map((item, idx) => <option key={idx} value={idx}>{item}</option>)}
            </>
        );
    }

    const handleSelection = (e) => {
        let selected = Number(e.target.selectedIndex);
        if (selected === selectedIndex) return;
        setSelectedIndex(selected >= 0 ? selected : -1);
        if (selected < 0) callBack(null);
        callBack(items[selectedIndex]);
    }

    return (
        <FloatingLabel label={title}>
            <FormSelect onChange={handleSelection} disabled={disabled || hasNoFunction}>
                {makeOptions()}
            </FormSelect>
        </FloatingLabel>
    );
}

export default FetchList;