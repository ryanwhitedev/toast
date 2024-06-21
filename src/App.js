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

  useEffect(() => {
    // TODO: handle failures
    fetchLikedFormSubmissions()
      .then((resp) => {
        console.log(resp);
        setLikedSubmissions(resp.formSubmissions);
      })
      .catch((err) => console.error(err));
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
