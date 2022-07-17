import React from 'react';

type UniversalButtonPropsType = {
    title: string
    value: number
    callBack: () => void
    disabled?: boolean
    className: string
}
export const UniversalButton: React.FC<UniversalButtonPropsType> = ({title, value, callBack, disabled, className}) => {
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

