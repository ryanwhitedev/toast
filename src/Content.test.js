import React from "react";
import { render } from "@testing-library/react";
import Content from "./Content";
import { createMockFormSubmission, onMessage } from "./service/mockServer";

test("renders message when no liked submissions", () => {
  const likedSubmissions = [];

  const { getByText } = render(
    <Content loading={false} likedSubmissions={likedSubmissions} />
  );

  const heading = getByText("Liked Form Submissions");
  expect(heading).toBeInTheDocument();

  const noLikedSubmissions = getByText("No liked form submissions.");
  expect(noLikedSubmissions).toBeInTheDocument();
});

test("renders all liked submissions", () => {
  const submissions = [];

  // Add callback to append mock submissions to the list.
  const addSubmission = (submission) => submissions.push(submission);
  onMessage(addSubmission);

  // Create mock form submissions.
  createMockFormSubmission();
  createMockFormSubmission();

  // Update liked attribute.
  const likedSubmissions = submissions.map((item) => {
    const updatedItem = { ...item };
    item.data.liked = true;
    return updatedItem;
  });

  const { getByText, getAllByRole } = render(
    <Content loading={false} likedSubmissions={likedSubmissions} />
  );

  const heading = getByText("Liked Form Submissions");
  expect(heading).toBeInTheDocument();

  const listItems = getAllByRole("listitem");
  expect(listItems.length).toBe(likedSubmissions.length);
});

test("shows loading indicator", () => {
  render(<Content loading={true} likedSubmissions={[]} />);

  // Find a better approach to test for the Skeleton loading element. This
  // approach tightly couples the test and the implementation.
  const loading = document.querySelector(".MuiSkeleton-root");
  expect(loading).toBeInTheDocument();
});
