import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilter from "./EventFilter";
import { listenToEventsFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToEvents } from "../eventActions";
import { useDispatch } from "react-redux";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import EventsFeed from "./EventsFeed";

const EventDashboard = () => {
  //dispatch(listenToEvents)
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const { authenticated } = useSelector((state) => state.auth);

  //フィルター機能
  const [predicate, setPredicate] = useState(
    new Map([
      // ["startDate", new Date()],
      ["filter", "all"],
    ])
  );
  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  //DBから取得
  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate), //eventsコレクション
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate],
  });

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
        {authenticated && <EventsFeed />}
        <EventFilter
          predicate={predicate}
          setPredicate={handleSetPredicate}
          loading={loading}
        />
      </Grid.Column>
    </Grid>
  );
};
export default EventDashboard;
