import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { useTranslation } from 'react-i18next';

function Copyright() {
    const { t } = useTranslation();
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {t("Copyright © ")}
      <Link color="inherit" href="https://avidalal.net/">
      {t("Avi Dalal")}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


export default function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}