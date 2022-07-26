import React, { useEffect } from 'react'
import { Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { fetchDialogsRequest } from '../redux/dialogs/actionCreator'
import { enterDialogRequest } from '../redux/enterDialog/actionCreator'
import { sendMessageRequest } from '../redux/sendMessage/actionCreator'
import { operatorEmailSelector } from '../redux/auth/selectors'
import { dialogSettingsSelector } from '../redux/dialogsSettings/selectors'

const iconEnter = <FontAwesomeIcon icon={faArrowAltCircleRight} />

export const EnterDialogButton = ({ dialog }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const operatorEmail = useSelector(operatorEmailSelector)
    const dialogsSettings = useSelector(dialogSettingsSelector)

    const operatorID = window.btoa(operatorEmail)

    window.OneSignal = window.OneSignal || []
    const OneSignal = window.OneSignal

    useEffect(() => {
        OneSignal.push(() => {
            OneSignal.init({
                appId: 'b11b07e3-1352-4f27-9d6b-3b655859ec81',
            })
        })
    }, [])

    const sendNotification = (data) => {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: process.env.REACT_APP_ONESIGNAL_AUTHORIZATION,
        }

        const options = {
            host: 'onesignal.com',
            port: 443,
            path: '/api/v1/notifications',
            method: 'POST',
            headers: headers,
        }

        const https = require('https')
        const req = https.request(options, function (res) {
            res.on('data', function (data) {
                console.log('Response:')
                console.log(JSON.parse(data))
            })
        })

        req.on('error', function (e) {
            console.log('ERROR:')
            console.log(e)
        })

        req.write(JSON.stringify(data))
        req.end()
    }

    const handleEnterDialog = (event) => {
        dispatch(enterDialogRequest(dialog.key, operatorID))

        const message = {
            app_id: process.env.REACT_APP_ONESIGNAL_APP_ID,
            contents: { en: 'Вам ответил оператор' },
            filters: [
                {
                    field: 'tag',
                    key: 'dialog',
                    relation: '=',
                    value: dialog.key,
                },
            ],
        }

        sendNotification(message)

        if (dialogsSettings.data.greeting) {
            const sentMessage = {
                content: dialogsSettings.data.greeting,
                timestamp: Date.now(),
                writtenBy: 'operator',
            }
            dispatch(sendMessageRequest(dialog.key, sentMessage))
        }
        dispatch(fetchDialogsRequest())
        history.push('/current/:' + dialog.key)
    }

    return (
        <Button
            onClick={handleEnterDialog}
            className="form-button enter-btn float-right"
            outline
        >
            Войти<i className="btn-icon">{iconEnter}</i>
        </Button>
    )
}
