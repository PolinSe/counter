import React, {ChangeEvent, useState} from 'react';
import './Counter.css';
import {Button} from './components/Button';

function Counter() {

    const [startValue, setStartValue] = useState<number>(0)
    const [maxValue, setMaxValue] = useState<number>(7)

    const [value, setValue] = useState<number>(startValue)
    const [error, setError] = useState<string | null>(null)

    const [mode, setMode] = useState<boolean>(true)
    // mode === false - режим текста
    // mode === true - режим счетчика (видим значение)


    const increaseValue = () => {
        if (value < maxValue) {
            setValue(value + 1)
        }
        else return
    }

    const resetValue = () => setValue(startValue)


    const setParamsCallBack = () => {
        setValue(startValue)
        setMode(true)
    }

    const changeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value) <= startValue) {
            setError('Invalid value!')
        } else setError('')

        setMode(false)
        setMaxValue(Number(e.currentTarget.value))
    }

    const changeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value) < 0 || Number(e.currentTarget.value) >= maxValue) {
            setError('Invalid value!')
        } else setError('')

        setMode(false)
        setStartValue(Number(e.currentTarget.value))
    }

    return (
        <div className="app">

            <div className="counter counter_settings">

                <div className={'display'}>
                    <label className={'text'}>max value:
                        <input className={startValue >= maxValue ? 'input borderRed' : 'input'} value={maxValue}
                               onChange={changeMaxValueHandler} type="number"/>
                    </label>
                    <label className={'text'}>start value:
                        <input className={startValue >= maxValue || startValue < 0 ? 'input borderRed' : 'input'}
                               value={startValue} onChange={changeStartValueHandler} type="number"/>
                    </label>
                </div>

                <div className="buttons">
                    <Button
                        className={(startValue >= maxValue || startValue < 0) || mode === true ? 'btn btn-disabled' : 'btn'}
                        title={'set'}
                        value={value}
                        callBack={setParamsCallBack}
                        disabled={startValue >= maxValue || startValue < 0 || maxValue < 0 || mode === true}/>
                </div>
            </div>

            <div className="counter counter_dashboard">
                {
                    !mode
                        ? <div className={value < maxValue ? 'display value' : 'display value red'}>
                            {error
                                ? <div className={'display error red'}>{error}</div>

                                : <div className={'display instructions '}>enter values and press 'set'</div>

                            }
                        </div>
                        : <div className={value < maxValue ? 'display value' : 'display value red'}>{value}</div>
                }


                <div className="buttons">
                    <Button
                        className={value >= maxValue || mode === false ? 'btn btn-disabled' : 'btn '}
                        title={'inc'}
                        value={value}
                        callBack={increaseValue}
                        disabled={value >= maxValue || mode === false}
                    />
                    <Button
                        className={value === startValue || mode === false ? 'btn btn-disabled' : 'btn'}
                        title={'reset'}
                        value={value}
                        callBack={resetValue}
                        disabled={value === startValue || startValue < 0 || mode === false}
                    />
                </div>
            </div>
        </div>
    );
}

export default Counter;
