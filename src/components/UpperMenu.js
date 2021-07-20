import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {LogOut} from "./LogOut";
import {ProfileSettings} from "./ProfileSettings";
import {fetchProfileDataRequest, showSettings} from "../redux/profileSettings/actionCreator";

export const UpperMenu = () => {

    const operatorEmail = useSelector((state) => state.auth.email)
    const isShowSettings = useSelector((state) => state.profileSettings.isShowSettings)
    const fetchedDialogs = useSelector((state) => state.fetchDialogs.fetchedDialogs)
    const profileData = useSelector((state) => state.profileSettings.profileData)

    const dispatch = useDispatch()

    const [avatar, setAvatar] = useState('')

    const queuedDialogsQuantity = fetchedDialogs.filter(dialog => dialog.data.status === 'queued').length
    const operatorID = operatorEmail.split('.')[0]

    const handleShowSettings = event => {
        dispatch(showSettings())
        dispatch(fetchProfileDataRequest(operatorID))
    }

    useEffect(() => {

        console.log(profileData)
        if (profileData && Object.keys(profileData).length) {
            setAvatar(profileData.data.avatar)
        } else {
            dispatch(fetchProfileDataRequest(operatorID))
        }
    }, [profileData])

    return (
        <Container className="upper-menu">
            <Row>
                <Col md={3}>
                    <h1>ChatApp</h1>
                </Col>
                <Col md={2}>
                    <img alt="avatar"
                         src={avatar}
                         style={{
                             height: "80px",
                             width: "80px",
                             objectFit: "cover",
                             borderRadius: "50%"
                         }}/>
                </Col>
                <Col md={4}>
                    <Row>
                        <h3>{operatorEmail}</h3>
                    </Row>
                    <Row>
                        Количество диалогов в очереди: {queuedDialogsQuantity}
                    </Row>
                </Col>
                <Col md={3}>
                    <Button className="profSettings-btn" onClick={handleShowSettings}>Настройки профиля</Button>
                    <LogOut/>
                </Col>
            </Row>
            <ProfileSettings isShowSettings={isShowSettings}/>
        </Container>
    )
}
