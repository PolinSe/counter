import React from 'react';

type DisplayPropsType = {

    value: number
    className: string
}
export const Display: React.FC<DisplayPropsType> = ({value, className}) => {
    return (
        <div className={className}>
            {value}
        </div>
    );
}

