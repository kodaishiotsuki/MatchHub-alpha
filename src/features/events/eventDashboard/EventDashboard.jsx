import React, { useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilter from "./EventFilter";
import {
  fetchEventsFromFirestore,
  listenToEventsFromFirestore,
} from "../../../app/firestore/firestoreService";
import { fetchEvents, listenToEvents } from "../eventActions";
import { useDispatch } from "react-redux";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import EventsFeed from "./EventsFeed";

const EventDashboard = () => {
  const limit = 1;
  const dispatch = useDispatch();
  const { events,moreEvents } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const { authenticated } = useSelector((state) => state.auth);
  const [lastDocSnapshot, setLastDocSnapShot] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  //フィルター機能初期設定
  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["filter", "all"],
    ])
  );

  //フィルター機能イベント
  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  //DBから取得
  // useFirestoreCollection({
  //   query: () => fetchEventsFromFirestore(predicate), //eventsコレクション
  //   data: (events) => dispatch(listenToEvents(events)),
  //   deps: [dispatch, predicate],
  // });

  //ページング
  useEffect(() => {
    setLoadingInitial(true);
    dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
      setLastDocSnapShot(lastVisible);
      setLoadingInitial(false);
    });
  }, [dispatch, predicate]);
  //ボタンクリック（ページング）
  function handleFetchNextEvents() {
    dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then(
      (lastVisible) => {
        setLastDocSnapShot(lastVisible);
      }
    );
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInitial && (
          <>
            <EventListItemPlaceholder />
          </>
        )}
        <EventList events={events} />
        <Button
          loading={loading}
          disabled={!moreEvents} //最後まで行くとdisabled
          onClick={handleFetchNextEvents}
          color='green'
          content='More...'
          floated='right'
        />
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
