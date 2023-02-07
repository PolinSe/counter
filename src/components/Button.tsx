import React from 'react';

type ButtonPropsType = {
    title: string
    callBack: () => void
    disabled?: boolean
    className?: string
}
export const Button: React.FC<ButtonPropsType> = ({title, callBack, disabled, className}) => {
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

