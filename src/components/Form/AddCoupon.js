import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
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


export default function AddCoupon() {
    const { t } = useTranslation();
    const classes = useStyles();
   const [formValues, setFormValues] = useState([{ couponCode: ""}])
    const [bussiness, setBussiness] = useState('');
    const [product, setProduct] = useState('');

    
    const newCoupon = (e) => {
        const currentUID = fire.auth().currentUser.uid;
        e.preventDefault();
        const BackupState = [];
        if(formValues && bussiness && product){
          
          BackupState.push({
            id: BackupState.length +1,
            coupons: formValues,
            bussiness: bussiness,
            product: product,
            user_id: currentUID});
        }
 
        for(let i=0; i < formValues.length; i++){
          var ref =  fire.database().ref('Coupons/' +currentUID);
            ref
            .orderByChild('id')
            .equalTo(formValues[i].couponCode)
            .once("value")
            .then(function(snapshot) {
              if (!snapshot.exists()) {
                fire.database().ref('Coupons/' +currentUID).push({
                  id: formValues[i].couponCode,
                  coupon: formValues[i].couponCode,
                  bussiness: bussiness,
                  product: product,
                  user_id: currentUID
              }).then((data) =>{
                ///success callback
                window.location.replace('/');
              }).then((error) =>{
                ///error callback
    
              })

              }});

        }
       
    } 
  let handleChange = (i, e) => {
      let newFormValues = [...formValues];
      newFormValues[i][e.target.name] = e.target.value;
      setFormValues(newFormValues);
  }

  let addFormFields = () => {
      setFormValues([...formValues, { couponCode: ""}])
   }
  let removeFormFields = (i) => {
      let newFormValues = [...formValues];
      newFormValues.splice(i, 1);
      setFormValues(newFormValues)
  }
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
      
            <Avatar className={classes.avatar}>
            <LoyaltyIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            {t("New coupon")}
            </Typography>
           
            <form className={classes.form} noValidate onSubmit={newCoupon}>

            {formValues.map((element, index) => (
              <div className="form-inline" key={index}>
            <TextField
                value={element.couponCode || ""}
                onChange={(e)=>handleChange(index, e)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id={"coupon-"+index}
                label={t("Coupon code")}
                name="couponCode"
                autoComplete="Coupon code"
                autoFocus
                type="number"
            />
            {
                    index ? 
                    <Button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</Button> 
                  : null
            }
            </div>
            ))}
            <Button  
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit} 
                onClick={() => addFormFields()}>
             {t("More coupon code for this product")}
            </Button>
            <TextField
                value={bussiness}
                onChange={(e)=> setBussiness(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="bussiness"
                label={t("bussiness name")}
                name="bussiness"
                autoComplete="bussiness"
                autoFocus
            />
            <TextField
                value={product}
                onChange={(e)=> setProduct(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="product"
                label={t("product")}
                type="text"
                id="product"
                autoComplete="product"
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
               {t("Add coupon")}
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
    );
}