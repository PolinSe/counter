import React from 'react';
import {BtnType} from '../App';

type PropsType = {
    buttons: BtnType[]
}
export const ButtonsPanel = (props: PropsType) => {
    return (
        <div className="buttons">
            {
                props.buttons.map(b => <button
                    key={b.id}
                    className={'btn'}
                    onClick={b.callBack}
                    disabled={b.disabled}
                >
                    {b.title}
                </button>)
            }
        </div>
    );
}

