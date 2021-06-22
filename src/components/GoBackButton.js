import React from "react";
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";

export const GoBackButton = () => {

    const history = useHistory()
    const handleGoBack = event => {
        history.push('/main')
    }

    return(
        <Button onClick={handleGoBack}>Назад</Button>
    )
}