import React, { useEffect, useState } from "react";
import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { onMessage } from "./service/mockServer";

function isValidSubmission(submission) {
  return (
    typeof submission === "object" &&
    submission !== null &&
    submission.hasOwnProperty("id") &&
    submission.hasOwnProperty("data")
  );
}

export default function Toast() {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    onMessage((formData) => setInfo(formData));
  }, []);

  useEffect(() => {
    setOpen(isValidSubmission(info));
  }, [info]);

  const handleClose = (_event, reason) => {
    // Force user to dismiss the toast.
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // TODO: Update LIKE action
  const action = (
    <>
      <Button color="primary" size="small" onClick={handleClose}>
        LIKE
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      message={
        isValidSubmission(info)
          ? `${info.data.firstName} ${info.data.lastName}\n${info.data.email}`
          : ""
      }
      action={action}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    />
  );
}
