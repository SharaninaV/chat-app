import React from "react";
import {Container, Tab, Tabs} from "react-bootstrap";
import {ActiveDialogs} from "./ActiveDialogs";
import {SavedDialogs} from "./SavedDialogs";
import {FinishedDialogs} from "./FinishedDialogs";

const Dialogs = () => {

    return (
        <Container>
            <Tabs defaultActiveKey="queued" id="dialogs">
                <Tab eventKey="queued" title="Очередь">

                </Tab>
                <Tab eventKey="active" title="Активные">
                    <ActiveDialogs/>
                </Tab>
                <Tab eventKey="saved" title="Сохраненные">
                    <SavedDialogs/>
                </Tab>
                <Tab eventKey="finished" title="Завершенные">
                    <FinishedDialogs/>
                </Tab>
            </Tabs>

        </Container>
    )
}
export {Dialogs}
