import React from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilter from "./EventFilter";

const EventDashboard = () => {
  const { events } = useSelector((state) => state.event);

  //ローディング
  const { loading } = useSelector((state) => state.async);
  

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <EventListItemPlaceholder />
          </>
        )}
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilter />
      </Grid.Column>
    </Grid>
  );
};
export default EventDashboard;
