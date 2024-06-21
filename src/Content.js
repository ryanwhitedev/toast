import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemText } from "@mui/material";

export default function Content({ likedSubmissions }) {
  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      <List>
        {likedSubmissions.map(({ id, data }) => (
          <ListItem disablePadding key={id}>
            <ListItemText
              primary={`${data.firstName} ${data.lastName} ${data.email}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
