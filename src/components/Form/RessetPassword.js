import React, {useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import fire from '../../firebase'


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


export default function RessetPassword() {
    const [email, setEmail] = useState('');
    const { t } = useTranslation();
    const classes = useStyles();

    const resetPassword = (e) => {
      e.preventDefault();
      fire.auth().sendPasswordResetEmail(email)
      .then((e) => {
        console.log("emal sent");
        window.location.href = "/";
      })
      .catch((error) => {
        alert(error)
      })
    }
    return (
         <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
      
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            {t("Reset password")}
            </Typography>
           
            <form className={classes.form} noValidate onSubmit={resetPassword}>


            <TextField
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="product"
                label={t("Reset password")}
                type="email"
                id="email"
                autoComplete="email"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                to={{
                  pathname: '/',
                  search: window.location.search,
                }}
            >
               {t("To reset password")}
            </Button>
            <Grid container>
                <Grid item xs>
              
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
    )
}
