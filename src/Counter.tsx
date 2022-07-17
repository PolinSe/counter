import React, {useState} from 'react';
import './Counter.css';
import {Display} from './Display';
import {UniversalButton} from './UniversalButton';

function Counter() {

    const minValue = 0
    const maxValue = 5

    const [value, setValue] = useState<number>(minValue)

    const increaseValue = () => {
        if (value < maxValue) setValue(value + 1)
        else return
    }

    const resetValue = () => setValue(minValue)

    return (
        <div className="counter">

            <Display
                className={value < maxValue ? 'display' : 'display red'}
                value={value}
            />

            <div className="buttons">
                <UniversalButton
                    className={value < maxValue ? 'btn' : 'btn btn-disabled'}
                    title={'inc'}
                    value={value}
                    callBack={increaseValue}
                    disabled={value >= maxValue}
                />
                <UniversalButton
                    className={value === minValue ? 'btn btn-disabled' : 'btn'}
                    title={'reset'}
                    value={value}
                    callBack={resetValue}
                    disabled={value === minValue}
                />
            </div>
        </div>
    );
}

export default Counter;
