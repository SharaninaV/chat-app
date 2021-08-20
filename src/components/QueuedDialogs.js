import React, { useEffect, useMemo, useState } from 'react'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroller'
import { useSelector } from 'react-redux'
import { EnterDialogButton } from './EnterDialogButton'
import { fetchedDialogsSelector } from '../redux/dialogs/selectors'

export const QueuedDialogs = () => {
    const fetchedDialogs = useSelector(fetchedDialogsSelector)

    const [items, setItems] = useState([])
    const [hasMoreItems, setHasMoreItems] = useState(true)

    const getLastMessage = (dialog) => {
        return Object.values(dialog.data.messages).find(
            (item) => item.timestamp === dialog.data.latestActivity
        )
    }

    const queuedDialogs = useMemo(() => {
        return fetchedDialogs
            .filter((dialog) => dialog.data.status === 'queued')
            .map((dialog) => ({
                dialog: dialog,
                latestActivity: moment(dialog.data.latestActivity).calendar(),
                lastMessage: getLastMessage(dialog),
            }))
    }, [fetchedDialogs])


    const loadItems = (page) => {
        setTimeout(() => {
            const coef = (page - 1) * 4
            setItems(items.concat(queuedDialogs.slice(coef, coef + 4)))
            if (queuedDialogs.length <= coef + 4) {
                setHasMoreItems(false)
            }
        }, 1000)
    }

    return (
        <ListGroup className="dialogs">
            {queuedDialogs.length && (
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadItems}
                    hasMore={hasMoreItems}
                    loader={
                        <div className="loader" key={0}>
                            Загрузка ...
                        </div>
                    }
                    useWindow={false}
                >
                    {!!items.length
                        ? items.map((dialog) => (
                              <ListGroupItem className="list-item" id={dialog.dialog.key}>
                                  <Container>
                                      <Row>
                                          <Col>
                                              {dialog.dialog.data.clientName}
                                              <br />({dialog.latestActivity})
                                          </Col>
                                          <Col>
                                              {dialog.lastMessage.writtenBy ===
                                              'operator' ? (
                                                  <div>Вы:</div>
                                              ) : (
                                                  <div>
                                                      {
                                                          dialog.dialog.data
                                                              .clientName
                                                      }
                                                      :
                                                  </div>
                                              )}
                                              <div className="overflow-text">
                                                  {dialog.lastMessage.content}
                                              </div>
                                          </Col>
                                          <Col md={2}>
                                              <EnterDialogButton
                                                  dialog={dialog.dialog}
                                              />
                                          </Col>
                                      </Row>
                                  </Container>
                              </ListGroupItem>
                          ))
                        : !hasMoreItems && (
                              <ListGroupItem className="list-item">
                                  Диалогов не найдено
                              </ListGroupItem>
                          )}
                </InfiniteScroll>
            )}
        </ListGroup>
    )
}
