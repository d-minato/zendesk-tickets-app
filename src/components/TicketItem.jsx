import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Grid,
} from "@mui/material";
import "../App.css";
import TicketDialog from "./TicketDialog";

const TicketItem = (props) => {
  const [ticket, setTickets] = useState(props.item);
  const [open, setOpen] = React.useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        variant="outlined"
        style={{ marginBottom: "1rem" }}
        onClick={handleOpenDialog}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography
                  variant="body1"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Subject: {ticket.subject}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" style={{ fontWeight: 500 }}>
                  {ticket.status}
                </Typography>
              </Grid>
            </Grid>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              maxHeight: "3.6em",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            Description: {ticket.description}
          </Typography>
          <br />
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                Created At: {ticket.created_at}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                Updated At: {ticket.updated_at}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <TicketDialog ticket={ticket} open={open} onClose={handleCloseDialog} />
    </>
  );
};

export default TicketItem;
