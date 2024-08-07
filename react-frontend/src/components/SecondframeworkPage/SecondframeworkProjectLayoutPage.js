import React from "react";
import ProjectLayout from "../Layouts/ProjectLayout";
import { connect } from "react-redux";
import SecondframeworkPage from "./SecondframeworkPage";

const SecondframeworkProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <SecondframeworkPage />
    </ProjectLayout>
  );
};

const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SecondframeworkProjectLayoutPage);