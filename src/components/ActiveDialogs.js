import React, { useMemo, useState } from 'react'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/ru'
import InfiniteScroll from 'react-infinite-scroller'
import { useHistory } from 'react-router-dom'
import { SaveDialogButton } from './SaveDialogButton'
import { operatorEmailSelector } from '../redux/auth/selectors'
import { fetchedDialogsSelector } from '../redux/dialogs/selectors'

export const ActiveDialogs = () => {
    const operatorEmail = useSelector(operatorEmailSelector)
    const fetchedDialogs = useSelector(fetchedDialogsSelector)

    const [items, setItems] = useState([])
    const [hasMoreItems, setHasMoreItems] = useState(true)

    const operatorID = window.btoa(operatorEmail)

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

    const activeDialogs = useMemo(() => {
        return fetchedDialogs
            .filter(
                (dialog) =>
                    dialog.data.status === 'active' &&
                    dialog.data.operatorID === operatorID
            )
            .map((dialog) => ({
                dialog: dialog,
                latestActivity: moment(dialog.data.latestActivity).calendar(),
                lastMessage: getLastMessage(dialog),
            }))
    }, [fetchedDialogs])

    const history = useHistory()

    const handleShowDialog = (event) => {
        history.push('/current/:' + event.currentTarget.id)
    }

    const loadItems = (page) => {
        setTimeout(() => {
            const coef = (page - 1) * 4
            setItems(items.concat(activeDialogs.slice(coef, coef + 4)))
            if (activeDialogs.length <= coef + 4) {
                setHasMoreItems(false)
            }
        }, 1000)
    }

    return (
        <ListGroup className="dialogs">
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
                          <ListGroupItem
                              action
                              onClick={handleShowDialog}
                              className="list-item"
                              id={dialog.dialog.key}
                          >
                              <Container>
                                  <Row>
                                      <Col>
                                          {dialog.dialog.data.clientName}
                                          <br />
                                          {dialog.latestActivity}
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
                                          <SaveDialogButton
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
        </ListGroup>
    )
}
