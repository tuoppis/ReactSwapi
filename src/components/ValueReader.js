import { FormControl, FloatingLabel } from "react-bootstrap";

function ValueReader({id, label, range, value, callBack}) {
    const valueChanged = (e) => {
        //let currentValue = document.getElementById(id).value;
        let currentValue = Number(e.target.value);
        /*if (currentValue !== value)*/ callBack(currentValue);
    }

    return (
        <FloatingLabel label={label}>
            <FormControl id={id} type="number" min={range.min} max={range.max} defaultValue={value} onChange={valueChanged} />
        </FloatingLabel>

    );
}

export default ValueReader;
