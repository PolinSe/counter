import React from 'react';

type ButtonPropsType = {
    title: string
    value: number
    callBack: () => void
    disabled?: boolean
    className: string
}
export const Button: React.FC<ButtonPropsType> = ({title, value, callBack, disabled, className}) => {
    return (
        <button
            className={className}
            onClick={callBack}
            disabled={disabled}
        >
            {title}
        </button>
    );
}

