import React, {useState} from "react";
import Autocomplete from "react-autocomplete"
import {Container, Row, Col, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addMessage} from "../redux/addMessage/actionCreator";
import {DialogsSettings} from "./DialogsSettings";
import {showDialogsSettings} from "../redux/dialogsSettings/actionCreator";

export const AutocompleteInput = () => {

    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const isShowSettings = useSelector((state) => state.dialogsSettings.isShowSettings)
    const operatorEmail = useSelector((state) => state.auth.email)

    const operatorID = operatorEmail.split(".")[0]

    const handleShowSettings = event => {
        dispatch(showDialogsSettings())
    }

    return (
        <Container>
            <Row>
                <p>Выберите из готовых сообщений</p>
            </Row>
            <Row>
                <Col>
                <Autocomplete
                    items={[
                        {id: '1', label: 'Здравствуйте! Сейчас помогу.'},
                        {id: '2', label: 'Попробуйте его включить в источник питания.'},
                        {id: '3', label: 'Я вам отвечу через несколько часов.'},
                    ]}
                    inputProps={{id: 'messages-addMessage', className: 'form-control addMessage'}}
                    shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => item.label}
                    renderItem={(item, highlighted) =>
                        <div
                            key={item.id}
                            style={{backgroundColor: highlighted ? 'turquoise' : 'transparent'}}
                        >
                            {item.label}
                        </div>
                    }
                    renderMenu={(items, value) => (
                        <div className="menu">
                            {value === '' ? (
                                <div className="item">Начните вводить сообщение...</div>
                            ) : items.length === 0 ? (
                                <div className="item">Совпадений не найдено</div>
                            ) : items}
                        </div>
                    )}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onSelect={value => {
                        dispatch(addMessage(value))
                        setValue('')
                    }}
                />
                </Col>
                <Col>
                    <Button onClick={handleShowSettings}>Настройки</Button>
                </Col>
            </Row>
            <DialogsSettings isShowSettings={isShowSettings} operatorID={operatorID}/>
        </Container>
    )
}