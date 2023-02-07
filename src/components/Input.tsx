import React, {ChangeEvent} from 'react';

type InputPropsType = {
    className?: string
    title: string
    value: number
    callBack: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputPropsType> = ({className, title, value, callBack, }) => {

    return (
        <label className={'text'}>{title}:
            <input
                className={className}
                value={value}
                onChange={callBack}
                type="number"/>
        </label>
    );
}

