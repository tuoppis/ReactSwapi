import Button from "react-bootstrap/Button";

function FetchButton({items, chooseFunction, callBack, label, disabled}) {
    const hasNoFunction = () => {
        if (!Array.isArray(items) || items.length === 0) return false;
        if (typeof callBack !== "function" || typeof chooseFunction !== "function") return false;
    }
    const processClick = () => {
        callBack(items.filter(chooseFunction));
    }
    
    return <Button variant="outline-primary" onClick={processClick} disabled={disabled || hasNoFunction()}>{label}</Button>;
}

export default FetchButton;