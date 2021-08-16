import React from 'react'
import { Button } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { logOut } from '../redux/auth/sagas/actionCreator'
import { setTokenNotValid } from '../redux/main/sagas/actionCreator'

const iconLogOut = <FontAwesomeIcon icon={faSignOutAlt} />

export const LogOut = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogOut = (event) => {
        dispatch(logOut())
        dispatch(setTokenNotValid())
        history.push('/')
    }
    return (
        <Button
            className='logout-btn form-button float-right'
            color='danger'
            outline
            onClick={handleLogOut}
        >
            Выйти<i className='btn-icon'>{iconLogOut}</i>
        </Button>
    )
}
