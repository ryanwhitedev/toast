import React from "react";
import { render } from "@testing-library/react";
import Toast from "./Toast";
import { createMockFormSubmission, onMessage } from "./service/mockServer";

function getFormSubmission() {
  let formSubmission = null;
  const addFormSubmission = (formData) => (formSubmission = formData);
  onMessage(addFormSubmission);
  createMockFormSubmission();
  return formSubmission;
}

test("renders toast", () => {
  let formSubmission = getFormSubmission();

  const { getByRole, getByTestId, getByText } = render(
    <Toast
      info={formSubmission}
      addFormSubmission={() => {}}
      handleClose={() => {}}
    />
  );

  const toast = getByRole("alert");
  expect(toast).toBeInTheDocument();

  const likeButton = getByText("LIKE");
  expect(likeButton).toBeInTheDocument();

  const closeButton = getByTestId("CloseIcon").parentElement;
  expect(closeButton).toBeInTheDocument();
});

test("renders form submission info", () => {
  let formSubmission = getFormSubmission();

  const { getByText } = render(
    <Toast
      info={formSubmission}
      addFormSubmission={() => {}}
      handleClose={() => {}}
    />
  );

  const { firstName, lastName, email } = formSubmission.data;
  const message = `${firstName} ${lastName} ${email}`;
  const toastContent = getByText(message);
  expect(toastContent).toBeInTheDocument();
});
