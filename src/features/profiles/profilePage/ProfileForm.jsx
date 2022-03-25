import React from "react";
import { Formik, Form } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { Button, Header } from "semantic-ui-react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../../app/firestore/firestoreService";

export default function ProfileForm({ profile }) {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || "",
        meetyURL: profile.meetyURL || "",
        twitterId: "",
        facebookId: "",
        gitHubId: "",
        noteId: "",
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateUserProfile(values);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className='ui form'>
          <MyTextInput name='displayName' placeholder='Display Name' />
          <MyTextArea name='description' placeholder='Description' />
          <MyTextInput name='meetyURL' placeholder='MeetyURL' />
          <Header content='Input your SNS' />
          <MyTextInput name='twitterId' placeholder='twitterId' />
          <MyTextInput name='facebookId' placeholder='facebookId' />
          <MyTextInput name='gitHubId' placeholder='gitHubId' />
          <MyTextInput name='noteId' placeholder='noteId' />
          <Button
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            floated='right'
            type='submit'
            size='large'
            positive
            content='Update profile'
          />
        </Form>
      )}
    </Formik>
  );
}
