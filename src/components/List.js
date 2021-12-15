import { FloatingLabel, FormSelect } from "react-bootstrap";

function List({id, items, selector, title}) {
    const makeOptions = () => {
        if (!Array.isArray(items) || items.length === 0) return (<></>);
        return items.map((item, idx) => <option key={idx} value={idx}>{item[selector]}</option>);
    }

    return (
        <FloatingLabel label={title}>
            <FormSelect>
                {makeOptions()}
            </FormSelect>
        </FloatingLabel>
    );
}

export default List;