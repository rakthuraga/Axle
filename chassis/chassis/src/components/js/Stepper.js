import { useState, useEffect } from 'react';
import styles from '../css/Stepper.module.css'

function Stepper({ quantity, increment, decrement, update }) {
    const [value, setValue] = useState(quantity);

    useEffect(() => {
        setValue(quantity);
    }, [quantity])
     
    const handleIncrementClick = (event) => {
        event.stopPropagation();
        setValue(value+1);
        increment();
    }

    const handleDecrementClick = (event) => {
        event.stopPropagation();
        if (value > 1) {
            setValue(value-1);
        }
        decrement();
    }

    const handleChange = (newValue) => {
        setValue(parseInt(newValue));
    }

    const handleUpdate = (newValue) => {
        let intValue = parseInt(newValue);
        if (intValue) {
            setValue(intValue);
            update(intValue);
        }
        else {
            setValue(quantity);
        }
    }

    return (
        <div className={styles.stepper}>
            <button className={`${styles.box} ${styles.button}`} onClick={(e) => {handleDecrementClick(e)}}>-</button>

            <input 
                type="number" 
                min={1} 
                className={`${styles.box} ${styles.input}`}
                value={value} 
                onChange={(e) => handleChange(e.target.value)}
                onBlur={(e) => handleUpdate(e.target.value)}
                onClick={(e) => e.stopPropagation()}
            />
            
            <button className={`${styles.box} ${styles.button}`} onClick={(e) => {handleIncrementClick(e)}}>+</button>
        </div>
    )
}

export default Stepper;