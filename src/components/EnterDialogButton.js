import React, {useEffect} from "react";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchDialogsRequest} from "../redux/dialogs/actionCreator";
import {enterDialogRequest} from "../redux/enterDialog/actionCreator";
import {sendMessageRequest} from "../redux/sendMessage/actionCreator";
import {useHistory} from "react-router-dom";

export const EnterDialogButton = ({dialog}) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const operatorEmail = useSelector((state) => state.auth.email)
    const dialogsSettings = useSelector((state) => state.dialogsSettings.dialogsSettings)

    const operatorID = window.btoa(operatorEmail)

    window.OneSignal = window.OneSignal || [];
    const OneSignal = window.OneSignal;

    useEffect(() => {
        OneSignal.push(() => {
            OneSignal.init({
                appId: 'b11b07e3-1352-4f27-9d6b-3b655859ec81'
            })
        })
    }, [])

    const sendNotification = (data) => {
        const headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic MGViNzY3ZTctNmIxZi00YWE1LTkyYTQtYjg5YmRhOGVlYTVk"
        };

        const options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };

        const https = require('https');
        const req = https.request(options, function(res) {
            res.on('data', function(data) {
                console.log("Response:");
                console.log(JSON.parse(data));
            });
        });

        req.on('error', function(e) {
            console.log("ERROR:");
            console.log(e);
        });

        req.write(JSON.stringify(data));
        req.end();
    };

    const handleEnterDialog = event => {
        dispatch(enterDialogRequest(dialog.key, operatorID));

        const message = {
            app_id: "b11b07e3-1352-4f27-9d6b-3b655859ec81",
            contents: {en: "Вам ответил оператор"},
                    // include_player_ids: [userId],
                    filters: [
                        {
                            "field": "tag",
                            "key": "dialog",
                            "relation": "=",
                            "value": dialog.key,
                        },
                    ],
        };

        sendNotification(message);

        if (dialogsSettings.data.greeting) {
            const sentMessage = {
                content: dialogsSettings.data.greeting,
                timestamp: Date.now(),
                writtenBy: 'operator'
            }
            dispatch(sendMessageRequest(dialog.key, sentMessage))
        }
        dispatch(fetchDialogsRequest())
        history.push('/current/:' + dialog.key)
    }

    return(
        <Button onClick={handleEnterDialog}>Войти в диалог</Button>
    )
}
