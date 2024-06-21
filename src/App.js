import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";

import Header from "./Header";
import Content from "./Content";
import Toast from "./Toast";
import { fetchLikedFormSubmissions } from "./service/mockServer";

function App() {
  const [likedSubmissions, setLikedSubmissions] = useState([]);

  const addLikedSubmission = (submission) =>
    setLikedSubmissions([...likedSubmissions, submission]);

  // Fetch liked submission data on page load.
  useEffect(() => {
    // Make a best effort attempt to load the data. There is a very small
    // chance (~0.0001%) that 6 consecutive calls to the "server" fail (based
    // on 10% failure rate in mockServer.js).
    //
    // TODO: add a delay between failed calls to help prevent overloading the
    // server in production.
    async function fetchData() {
      const maxRetries = 5;

      for (let i = 0; i <= maxRetries; i++) {
        try {
          const resp = await fetchLikedFormSubmissions();

          if (resp.status === 200) {
            setLikedSubmissions(resp.formSubmissions);
            break;
          }
        } catch (err) {
          console.error(err); // Log error
          if (i === maxRetries) {
            console.error("Max retries exceeded:");
          }
        }
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Content likedSubmissions={likedSubmissions} />
        <Toast addLikedSubmission={addLikedSubmission} />
      </Container>
    </>
  );
}

export default App;
