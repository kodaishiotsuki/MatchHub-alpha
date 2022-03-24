import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Comment, Header, Segment } from "semantic-ui-react";
import { firebaseObjectToArray } from "../../../app/firestore/firebaseService";
import { getEventChatRef } from "../../../app/firestore/firebaseService";
import { listenToEventChat } from "../eventActions";
import EventDetailedChatForm from "./EventDetailedChatForm";
import { formatDistance } from "date-fns";
import { CLEAR_COMMENTS } from "../eventConstants";

export default function EventDetailedChat({ eventId }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.event); //引数はrootReducerで確認
  const [showReplyForm, setShowReplyForm] = useState(false);

  useEffect(() => {
    getEventChatRef(eventId).on("value", (snapshot) => {
      if (!snapshot.exists()) return;
      dispatch(
        listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse())
      );
      return () => {
        dispatch({ type: CLEAR_COMMENTS });
        getEventChatRef().off();
      };
    });
  }, [eventId, dispatch]);

  return (
    <>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: "none" }}
      >
        <Header>Chat about this company</Header>
      </Segment>

      <Segment attached>
        <EventDetailedChatForm eventId={eventId} />
        <Comment.Group>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.photoURL || "/assets/user.png"} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistance(comment.date, new Date())}</div>
                </Comment.Metadata>
                <Comment.Text>
                  {comment.text.split("\n").map((text, i) => (
                    <span key={i}>
                      {text}
                      <br />
                    </span>
                  ))}
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action onClick={() => setShowReplyForm(true)}>
                    Reply
                  </Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </>
  );
}
