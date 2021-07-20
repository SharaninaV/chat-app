import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {switchActive, switchFinished, switchQueued, switchSaved} from "../redux/leftMenu/actionCreator";
import {useDispatch} from "react-redux";

export const LeftMenu = () => {

    const dispatch = useDispatch()

    const handleSwitchQueued = event => {
        dispatch(switchQueued())
    }
    const handleSwitchActive = event => {
        dispatch(switchActive())
    }
    const handleSwitchFinished = event => {
        dispatch(switchFinished())
    }
    const handleSwitchSaved = event => {
        dispatch(switchSaved())
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
