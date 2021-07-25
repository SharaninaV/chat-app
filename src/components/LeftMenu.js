import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {switchActive, switchFinished, switchQueued, switchSaved} from "../redux/leftMenu/actionCreator";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

export const LeftMenu = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const handleSwitchQueued = event => {
        dispatch(switchQueued())
        history.push('/main')
    }
    const handleSwitchActive = event => {
        dispatch(switchActive())
        history.push('/main')
    }
    const handleSwitchFinished = event => {
        dispatch(switchFinished())
        history.push('/main')
    }
    const handleSwitchSaved = event => {
        dispatch(switchSaved())
        history.push('/main')
    }

    return(
        <Container className="left-menu">
            <Row>
                <Col>
                    <Button className="left-menu-btn" onClick={handleSwitchQueued}>
                        Очередь
                    </Button>
                    <Button className="left-menu-btn" onClick={handleSwitchActive}>
                        Активные
                    </Button>
                    <Button className="left-menu-btn" onClick={handleSwitchFinished}>
                        Завершенные
                    </Button>
                    <Button className="left-menu-btn" onClick={handleSwitchSaved}>
                        Сохраненные
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}
