import React from "react";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";
import HomePage from "../../features/Home/HomePage";
import NavBar from "../../features/nav/NavBar";
import "./styles.css";

function App() {
  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        //Homeページでナビゲーションバーを非表示にする
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Route exact path='/events' component={EventDashboard} />
              <Route path='/events/:id' component={EventDetailedPage} />
              {/* 同じコンポーネントを開くためのroute */}
              <Route
                path={["/createEvent", "manage/:id"]}
                component={EventForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
