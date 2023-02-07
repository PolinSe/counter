import React, {ChangeEvent, Dispatch, useEffect, useState} from 'react';
import './App.css';
import {Button} from './components/Button';
import {Input} from './components/Input';
import {getFromLocalStorage, setToLocalStorage} from './LocalStorage';

function Counter1() {

    const [startValue, setStartValue] = useState<number>(0)
    const [maxValue, setMaxValue] = useState<number>(7)

    const [value, setValue] = useState<number>(startValue)
    const [error, setError] = useState<string | null>(null)

    const [isMode, setMode] = useState<boolean>(true)
    // mode === false - режим текста
    // mode === true - режим счетчика (видим значение)


    const setValueInitial = (key: string, callback: Dispatch<number>) => {
        const value = getFromLocalStorage(key)
        if (!value) {
            return
        }
        callback(Number(value))
    }

    useEffect(() => {
        setValueInitial('startValue', setStartValue)
        setValueInitial('maxValue', setMaxValue)
        setValueInitial('startValue', setValue)
    }, [])

    const increaseValue = () => {
        if (value < maxValue) {
            setValue(value + 1)
        } else return
    }

    const resetValue = () => setValue(startValue)

    const setParamsCallBack = () => {
        setValue(startValue)
        setToLocalStorage('startValue', startValue)
        setToLocalStorage('maxValue', maxValue)
        setMode(true) // режим числа
    }

    const isErrorHandler = (errorCondition: boolean) => {
        if (errorCondition) {
            setError('Invalid value!')
        } else setError('')
    }

    const changeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.currentTarget.value)
        isErrorHandler(value < 0 || value <= startValue)
        setMode(false) //режим текста
        setMaxValue(value)
    }

    const changeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.currentTarget.value)
        isErrorHandler(value < 0 || value >= maxValue)
        setMode(false)
        setStartValue(value)
    }


    const increaseBtnDisabled = value >= maxValue || !isMode
    const resetBtnDisabled = value === startValue || startValue < 0 || !isMode
    const setBtnDisabled = startValue >= maxValue || startValue < 0 || maxValue < 0 || isMode

    const classNameInput = `input ${startValue >= maxValue || maxValue < 0 || startValue < 0 ? 'borderRed' : ''}`
    const classNameDisplay = value < maxValue ? 'display value' : 'display value red'

    return (
        <div className="app">

            <div className="counter">

                <div className={'display'}>
                    <Input className={classNameInput} title={'max value'} value={maxValue}
                           callBack={changeMaxValueHandler}/>
                    <Input className={classNameInput} title={'start value'} value={startValue}
                           callBack={changeStartValueHandler}/>
                </div>

                <div className="buttons">
                    <Button
                        className={'btn'}
                        title={'set'}
                        callBack={setParamsCallBack}
                        disabled={setBtnDisabled}/>
                </div>
            </div>

            <div className="counter">

                {
                    !isMode
                        ?
                        <div className={classNameDisplay}>
                            {error
                                ? <div className={'display error red'}>{error}</div>

                                : <div className={'display instructions'}>enter values and press 'set'</div>
                            }
                        </div>

                        :
                        <div className={classNameDisplay}>
                            {value}
                        </div>
                }

                <div className="buttons">
                    <Button
                        className={'btn'}
                        title={'inc'}
                        callBack={increaseValue}
                        disabled={increaseBtnDisabled}
                    />
                    <Button
                        className={'btn'}
                        title={'reset'}
                        callBack={resetValue}
                        disabled={resetBtnDisabled}
                    />
                </div>
            </div>
        </div>
    );
}

export default Counter1;
