import React from "react";
import {ListGroup} from "react-bootstrap";
import {useSelector} from "react-redux";
import moment from 'moment'
import 'moment/locale/ru'

const SavedDialogs = () => {

    const dialogs = useSelector((state) => state.fetchDialogs.fetchedDialogs)
    const savedDialogs = dialogs.filter(dialog => dialog.data.saved === true)

    return(
        <ListGroup>
            {savedDialogs.length > 0 ?
                (savedDialogs.map(dialog => (
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

export {SavedDialogs}