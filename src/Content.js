import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemText, Skeleton } from "@mui/material";

export default function Content({ loading, likedSubmissions }) {
  const width = Math.min(window.innerWidth, 450);

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      {loading ? (
        [...Array(5)].map((_, i) => <Skeleton key={i} width={width} />)
      ) : (
        <List>
          {likedSubmissions.length ? (
            likedSubmissions.map(({ id, data }) => (
              <ListItem disablePadding key={id}>
                <ListItemText
                  primary={`${data.firstName} ${data.lastName} ${data.email}`}
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="p">No liked form submissions.</Typography>
          )}
        </List>
      )}
    </Box>
  );
}
