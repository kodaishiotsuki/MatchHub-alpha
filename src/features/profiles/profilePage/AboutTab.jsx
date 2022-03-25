import React, { useState } from "react";
import { Button, Grid, Header, Image, Tab } from "semantic-ui-react";
// import { format } from "date-fns";
import ProfileForm from "./ProfileForm";

export default function AboutTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={`About ${profile.displayName}`}
          />

          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated='right'
              basic
              content={editMode ? "Cancel" : "Edit"}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileForm profile={profile} />
          ) : (
            <>
              <div style={{ marginBottom: 10 }}>
                {/* <strong>
                  Member since:{format(profile.createdAt, "yyyy/MM/dd")}
                </strong> */}
                <div>{profile.description || null}</div>
                <div>
                  <a href={profile.meetyURL}>
                    <Image
                      centered
                      src={"/assets/metty.png"}
                      style={{
                        width: "50%",
                        maxHeight: "150px",
                        marginTop: 15,
                      }}
                    />
                  </a>
                  <h3 style={{ textAlign: "center" }}>
                    <i className='hand point up outline icon' />
                    Go to the metty
                    <i className='hand point up outline icon' />
                  </h3>
                </div>
              </div>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
