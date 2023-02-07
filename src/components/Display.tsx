import React from 'react';
import '../App.css';

type DisplayPropsType = {
    value: number
    maxValue: number
}

export const Display: React.FC<DisplayPropsType> = ({value, maxValue}) => {
    const classNameDisplay = `display value ${value < maxValue ? '' : 'red'}`
    return (
        <div className={'display'}>
            <div className={classNameDisplay}>{value}</div>
        </div>
    );
}
