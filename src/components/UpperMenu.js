import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {LogOut} from "./LogOut";
import {ProfileSettings} from "./ProfileSettings";
import {fetchProfileDataRequest, showSettings} from "../redux/profileSettings/actionCreator";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const iconEdit = <FontAwesomeIcon icon={faUserEdit}/>

export const UpperMenu = () => {

    const operatorEmail = useSelector((state) => state.auth.email)
    const isShowSettings = useSelector((state) => state.profileSettings.isShowSettings)
    const fetchedDialogs = useSelector((state) => state.fetchDialogs.fetchedDialogs)
    const profileData = useSelector((state) => state.profileSettings.profileData)

    const dispatch = useDispatch()

    const [avatar, setAvatar] = useState('')
    const [operatorName, setOperatorName] = useState('Оператор')

    const queuedDialogsQuantity = fetchedDialogs.filter(dialog => dialog.data.status === 'queued').length
    const operatorID = window.btoa(operatorEmail)

    const handleShowSettings = event => {
        dispatch(showSettings())
        dispatch(fetchProfileDataRequest(operatorID))
    }

    useEffect(() => {
        if (profileData && Object.keys(profileData).length) {
            setAvatar(profileData.data.avatar)
            if (profileData.data.name && profileData.data.name.length) {
                setOperatorName(profileData.data.name)
            } else {
                dispatch(fetchProfileDataRequest(operatorID))
            }
        }
    }, [profileData])

    return (
        <Container className="upper-menu">
            <Row className="justify-content-around">
                <Col md={2}>
                    <h1 className="logo">ChatApp</h1>
                </Col>
                <Col md={1}>
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
                    <h3>{operatorName}</h3>
                    <Button outline className="profSettings-btn form-button" onClick={handleShowSettings}>{iconEdit}</Button>
                </Col>
                <Col md={3}>
                    Количество диалогов в очереди: {queuedDialogsQuantity}
                </Col>
                <Col md={2}>
                    <LogOut/>
                </Col>
            </Row>
            <ProfileSettings isShowSettings={isShowSettings}/>
        </Container>
    )
}
