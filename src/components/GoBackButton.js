import React from 'react'
import { Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'

export const GoBackButton = () => {
    const history = useHistory()

    const handleGoBack = (event) => {
        history.push('/main')
    }

    return (
        <Button
            onClick={handleGoBack}
            outline
            className="form-button float-right goback-btn"
        >
            Назад
        </Button>
    )
}
