import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom'
import fire from '../firebase'
import { QRCode } from "react-qr-svg";

const styles = theme =>  ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    padding: '5%',
  },
  cardContent: {
    flexGrow: 1,
  },
});



class CouponList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : 1,
      coupons: []
    };
  }


  componentDidMount(){
    const couponsData = [];
    fire.auth().onAuthStateChanged((user) => { if (user) {
     fire.database().ref('Coupons/' + fire.auth().currentUser.uid).once('value',(snapshot) => {
       snapshot.forEach((childSnapshot) => {
         couponsData.push({
           key: childSnapshot.key,
           id: childSnapshot.val().id,
           bussiness: childSnapshot.val().bussiness,
           product: childSnapshot.val().product
          });

        
      });
        this.setState({coupons :couponsData })
        
    })}});
  }
  handleRemoveItem = (key) =>{
    const userId = fire.auth().currentUser.uid;
    const coupon = fire.database().ref("Coupons/"+ userId);
    
    coupon.child(key).remove();
    this.setState({
      coupons: this.state.coupons.filter(item => item.key !== key)
    })
  }

  render(){
    const { classes} = this.props;

    return (
      <>

      <CssBaseline />
      <main>
        {/* Hero unit */}

        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            <Trans>My coupons</Trans>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary" component={Link} to="/add">
                  <Trans>Add coupon from manualy</Trans>
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" component={Link} to="/addSMS">
                  <Trans>Add coupon from SMS</Trans>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
        <Grid container spacing={4}>

         {this.state.coupons.map((coupon) => {
          const {key, id, bussiness, product} = coupon;
          return(
            
            <Grid item key={id} xs={12} sm={6} md={4}>
            
            <Card className={classes.card}>
              <QRCode
                className={classes.cardMedia}
                level="Q"
                value={id}
                bgColor="#FFFFFF"
                fgColor="#000000"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                {bussiness}
                </Typography>
                <Typography>
                {product}
                </Typography>
                <Typography>
                {id}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => this.handleRemoveItem(key)}>
                <Trans>Delete</Trans>
                </Button>
              </CardActions>
            </Card>
          </Grid>

          ); 
        })}
        </Grid>
        </Container>
      </main>
      </>
    );
  }
}

export default  withStyles(styles)(CouponList)