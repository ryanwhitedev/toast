import React, { useEffect, useState } from "react";
import { Button, CircularProgress, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { onMessage, saveLikedFormSubmission } from "./service/mockServer";

function isValidSubmission(submission) {
  return (
    typeof submission === "object" &&
    submission !== null &&
    submission.hasOwnProperty("id") &&
    submission.hasOwnProperty("data")
  );
}

export default function Toast({ addLikedSubmission }) {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(null);
  const [saving, setSaving] = useState(false);
  const [actionMessage, setActionMessage] = useState("LIKE");

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

  const saveSubmission = () => {
    // Show progress indicator
    setSaving(true);

    const updatedInfo = { ...info };
    updatedInfo.data.liked = true;

    // Save form submission. If saving fails, show "RETRY" action to user.
    saveLikedFormSubmission(updatedInfo)
      .then((resp) => {
        if (resp.status === 202) {
          addLikedSubmission(updatedInfo);

          // Add some suspense...
          setTimeout(() => {
            setOpen(false);
            setSaving(false);
          }, 400);
        }
      })
      .catch((e) => {
        console.error(e);
        setSaving(false);
        setActionMessage("RETRY");
      });
  };

  const action = (
    <>
      {saving ? (
        <CircularProgress size="1.5em" color="primary" />
      ) : (
        <Button color="primary" size="small" onClick={saveSubmission}>
          {actionMessage}
        </Button>
      )}
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
