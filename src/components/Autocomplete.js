import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import { Container, Row, Col, Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { addMessage } from '../redux/addMessage/actionCreator'
import { DialogsSettings } from './DialogsSettings'
import { showDialogsSettings } from '../redux/dialogsSettings/actionCreator'
import { operatorEmailSelector } from '../redux/auth/selectors'
import { dialogSettingsSelector } from '../redux/dialogsSettings/selectors'

const iconEdit = <FontAwesomeIcon icon={faEdit} />

export const AutocompleteInput = () => {
    const [value, setValue] = useState('')
    const [items, setItems] = useState([])
    const dispatch = useDispatch()
    const isShowSettings = useSelector(
        (state) => state.dialogsSettings.isShowSettings
    )
    const operatorEmail = useSelector(operatorEmailSelector)
    const dialogsSettings = useSelector(dialogSettingsSelector)

    const operatorID = window.btoa(operatorEmail)

    const handleShowSettings = (event) => {
        dispatch(showDialogsSettings())
    }

    useEffect(() => {
        if (dialogsSettings && Object.keys(dialogsSettings).length) {
            const phrases = dialogsSettings.data.phrases
            if (phrases && phrases.length && phrases !== 'empty') {
                setItems(
                    phrases.map((item) => ({
                        id: phrases.indexOf(item) + 1,
                        label: item,
                    }))
                )
            }
        }
    }, [dialogsSettings])

    return (
        <Container>
            <Row>
                <Col className="autocompleteInput">
                    <Row>
                        <Col md={4}>
                            <p>Шаблоны</p>
                        </Col>
                        <Col>
                            <Button
                                onClick={handleShowSettings}
                                className="form-button template-btn"
                                outline
                            >
                                {iconEdit}
                            </Button>
                        </Col>
                    </Row>
                    <Autocomplete
                        items={items}
                        inputProps={{
                            id: 'messages-addMessage',
                            className: 'form-control addMessage',
                        }}
                        shouldItemRender={(item, value) =>
                            item.label
                                .toLowerCase()
                                .indexOf(value.toLowerCase()) > -1
                        }
                        getItemValue={(item) => item.label}
                        renderItem={(item, highlighted) => (
                            <div
                                key={item.id}
                                style={{
                                    backgroundColor: highlighted
                                        ? '#028DAE'
                                        : 'transparent',
                                    width: '300px',
                                    border: '2px solid #028DAE',
                                }}
                            >
                                {item.label}
                            </div>
                        )}
                        renderMenu={(items, value) => (
                            <div className="menu">
                                {value === '' ? (
                                    <div className="item">
                                        Поиск в готовых
                                        <br />
                                        сообщениях...
                                    </div>
                                ) : items.length === 0 ? (
                                    <div className="item">
                                        Совпадений не найдено
                                    </div>
                                ) : (
                                    items
                                )}
                            </div>
                        )}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onSelect={(value) => {
                            dispatch(addMessage(value))
                            setValue('')
                        }}
                    />
                </Col>
            </Row>
            <DialogsSettings
                isShowSettings={isShowSettings}
                operatorID={operatorID}
            />
        </Container>
    )
}
