import React from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { createMockFormSubmission } from "./service/mockServer";
import { Tooltip } from "@mui/material";

export default function Header({ disableNewSubmission }) {
  const button = (
    <Button
      variant="contained"
      size="small"
      color="secondary"
      disabled={disableNewSubmission}
      onClick={() => createMockFormSubmission()}
    >
      New Submission
    </Button>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Toast Exercise
          </Typography>
          {disableNewSubmission ? (
            <Tooltip title="You must like or dismiss the current form submission before creating another.">
              <span>{button}</span>
            </Tooltip>
          ) : (
            button
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
