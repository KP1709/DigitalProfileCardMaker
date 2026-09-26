import PropTypes from "prop-types";
import { HexColorInput, HexColorPicker } from "react-colorful";
import styles from "../styles/ColourControl.module.css";

const ColourControl = ({ id, label, value, onChange }) => {
    const labelId = `${id}-label`;

    return (
        <div className={styles.field}>
            <label className={styles.label} id={labelId} htmlFor={`${id}-input`}>
                {label}
            </label>
            <HexColorPicker
                aria-labelledby={labelId}
                className={`${styles.picker} ${styles.control}`}
                color={value}
                onChange={onChange}
            />
            <HexColorInput
                id={`${id}-input`}
                className={`${styles.input} ${styles.control}`}
                color={value}
                onChange={onChange}
                prefixed
            />
        </div>
    );
};

ColourControl.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default ColourControl;