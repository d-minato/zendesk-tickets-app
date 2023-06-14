import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const TicketDialog = ({ ticket, open, onClose }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{ticket.subject}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{ticket.description}</Typography>
        <Typography variant="body2">ID: {ticket.id}</Typography>
        <Typography variant="body2">Status: {ticket.status}</Typography>
        <Typography variant="body2">Priority: {ticket.priority}</Typography>
        <Typography variant="body2">
          Created At: {formatDate(ticket.created_at)}
        </Typography>
        <Typography variant="body2">
          Updated At: {formatDate(ticket.updated_at)}
        </Typography>
        <Typography variant="body2">Type: {ticket.type}</Typography>
        {/* <Typography variant="body2">Tags: {ticket.tags.join(", ")}</Typography> */}
        <Typography variant="body2">
          Allow Attachments: {ticket.allow_attachments ? "Yes" : "No"}
        </Typography>
        <Typography variant="body2">
          Allow Channelback: {ticket.allow_channelback ? "Yes" : "No"}
        </Typography>
        <Typography variant="body2">
          Assignee ID: {ticket.assignee_id}
        </Typography>
        <Typography variant="body2">Brand ID: {ticket.brand_id}</Typography>
        {/* Display other ticket details */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketDialog;
