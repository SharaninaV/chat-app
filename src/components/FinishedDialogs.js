import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import moment from 'moment'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import PrettyRating from 'pretty-rating-react'
import { useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import { operatorEmailSelector } from '../redux/auth/selectors'
import { fetchedDialogsSelector } from '../redux/dialogs/selectors'

export const FinishedDialogs = () => {
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

    const finishedDialogs = useMemo(() => {
        return fetchedDialogs
            .filter(
                (dialog) =>
                    dialog.data.status === 'finished' &&
                    dialog.data.operatorID === operatorID
            )
            .map((dialog) => ({
                dialog: dialog,
                latestActivity: moment(dialog.data.latestActivity).calendar(),
                lastMessage: getLastMessage(dialog)
            }))
    }, [fetchedDialogs])

    const history = useHistory()

    const handleShowDialog = (event) => {
        history.push('/current/:' + event.currentTarget.id)
    }

    const loadItems = (page) => {
        setTimeout(() => {
            const coef = (page - 1) * 6
            setItems(items.concat(finishedDialogs.slice(coef, coef + 6)))
            if (finishedDialogs.length <= coef + 6) {
                setHasMoreItems(false)
            }
        }, 1000)
    }

    const icons = {
        star: {
            complete: faStar,
            empty: farStar,
        },
    }
    const colors = {
        star: ['#d9ad26', '#434b4d'],
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
                              id={dialog.dialog.key}
                              className="list-item"
                          >
                              <Container>
                                  <Row>
                                      <Col>
                                          {dialog.dialog.data.clientName}
                                          <br />(
                                          {dialog.latestActivity}
                                          )
                                      </Col>
                                      <Col>
                                          {dialog.lastMessage.writtenBy ===
                                          'operator' ? (
                                              <div>Вы:</div>
                                          ) : (
                                              <div>
                                                  {dialog.dialog.data.clientName}:
                                              </div>
                                          )}
                                          <div className="overflow-text">
                                              {dialog.lastMessage.content}
                                          </div>
                                      </Col>
                                      <Col md={2}>
                                          <PrettyRating
                                              value={dialog.dialog.data.rating}
                                              icons={icons.star}
                                              colors={colors.star}
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
