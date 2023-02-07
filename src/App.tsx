import React, {ChangeEvent, Dispatch, useEffect, useState} from 'react';
import './App.css';
import {Display} from './components/Display';
import {ButtonsPanel} from './components/ButtonsPanel';
import {Input} from './components/Input';
import {getFromLocalStorage, setToLocalStorage} from './LocalStorage';

export type BtnType = {
    id: number
    title: string
    callBack: () => void
    disabled: boolean
}

function App() {

    const [startValue, setStartValue] = useState<number>(0)
    const [maxValue, setMaxValue] = useState<number>(5)

    const [value, setValue] = useState<number>(startValue)
    const [isMode, setMode] = useState<boolean>(true)    // isMode === true - режим счетчика, isMode === false - режим настроек

    const setValueInitial = (key: string, callback: Dispatch<number>) => {
        const value = getFromLocalStorage(key)
        if (!value) {
            return
        }
        callback(Number(value))
    }

    useEffect(() => {
        setValueInitial('maxValue', setMaxValue)
        setValueInitial('startValue', setStartValue)
        setValueInitial('startValue', setValue)

    }, [])

    const increaseValue = () => {
        if (value < maxValue) {
            setValue(value + 1)
        } else return
    }

    const resetValue = () => setValue(startValue)

    // set кнопки двух экранов имеют разный функционал, они разные
    //кнопка set для установки новых значений start и max
    const setParamsCallBack = () => {
        setValue(startValue)
        setToLocalStorage('startValue', startValue)
        setToLocalStorage('maxValue', maxValue)
        setMode(!isMode)
    }
    // кнопка set для переключения режима
    const changeMode = () => {
        setMode(!isMode)
    }


    const increaseBtnDisabled = value >= maxValue
    const resetBtnDisabled = value === startValue || startValue < 0
    const setBtnDisabled = startValue >= maxValue || startValue < 0 || maxValue < 0

    const buttonsDisplay: BtnType[] = [
        {id: 1, title: 'inc', callBack: increaseValue, disabled: increaseBtnDisabled},
        {id: 2, title: 'reset', callBack: resetValue, disabled: resetBtnDisabled},
        {
            id: 3,
            title: 'set',
            callBack: changeMode,
            disabled: setBtnDisabled
        },
    ]
    const buttonsSettings: BtnType[] = [
        {
            id: 1,
            title: 'set',
            callBack: setParamsCallBack,
            disabled: setBtnDisabled
        },
    ]

    const changeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxValue(Number(e.currentTarget.value))
    }

    const changeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStartValue(Number(e.currentTarget.value))
    }

    const classNameInput = `input ${startValue >= maxValue || maxValue < 0 || startValue < 0 ? 'borderRed' : ''}`

    return (
        <div className="app">
            {
                isMode
                    ?
                    <div className="counter">
                        <Display value={value} maxValue={maxValue}/>
                        <ButtonsPanel buttons={buttonsDisplay}/>
                    </div>

                    :
                    <div className="counter">
                        <div className={'display'}>
                            <Input className={classNameInput} title={'max value'} value={maxValue} callBack={changeMaxValueHandler}/>
                            <Input className={classNameInput} title={'start value'} value={startValue} callBack={changeStartValueHandler}/>
                        </div>
                        <ButtonsPanel buttons={buttonsSettings}/>
                    </div>
            }
        </div>
    );
}

export default App;