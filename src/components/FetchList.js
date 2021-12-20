import React from "react";
import { FormSelect, FloatingLabel } from "react-bootstrap";
import {useState} from "react";

function FetchList({items, title, showProp, callBack, disabled, nullOption}) {
    //const [selectedItem, setSelectedItem] = useState(null);
    const hasNoFunction = !((Array.isArray(items) && items.length > 0) && typeof callBack ==="function");
    const getLabel = item => showProp ? item[showProp] : item; 

    const handleSelection = (e) => {
        let selected = Number(e.target.selectedIndex) - 1;
        console.log(selected);
        //if (selected === selectedIndex) return;
        let selItem = selected < 0 ? null: items[selected];
        console.log(selItem);
        //setSelectedItem(selItem);
        callBack(selItem);
    }

    return (
        <FloatingLabel label={title}>
            <FormSelect onChange={handleSelection} disabled={disabled || hasNoFunction}>
                <option key="-1" value="-1">{nullOption || "No selection"}</option>
                {Array.isArray(items) && items.map((item, idx) => <option key={idx} value={idx}>{getLabel(item)}</option>)}
            </FormSelect>
        </FloatingLabel>
    );
}

export default FetchList;