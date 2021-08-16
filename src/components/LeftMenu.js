import React from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import {
    switchActive,
    switchFinished,
    switchQueued,
    switchSaved,
} from '../redux/leftMenu/actionCreator'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faClock,
    faDotCircle,
    faSave,
    faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'

const iconQueue = <FontAwesomeIcon icon={faClock} />
const iconActive = <FontAwesomeIcon icon={faDotCircle} />
const iconSaved = <FontAwesomeIcon icon={faSave} />
const iconFinished = <FontAwesomeIcon icon={faCheckCircle} />

export const LeftMenu = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSwitchQueued = (event) => {
        dispatch(switchQueued())
        history.push('/main')
    }
    const handleSwitchActive = (event) => {
        dispatch(switchActive())
        history.push('/main')
    }
    const handleSwitchFinished = (event) => {
        dispatch(switchFinished())
        history.push('/main')
    }
    const handleSwitchSaved = (event) => {
        dispatch(switchSaved())
        history.push('/main')
    }

    return (
        <Container className='left-menu'>
            <Row>
                <Col>
                    <Button
                        className='left-menu-btn form-button'
                        outline
                        onClick={handleSwitchQueued}
                    >
                        Очередь
                        <i className='btn-icon'>{iconQueue}</i>
                    </Button>
                    <Button
                        className='left-menu-btn form-button'
                        outline
                        onClick={handleSwitchActive}
                    >
                        Активные
                        <i className='btn-icon'>{iconActive}</i>
                    </Button>
                    <Button
                        className='left-menu-btn form-button'
                        outline
                        onClick={handleSwitchFinished}
                    >
                        Завершенные
                        <i className='btn-icon'>{iconFinished}</i>
                    </Button>
                    <Button
                        className='left-menu-btn form-button'
                        outline
                        onClick={handleSwitchSaved}
                    >
                        Сохраненные
                        <i className='btn-icon'>{iconSaved}</i>
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}
