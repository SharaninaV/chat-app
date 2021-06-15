import React from "react";
import {ListGroup} from "react-bootstrap";
import moment from "moment";
import {SaveButton} from "./SaveButton";
import {useSelector} from "react-redux";

const QueuedDialogs = () => {

    const queuedDialogs = useSelector((state) => state.fetchDialogs.fetchedDialogs)
        .filter(dialog => dialog.data.status === 'queued')

    return(
        <ListGroup>
            {queuedDialogs.length > 0 ?
                (queuedDialogs.map(dialog => (
                        <ListGroup.Item action>
                            {dialog.key}
                            ({moment(dialog.data.latestActivity).locale('ru').format('LLL')})
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

export {QueuedDialogs}