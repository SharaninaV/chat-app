import React, {useState} from "react";
import Autocomplete from "react-autocomplete"
import {Container, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {autocompleteAddMessage} from "../redux/autocomplete/actionCreator";

export const AutocompleteInput = () => {

    const [value, setValue] = useState('')

    const dispatch = useDispatch()

    return (
        <Container>
            <Row>
                <p>Выберите из готовых сообщений</p>
            </Row>
            <Row>
                <Autocomplete
                    items={[
                        {id: '1', label: 'Здравствуйте! Сейчас помогу.'},
                        {id: '2', label: 'Попробуйте его включить в источник питания.'},
                        {id: '3', label: 'Я вам отвечу через несколько часов.'},
                    ]}
                    inputProps={{id: 'messages-autocomplete', className: 'form-control autocomplete'}}
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
                        dispatch(autocompleteAddMessage(value))
                        setValue('')
                    }}
                />
            </Row>
        </Container>
    )
}