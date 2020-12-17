import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import axios from "axios"

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
  })
);

export const CardComponent: React.FC<CardComponentProps> = ({ city }) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    watch,
    errors,
  } = useForm<CardComponentProps>();

  const onSubmit = (data: any) => {
    city = JSON.stringify(data.city);
    axios.get(BASE_URL).then((res) =>{
      console.log(res);
     }).catch((err) =>{
       console.error(err);
     })
  };
  const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <form
              noValidate
              autoComplete="on"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input name="city" ref={register({ required: true })} />
              {errors.city && <span>Questo valore è richiesto 🥺</span>}
              <input type="submit"/>
            </form>
            <Typography variant="h5" component="h2">
              🍃Il meteo di oggi per:
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h2">
              🌡Temperatura attuale:
            </Typography>
            <Typography variant="body2" component="p">
              Temperatura Massima:
            </Typography>
            <Typography variant="body2" component="p">
              Temperatura minima:
            </Typography>
            <Typography variant="body2" component="p">
              Umidità:
            </Typography>
            <Typography variant="body2" component="p">
              Pressione:
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h2">
              🌀Velocità del vento:
            </Typography>
            <Typography variant="body2" component="p">
              🌞Alba:
            </Typography>
            <Typography variant="body2" component="p">
              🌚Tramonto:
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
