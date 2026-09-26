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

export default ColourControl;