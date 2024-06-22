import React, { useState } from "react";
import { Button, CircularProgress, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { saveLikedFormSubmission } from "./service/mockServer";

export default function Toast({ info, addLikedSubmission, dismiss }) {
  const [saving, setSaving] = useState(false);
  const [buttonText, setButtonText] = useState("LIKE");

  const handleClose = (_event, reason) => {
    // Prevent toast from closing when clicking elsewhere on the screen.
    if (reason === "clickaway") {
      return;
    }
    dismiss();
  };

  const saveSubmission = () => {
    // Show progress indicator
    setSaving(true);

    const updatedData = { ...info };
    updatedData.data.liked = true;

    // Save form submission. If saving fails, show "RETRY" action to user.
    saveLikedFormSubmission(updatedData)
      .then((resp) => {
        if (resp.status === 202) {
          addLikedSubmission(updatedData);

          // Add some suspense...
          setTimeout(() => {
            setSaving(false);
            handleClose();
          }, 500);
        }
      })
      .catch((e) => {
        console.error(e);
        setSaving(false);
        setButtonText("RETRY");
      });
  };

  const { firstName, lastName, email } = info.data;
  const message = `${firstName} ${lastName}\n${email}`;

  const action = (
    <>
      {saving ? (
        <CircularProgress size="1.5em" color="primary" />
      ) : (
        <Button color="primary" size="small" onClick={saveSubmission} sx={{ fontWeight: "bold" }}>
          {buttonText}
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
      open={true}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      message={message}
      action={action}
      sx={{ whiteSpace: "pre-line" }}
    />
  );
}
