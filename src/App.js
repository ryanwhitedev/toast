import React from "react";
import Container from "@mui/material/Container";

import Header from "./Header";
import Content from "./Content";
import Toast from "./Toast";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Content />
        <Toast />
      </Container>
    </>
  );
}

export default App;
