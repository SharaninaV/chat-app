import React from "react";
import {ListGroup} from "react-bootstrap";
import {useSelector} from "react-redux";

const SavedDialogs = () => {

    const dialogs = useSelector((state) => state.searchInUsers.usersFound)
    const savedDialogs = dialogs.filter(dialog => dialog.data.status === 'saved')

    return(
        <ListGroup>
            {savedDialogs.length > 0 ?
                (savedDialogs.map(dialog => (
                        <ListGroup.Item action>
                            {dialog.key}
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

export {SavedDialogs}