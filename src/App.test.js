import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders header text", () => {
  render(<App />);

  const heading = screen.getByRole("heading", { name: /toast exercise/i });
  expect(heading).toBeInTheDocument();
});

test("renders toast when new submission is created", () => {
  const { getByRole } = render(<App />);

  const newSubmissionButton = getByRole("button", { name: /new submission/i });
  expect(newSubmissionButton).toBeInTheDocument();

  fireEvent.click(newSubmissionButton);

  const toast = screen.getByRole("alert");
  expect(toast).toBeInTheDocument();
});

test("dismisses toast close button is clicked", () => {
  const { getByRole, getByTestId } = render(<App />);

  const newSubmissionButton = getByRole("button", { name: /new submission/i });
  expect(newSubmissionButton).toBeInTheDocument();

  fireEvent.click(newSubmissionButton);

  const toast = screen.getByRole("alert");
  expect(toast).toBeInTheDocument();

  const closeButton = getByTestId("CloseIcon").parentElement;
  expect(closeButton).toBeInTheDocument();

  fireEvent.click(closeButton);

  expect(toast).not.toBeInTheDocument();
});
