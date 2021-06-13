import React from "react";
import {ListGroup} from "react-bootstrap";
import {useSelector} from "react-redux";

const ActiveDialogs = () => {

    const dialogs = useSelector((state) => state.searchInUsers.usersFound)


    return(
        <ListGroup>
            {dialogs.length > 0 ?
                (dialogs.map(dialog => (
                        <ListGroup.Item action>
                            {dialog}
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