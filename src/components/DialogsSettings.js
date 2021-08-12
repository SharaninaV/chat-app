import React, {useEffect, useState} from "react";
import ReactModal from 'react-modal'
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Formik, Form, FieldArray, Field} from "formik";
import {
    fetchDialogsSettingsRequest,
    hideDialogsSettings, resetUpdatedState, updateGreetingRequest,
    updatePhrasesRequest
} from "../redux/dialogsSettings/actionCreator";
import {toast} from "react-toastify";

const DialogsSettings = ({isShowSettings, operatorID}) => {

    const dispatch = useDispatch()

    const dialogsSettings = useSelector((state) => state.dialogsSettings.dialogsSettings)
    const isPhrasesUpdated = useSelector((state) => state.dialogsSettings.isPhrasesUpdated)
    const isGreetingUpdated = useSelector((state) => state.dialogsSettings.isGreetingUpdated)
    const [phrases, setPhrases] = useState([])
    const [newPhrase, setNewPhrase] = useState('')
    const [greeting, setGreeting] = useState('')
    const [newGreeting, setNewGreeting] = useState('')
    const [isSettingsUpdated, setIsSettingsUpdated] = useState(false)

    const handleHideSettings = event => {
        dispatch(hideDialogsSettings())
    }

    const handlePhraseChange = event => {
        setNewPhrase(event.target.value)
    }

    const handleGreetingChange = event => {
        setNewGreeting(event.target.value)
    }

    const handleSaveDialogsSettings = event => {
        if (phrases.length === 0) {
            dispatch(updatePhrasesRequest("empty", operatorID))
        } else {
            dispatch(updatePhrasesRequest(phrases, operatorID))
        }
        if (newGreeting) {
            dispatch(updateGreetingRequest(newGreeting, operatorID))
        }
    }

    useEffect(() => {
        if (dialogsSettings && Object.keys(dialogsSettings).length) {
            if (dialogsSettings.data.phrases !== "empty") {
                setPhrases(dialogsSettings.data.phrases)
            }
            setGreeting(dialogsSettings.data.greeting)
        }
    }, [dialogsSettings])

    useEffect(() => {
        dispatch(fetchDialogsSettingsRequest(operatorID))
        console.log(dialogsSettings)
    }, [isShowSettings])

    useEffect(() => {

    }, [phrases, greeting])

    useEffect(() => {
        if (isGreetingUpdated || isPhrasesUpdated) {
            setIsSettingsUpdated(true)
        }
    }, [isPhrasesUpdated, isGreetingUpdated])

    useEffect(() => {
        if (isSettingsUpdated) {
            toast.success('Настройки диалогов успешно обновлены')
        }
        setIsSettingsUpdated(false)
        handleHideSettings()
        dispatch(resetUpdatedState())
    }, [isSettingsUpdated])

    return (
        <ReactModal
            isOpen={isShowSettings}
            contentLabel={"Настройки диалогов"}
            portalClassName={"ReactModalPortal"}
        >
            <h2>Настройки диалогов</h2>
            <h5>Готовые фразы:</h5>
            <Formik
                initialValues={{phrases: phrases}}
                render={({values}) => (
                    <Form>
                        <FieldArray
                            name="phrases"
                            render={arrayHelpers => (
                                <div>
                                    {values.phrases && values.phrases.length >= 0 ? (
                                        values.phrases.map((phrase, index) => (
                                            <div key={index}>
                                                <Field name={`phrases.${index}`}/>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        arrayHelpers.remove(index)
                                                        setPhrases(phrases.slice(0, index)
                                                            .concat(phrases.slice(index + 1, phrases.length)))
                                                    }}
                                                >
                                                    Удалить
                                                </button>

                                            </div>
                                        ))
                                    ) : (
                                        <p>Нет</p>
                                    )}
                                    <Field as="textarea" name="newPhrase" placeholder="Введите фразу..."
                                           onChange={handlePhraseChange}/>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            arrayHelpers.push(newPhrase)
                                            setPhrases(phrases.concat(newPhrase))
                                        }
                                        }
                                    >
                                        Добавить
                                    </button>
                                </div>
                            )}
                        />

                        <div>
                            <h5>Приветствие по умолчанию:</h5> <br/> {greeting ? greeting : "нет"}
                        </div>
                        <div>
                            <h5>Изменить текст приветствия:</h5> <br/>
                            <Field as="textarea" name="greeting" placeholder="Введите текст приветствия..."
                                   onChange={handleGreetingChange}/>
                        </div>
                    </Form>
                )}
            />
            <Button onClick={handleSaveDialogsSettings} style={{marginTop: "50px"}}>Сохранить настройки</Button>
            <Button onClick={handleHideSettings} style={{marginTop: "50px"}} variant="danger">Закрыть</Button>
        </ReactModal>
    )
}

export {DialogsSettings}
