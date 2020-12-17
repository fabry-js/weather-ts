import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import axios from "axios";

interface CardComponentProps {
  city?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
    },
    typography: {
      fontFamily: ['JetBrains Mono', 'monospace'].join(',')
    }
  })
);

export const CardComponent: React.FC<CardComponentProps> = ({ city }) => {
  const [response, setResponse] = useState<any>(null);

  const classes = useStyles();
  const { register, errors } = useForm<CardComponentProps>();

  const onSubmit = (data: any) => {
    data.preventDefault();
    const form = new FormData(data.target);
    const city = form.get("city");
    const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7a6e0713247c280ffdeeee7b61dc003b`;
    axios
      .get(BASE_URL)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        return <span>Attenzione: Errore: {err}</span>;
      });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <form noValidate autoComplete="on" onSubmit={onSubmit}>
              <input name="city" ref={register({ required: true })} />
              {errors.city && <span>Questo valore è richiesto 🥺</span>}
              <input type="submit" />
            </form>
            <Typography variant="h5" component="h2">
              🍃Il meteo di oggi per: {response ? response.name : "-"}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          {" "}
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h2">
              🌡Temperatura attuale:{" "}
              {response ? Math.round(response.main.temp - 273.15) : "-"} °C
            </Typography>
            <Typography variant="body2" component="p">
              Temperatura Massima:{" "}
              {response ? Math.round(response.main.temp_max - 273.15) : "-"} °C
            </Typography>
            <Typography variant="body2" component="p">
              Temperatura minima:{" "}
              {response ? Math.round(response.main.temp_min - 273.15) : "-"} °C
            </Typography>
            <Typography variant="body2" component="p">
              Umidità: {response ? Math.round(response.main.humidity) : "-"} %
            </Typography>
            <Typography variant="body2" component="p">
              Pressione: {response ? Math.round(response.main.pressure) : "-"}{" "}
              mbar
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h2">
              🌀Velocità del vento:{" "}
              {response ? Math.round(response.wind.speed * 1.609) : "-"} km/h
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <footer>
              <div>
                <div>
                  <p>
                    Fatto con tanto{" "}
                    <a href="https://it.wikipedia.org/wiki/Amore">❤️</a>,{" "}
                    <a href="https://it.wikipedia.org/wiki/Caff%C3%A8">☕</a> e{" "}
                    <a href="https://it.wikipedia.org/wiki/JavaScript">
                      {" "}
                      JavaScript
                    </a>{" "}
                  </p>
                  <p>Fabrizio Piperno</p>
                  <p>
                    <a href="https://github.com/fabry-js/weather-ts">
                      GitHub Repository
                    </a>
                  </p>
                  <small>
                    &copy; 2016-2020
                  </small>
                </div>
              </div>
            </footer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
