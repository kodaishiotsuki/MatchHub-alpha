import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";
import HomePage from "../../features/Home/HomePage";
import NavBar from "../../features/nav/NavBar";
import "./styles.css";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  //イベントリスト詳細ボタン押した時の関数
  function handleSelectEvent(event) {
    setSelectedEvent(event);
    setFormOpen(true);
  }
  //新しいイベント作成時の関数
  function handleCreateFormOpen() {
    setSelectedEvent(null);
    setFormOpen(true);
  }
  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        //Homeページでナビゲーションバーを非表示にする
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar setFormOpen={handleCreateFormOpen} />
            <Container className='main'>
              <Route exact path='/events' component={EventDashboard} />
              <Route path='/events/:id' component={EventDetailedPage} />
              <Route path='/createEvent' component={EventForm} />
              {/* <EventDashboard
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectEvent={handleSelectEvent}
          selectedEvent={selectedEvent}
        /> */}
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
