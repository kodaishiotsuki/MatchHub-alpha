import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { sampleData } from "../../../app/api/sampleData";

const EventDashboard = () => {
  const [events, setEvents] = useState(sampleData);

  // //フォームが送信(新しいイベント作成)された時に呼び出す関数
  // function handleCreateEvent(event) {
  //   setEvents([...events, event]);
  // }

  // //イベント内容更新する関数
  // function handleUpdateEvent(updatedEvent) {
  //   setEvents(
  //     events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
  //   );
  // }

  //イベント内容削除する関数
  function handleDeleteEvent(eventId) {
    setEvents(events.filter((evt) => evt.id !== eventId));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          deleteEvent={handleDeleteEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  );
};
export default EventDashboard;
