import React from "react";
import {Button, ListGroup} from "react-bootstrap";
import {useSelector} from "react-redux";
import {SaveButton} from "./SaveButton";

const ActiveDialogs = () => {

    const dialogs = useSelector((state) => state.searchInUsers.usersFound)
    const activeDialogs = dialogs.filter(dialog => dialog.data.status === 'active')

    return(
        <ListGroup>
            {activeDialogs.length > 0 ?
                (activeDialogs.map(dialog => (
                        <ListGroup.Item action>
                            {dialog.key}
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