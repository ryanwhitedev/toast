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
    // Ensure App component is mounted before updating it's state.
    let isMounted = true;

    // Fetch liked form submissions.
    fetchData()
      .then((data) => {
        if (isMounted) {
          setLikedSubmissions(data);
          setLoading(false);
        }
      })
      .catch((err) => console.error(err));

    // Setup callback to run on form submission.
    onMessage((formData) => {
      if (isMounted) {
        setNewSubmission(formData);
      }
    });

    // Cancel async state updates. This prevents the application from updating
    // the component's state in case it's been unmounted.
    return () => {
      isMounted = false;
    };
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
