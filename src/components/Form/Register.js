import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import fire from '../../firebase';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function Register() {
    const { t } = useTranslation();
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    let history = useHistory();
   // const [fireErrors, setFireErrors] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword( email, password).then((user) => {
            var currentUser =  fire.auth().currentUser;
            currentUser.updateProfile({
               displayName: fullName

           })
        }).catch ((error) => {
          //  setFireErrors(error);
           alert(error);
         });
    } 



    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
      
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            {t("Register")}
            </Typography>
           
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
                value={fullName}
                onChange={(e)=> setFullName(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label={t("Full Name")}
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label={t("Email Address")}
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label={t("Password")}
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
               {t("Register")}
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href="/"  variant="body2">
                {t("To login Page")}
                </Link>
                </Grid>
                <Grid item>
                <Link href="/" variant="body2">
                    {t("To Home Page")}
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={8}>
        </Box>
        </Container>
    );
}