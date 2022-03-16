import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
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
      <NavBar setFormOpen={handleCreateFormOpen} />
      <Container className='main'>
        <EventDashboard
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectEvent={handleSelectEvent}
          selectedEvent={selectedEvent}
        />
      </Container>
    </>
  );
}

export default App;
