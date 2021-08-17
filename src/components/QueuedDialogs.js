import React, { useState } from 'react'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroller'
import { useSelector } from 'react-redux'
import { EnterDialogButton } from './EnterDialogButton'

export const QueuedDialogs = () => {
    const fetchedDialogs = useSelector(
        (state) => state.fetchDialogs.fetchedDialogs,
    )

    const [items, setItems] = useState([])
    const [hasMoreItems, setHasMoreItems] = useState(true)

    const queuedDialogs = fetchedDialogs.filter(
        (dialog) => dialog.data.status === 'queued',
    )

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

    const loadItems = (page) => {
        setTimeout(() => {
            const coef = (page - 1) * 4
            console.log('queueddialogs', queuedDialogs)
            console.log('items', items)
            setItems(items.concat(queuedDialogs.slice(coef, coef + 4)))
            console.log('items 2', items)
            if (queuedDialogs.length <= coef + 4) {
                setHasMoreItems(false)
            }
        }, 1000)
    }

    return (
        <ListGroup className='dialogs'>
            {queuedDialogs.length &&
            <InfiniteScroll
                pageStart={0}
                loadMore={loadItems}
                hasMore={hasMoreItems}
                loader={<div className='loader' key={0}>Загрузка ...</div>}
                useWindow={false}
            >
                {items.length > 0 ? (
                    items.map((dialog) => (
                        <ListGroupItem className='list-item'>
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
                                        <EnterDialogButton dialog={dialog} />
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroupItem>
                    ))
                ) : (!hasMoreItems &&
                    <ListGroupItem className='list-item'>
                        Диалогов не найдено
                    </ListGroupItem>
                )}
            </InfiniteScroll>
            }
        </ListGroup>
    )
}
