import React from "react";
import { Header, Menu } from "semantic-ui-react";
import Calender from "react-calendar";

export default function EventFilter() {
  return (
    <>
      <Menu vertical size='large' style={{ width: "100%" }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item content='All Events' />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header icon='calendar' attached color='teal' content='Select date' />
      <Calender />
    </>
  );
}
