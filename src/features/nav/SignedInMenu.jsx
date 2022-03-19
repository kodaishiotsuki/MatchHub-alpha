import React from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutUser } from "../auth/authActions";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SignedInMenu() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const history = useHistory();
  return (
    <>
      <Menu.Item position='right'>
        <Image
          avatar
          spaced='right'
          src={currentUser.photoURL || "/assets/user.png"}
        />
        <Dropdown pointing='top left' text={currentUser.email}>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to='/createEvent'
              text='Create Event'
              icon='plus'
            />
            <Dropdown.Item text='My Profile' icon='user' />
            <Dropdown.Item
              onClick={() => {
                dispatch(signOutUser());
                history.push("/");
              }}
              text='Sign Out'
              icon='power'
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </>
  );
}
