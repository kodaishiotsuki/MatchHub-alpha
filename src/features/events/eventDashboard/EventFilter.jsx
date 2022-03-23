import React from "react";
import { Header, Menu } from "semantic-ui-react";

export default function EventFilter({ predicate, setPredicate, loading }) {
  return (
    <>
      <Menu vertical size='large' style={{ width: "100%" }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item
          content='All Companies'
          active={predicate.get("filter") === "all"}
          onClick={() => setPredicate("filter", "all")}
          disabled={loading}
        />
        <Menu.Item
          content='My company'
          active={predicate.get("filter") === "isHosting"}
          onClick={() => setPredicate("filter", "isHosting")}
          disabled={loading}
        />
      </Menu>

      <Menu vertical size='large' style={{ width: "100%" }}>
        <Header icon='search' attached color='teal' content='Select career' />
        <Menu.Item
          content='エンジニア'
          active={predicate.get("filter") === "engineer"}
          onClick={() => setPredicate("filter", "engineer")}
          disabled={loading}
        />
        <Menu.Item
          content='デザイナー'
          active={predicate.get("filter") === "designer"}
          onClick={() => setPredicate("filter", "designer")}
          disabled={loading}
        />
      </Menu>
      {/* <Button content='エンジニア' /> */}
      {/* <Header icon='calendar' attached color='teal' content='Select date' />
      <Calender
        onChange={(date) => setPredicate("startDate", date)}
        value={predicate.get("startDate") || new Date()}
        tileDisabled={() => loading}
      /> */}
    </>
  );
}
