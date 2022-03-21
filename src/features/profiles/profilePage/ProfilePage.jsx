import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Grid } from "semantic-ui-react";
import { getUserProfile } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { listenToCurrentUserProfile } from "../profileActions";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function ProfilePage({ match }) {
  const dispatch = useDispatch();
  const { currentUserProfile } = useSelector((state) => state.profile);
  const { loading, error } = useSelector((state) => state.async);

  //firestoreデータ取得
  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToCurrentUserProfile(profile)),
    deps: [dispatch, match.params.id],
  });

  if ((loading && !currentUserProfile) || (!currentUserProfile && !error))
    return <LoadingComponent content='Loading profile...' />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={currentUserProfile} />
        <ProfileContent profile={currentUserProfile} />
      </Grid.Column>
    </Grid>
  );
}
