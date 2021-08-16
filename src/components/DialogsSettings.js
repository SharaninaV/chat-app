import React, {useEffect, useState} from "react";
import ReactModal from 'react-modal'
import {Button, Col, Container, Input, Row} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {Formik, Form, FieldArray, Field} from "formik";
import {
    fetchDialogsSettingsRequest,
    hideDialogsSettings, resetDialogsUpdatedState, updateGreetingRequest,
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
    }, [isShowSettings])

    useEffect(() => {

    }, [phrases, greeting])

    useEffect(() => {
        if (isGreetingUpdated || isPhrasesUpdated) {
            toast.success('Настройки диалогов успешно обновлены')
        }
        handleHideSettings()
        dispatch(resetDialogsUpdatedState())
    }, [isGreetingUpdated, isPhrasesUpdated])

    return (
        <ReactModal
            isOpen={isShowSettings}
            contentLabel={"Настройки диалогов"}
            portalClassName={"ReactModalPortal"}
            style={{
                content: {
                    background: "https://i.pinimg.com/originals/d4/79/35/d479359444438e53a87e3fcd7a752b0e.png"
                }
            }}
        >
            <h2>Настройки диалогов</h2>
            <h3>Шаблоны:</h3>
            <Formik
                initialValues={{phrases: phrases}}
                render={({values}) => (
                    <Container>
                        <Form>
                            <FieldArray
                                name="phrases"
                                render={arrayHelpers => (
                                    <div>
                                        {values.phrases && values.phrases.length >= 0 ? (
                                            values.phrases.map((phrase, index) => (
                                                <div key={index}>
                                                    <Row>
                                                        <Col>
                                                            <Field name={`phrases.${index}`} disabled={true}/>
                                                        </Col>
                                                        <Col md={3}>
                                                            <Button
                                                                color="info"
                                                                className="form-button deletePhrase-btn"
                                                                onClick={() => {
                                                                    arrayHelpers.remove(index)
                                                                    setPhrases(phrases.slice(0, index)
                                                                        .concat(phrases.slice(index + 1, phrases.length)))
                                                                }}
                                                            >
                                                                Удалить
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Нет</p>
                                        )}
                                        <Row>
                                            <Col>
                                                <Field as="textarea" name="newPhrase" placeholder="Введите фразу..."
                                                       onChange={handlePhraseChange}/>
                                            </Col>
                                            <Col md={3}>
                                                <Button
                                                    className="form-button addPhrase-btn"
                                                    color="info"
                                                    onClick={() => {
                                                        arrayHelpers.push(newPhrase)
                                                        setPhrases(phrases.concat(newPhrase))
                                                    }
                                                    }
                                                >
                                                    Добавить
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                            />
                            <Row>
                                <Col>
                                    <p>Приветствие по умолчанию:</p>
                                </Col>
                                <Col>
                                    <p>
                                        {greeting ? greeting : "нет"}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h3>Изменить текст приветствия:</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Field as="textarea" name="greeting" placeholder="Введите текст приветствия..."
                                           onChange={handleGreetingChange}/>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                )}
            />
            <Row>
                <Col>
                    <Button onClick={handleSaveDialogsSettings} color="info" className="form-button">Сохранить</Button>
                </Col>
                <Col>
                    <Button onClick={handleHideSettings} color="info"
                            className="form-button float-right">Закрыть</Button>
                </Col>
            </Row>
        </ReactModal>
    )
}

export {DialogsSettings}
