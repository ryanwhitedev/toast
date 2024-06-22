import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";

import Header from "./Header";
import Content from "./Content";
import Toast from "./Toast";
import { onMessage } from "./service/mockServer";
import { fetchData } from "./service/formSubmission";
import { isValidSubmission } from "./utils";

function App() {
  const [loading, setLoading] = useState(true);
  const [newSubmission, setNewSubmission] = useState(null);
  const [likedSubmissions, setLikedSubmissions] = useState([]);

  // Setup application on page load.
  useEffect(() => {
    // Fetch liked form submissions.
    fetchData(setLikedSubmissions, setLoading);

    // Setup callback to run on form submission.
    onMessage((formData) => setNewSubmission(formData));
  }, []);

  // Add submission to liked submissions list.
  const addLikedSubmission = (submission) =>
    setLikedSubmissions([...likedSubmissions, submission]);

  // Dismiss toast by removing newSubmission.
  const dismissToast = () => setNewSubmission(null);

  return (
    <>
      <Header disableNewSubmission={isValidSubmission(newSubmission)} />
      <Container>
        <Content loading={loading} likedSubmissions={likedSubmissions} />
        {isValidSubmission(newSubmission) && (
          <Toast
            info={newSubmission}
            addLikedSubmission={addLikedSubmission}
            dismiss={dismissToast}
          />
        )}
      </Container>
    </>
  );
}

export default App;
