import React from 'react'
import { Button } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { fetchDialogsRequest } from '../redux/dialogs/actionCreator'
import { saveDialogRequest } from '../redux/saveDialog/actionCreator'

const iconSave = <FontAwesomeIcon icon={faSave} />

export const SaveDialogButton = (props) => {
    const dispatch = useDispatch()

    const handleSave = (event) => {
        dispatch(saveDialogRequest(props.dialog.key))
        dispatch(fetchDialogsRequest())
        event.stopPropagation()
    }

    return (
        <>
            {props.dialog.data.saved ? (
                <Button
                    disabled
                    color='success'
                    className='form-button enter-btn float-right'
                >
                    {iconSave}
                </Button>
            ) : (
                <Button
                    onClick={handleSave}
                    className='form-button save-btn float-right'
                    outline
                >
                    {iconSave}
                </Button>
            )}
        </>
    )
}
