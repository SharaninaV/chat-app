import React from "react";
import {Button, ListGroup} from "react-bootstrap";
import {useSelector} from "react-redux";
import {SaveButton} from "./SaveButton";
import moment from 'moment'
import 'moment/locale/ru'

const ActiveDialogs = () => {

    const dialogs = useSelector((state) => state.searchInUsers.usersFound)
    const activeDialogs = dialogs.filter(dialog => dialog.data.status === 'active')

    return(
        <ListGroup>
            {activeDialogs.length > 0 ?
                (activeDialogs.map(dialog => (
                        <ListGroup.Item action>
                            <h5>{dialog.key}</h5>
                            ({moment(dialog.data.latestActivity).locale('ru').format('LLL')})
                            <SaveButton dialog={dialog} />
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>
                        Диалогов не найдено
                    </ListGroup.Item>
                )}
        </ListGroup>
    )
}

export {ActiveDialogs}