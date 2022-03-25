import React from "react";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Item,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";

export default function ProfileHeader({ profile, isCurrentUser }) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={7}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile.photoURL || "/assets/user.png"}
              />
              <Item.Content verticalAlign='middle'>
                <Header
                  as='h1'
                  style={{ display: "block", marginBottom: 10 }}
                  content={profile.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={5} verticalAlign='middle'>
          <div>
            <a href={profile.twitterURL}>
              <Icon size='huge' color='teal' name='twitter' />
            </a>
            <a href={profile.facebookURL}>
              <Icon size='huge' color='teal' name='facebook square' />
            </a>
            <a href={profile.gitHubURL}>
              <Icon size='huge' color='teal' name='github' />
            </a>
            <a href={profile.noteURL}>
              <Icon size='huge' color='teal' name='sticky note outline' />
            </a>
          </div>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label='Followers' value={10} />
            <Statistic label='Following' value={5} />
          </Statistic.Group>
          {!isCurrentUser && (
            <>
              <Divider />
              <Reveal animated='move'>
                <Reveal.Content visible style={{ width: "100%" }}>
                  <Button fluid color='teal' content='Following' />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: "100%" }}>
                  <Button basic color='red' content='Unfollow' />
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
