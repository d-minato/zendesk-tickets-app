import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Grid, Typography } from "@mui/material";
import TicketItem from "./TicketItem";

const Home = () => {
  const [tokenType, setTokenType] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [ticket, setTicket] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [isError, setIsError] = useState(false);

  const [tickets, setTickets] = useState([]);

  const ZENDESK_SUBDOMAIN = "z3nstudents";
  const REDIRECT_URI = "http://localhost:3000";
  const SCOPES = "tickets:read";
  const ZENDESK_CLIENT_ID = "localhost";

  useEffect(() => {
    if (!window.location.hash) {
      startAuthFlow();
    }
    console.log(extractTokenInfo(window.location.href));
  }, []);

  useEffect(() => {
    if (tokenType != "" && accessToken != "") {
      makeAPICall();
    }
  }, [tokenType, accessToken, pageNumber]);

  useEffect(() => {
    console.log(tickets);
  }, [tickets]);

  const startAuthFlow = () => {
    const endpoint = `https://${ZENDESK_SUBDOMAIN}.zendesk.com/oauth/authorizations/new`;
    const urlParams = new URLSearchParams({
      response_type: "token",
      redirect_uri: REDIRECT_URI,
      client_id: ZENDESK_CLIENT_ID,
      scope: SCOPES,
    });
    window.location = `${endpoint}?${urlParams.toString()}`;
  };

  const extractTokenInfo = (url) => {
    const params = new URLSearchParams(url.split("#")[1]);
    const access_token = params.get("access_token");
    const token_type = params.get("token_type");
    setTokenType(token_type);
    setAccessToken(access_token);
    return { access_token, token_type };
  };

  const handleLoad = () => {
    if (pageNumber < 4) setPageNumber(pageNumber + 1);
    else alert("We have reached to the last page");
  };

  const handleBackLoad = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
    else alert("Already reached to the first page!");
  };

  const makeAPICall = () => {
    var config = {
      method: "GET",
      // url: "/api/v2/tickets",
      url: `https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/tickets?per_page=25&page=${pageNumber}`,
      //url: `https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/tickets`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${tokenType} ${accessToken}`, // Base64 encoded "username:password"
      },
    };

    axios(config)
      .then(function (response) {
        // setData(response.data);
        setTickets(response.data.tickets);
      })
      .catch(function (error) {
        console.log(error);
        setIsError(true);
      });
  };

  return (
    <Container>
      {isError ? (
        <Typography variant="h6" sx={{ mb: 4 }} textAlign="center">
          Something went wrong!
        </Typography>
      ) : (
        <>
          <Typography variant="h1" sx={{ mb: 4 }} textAlign="center">
            Zendesk Tickets
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ mb: 4 }}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="h6">Page: {pageNumber}</Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant="contained" onClick={handleBackLoad}>
                    Previous Page
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleLoad}>
                    Next Page
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            {tickets.length !== 0 &&
              tickets.map((ticket, index) => (
                <Grid item key={ticket.id} xs={12} sm={12} md={12}>
                  <TicketItem item={ticket} />
                </Grid>
              ))}

            {ticket.length == 0 && (
              <Typography variant="h1" sx={{ mb: 4 }} textAlign="center">
                Something went wrong!
              </Typography>
            )}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Home;
