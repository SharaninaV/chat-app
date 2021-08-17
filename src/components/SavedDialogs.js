import React, { useState } from 'react'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/ru'
import InfiniteScroll from 'react-infinite-scroller'
import { useHistory } from 'react-router-dom'
import { DeleteButton } from './DeleteButton'

export const SavedDialogs = () => {
    const operatorEmail = useSelector((state) => state.auth.email)
    const fetchedDialogs = useSelector(
        (state) => state.fetchDialogs.fetchedDialogs,
    )

    const [items, setItems] = useState([])
    const [hasMoreItems, setHasMoreItems] = useState(true)

    const operatorID = window.btoa(operatorEmail)
    const savedDialogs = fetchedDialogs.filter(
        (dialog) =>
            dialog.data.saved === true && dialog.data.operatorID === operatorID,
    )

    const history = useHistory()

    const getLastMessage = (dialog) => {
        let lastMessage = { content: '', writtenBy: '' }
        Object.values(dialog.data.messages).forEach((message) => {
            if (message.timestamp === dialog.data.latestActivity) {
                lastMessage.writtenBy = message.writtenBy
                lastMessage.content = message.content
            }
        })
        return lastMessage
    }

    const handleShowDialog = (event) => {
        history.push('/current/:' + event.currentTarget.id)
    }

    const loadItems = (page) => {
        setTimeout(() => {
            const coef = (page - 1) * 4
            setItems(items.concat(savedDialogs.slice(coef, coef + 4)))
            if (savedDialogs.length <= coef + 4) {
                setHasMoreItems(false)
            }
        }, 1000)
    }

    return (
        <ListGroup className='dialogs'>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadItems}
                hasMore={hasMoreItems}
                loader={<div className='loader' key={0}>Загрузка ...</div>}
                useWindow={false}
            >
                {items.length > 0 ? (
                    items.map((dialog) => (
                        <ListGroupItem
                            action
                            onClick={handleShowDialog}
                            id={dialog.key}
                            className='list-item'
                        >
                            <Container>
                                <Row>
                                    <Col>
                                        {dialog.data.clientName}
                                        <br />(
                                        {moment(
                                            dialog.data.latestActivity,
                                        ).calendar()}
                                        )
                                    </Col>
                                    <Col>
                                        {getLastMessage(dialog).writtenBy ===
                                        'operator' ? (
                                            <div>Вы:</div>
                                        ) : (
                                            <div>{dialog.data.clientName}:</div>
                                        )}
                                        <div className='overflow-text'>
                                            {getLastMessage(dialog).content}
                                        </div>
                                    </Col>
                                    <Col md={2}>
                                        <DeleteButton dialog={dialog} />
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroupItem>
                    ))
                ) : ( !hasMoreItems &&
                    <ListGroupItem className='list-item'>
                        Диалогов не найдено
                    </ListGroupItem>
                )}
            </InfiniteScroll>
        </ListGroup>
    )
}
