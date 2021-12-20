import { FloatingLabel, FormSelect } from "react-bootstrap";

function List({items, showProp, title}) {
    const getLabel = (item) => showProp ? item[showProp] : item;
    const makeOptions = () => {
        if (!Array.isArray(items) || items.length === 0) return (<></>);
        return items.map((item, idx) => <option key={idx} value={idx}>{getLabel(item)}</option>);
    }

    return (
        <FloatingLabel label={title}>
            <FormSelect>
                {Array.isArray(items) && items.map((item, idx) => <option key={idx} value={idx}>{getLabel(item)}</option>)}
            </FormSelect>
        </FloatingLabel>
    );
}

export default List;