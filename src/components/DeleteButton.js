import React from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { deleteDialogRequest } from '../redux/deleteDialog/actionCreator'
import { fetchDialogsRequest } from '../redux/dialogs/actionCreator'

const iconDelete = <FontAwesomeIcon icon={faTrashAlt} />

export const DeleteButton = (props) => {
    const dispatch = useDispatch()
    const handleDelete = (event) => {
        dispatch(deleteDialogRequest(props.dialog.key))
        dispatch(fetchDialogsRequest())
        event.stopPropagation()
    }

    return (
        <Button
            className='form-button delete-btn float-right'
            outline
            onClick={handleDelete}
        >
            {iconDelete}
        </Button>
    )
}
