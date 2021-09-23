import React, { useState, useEffect  } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
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
  text: {
    textAlign: 'right',
  },
  dspalyflex: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "-webkit-fill-available",
 },
}));



export default function AddCouponFromSms() {
    const { t } = useTranslation();
    const classes = useStyles();
    const bussinessList = ["מקדונלד'ס","בבילון אילת","תו פלוס"];
    const productList =["ארוחה בשווי 45","320 מטבעות זהב   120","יינות ביתן, מגה בעיר ושוק מהדרין בשווי 50 ₪"];
    const [sms, setSms] = useState([]);
    const [couponCode, setCouponCode] = useState([]);
    const [bussiness, setBussiness] = useState('');
    const [product, setProduct] = useState('');
    const [smsText, setSmsText] = useState('');
    const [readOnly, setReadOnly] = useState(false);
    const [today, setToday] = useState(new Date());


    useEffect(() => {
      fire.database().ref('Bussinesses/' + fire.auth().currentUser.uid).once('value',(snapshot) => {
        snapshot.forEach((childSnapshot) => {
          bussinessList.push(
             childSnapshot.val().bussiness
           );     
       });
      
         console.log(bussinessList)
     })
      fire.database().ref('Products/' + fire.auth().currentUser.uid).once('value',(snapshot) => {
        snapshot.forEach((childSnapshot) => {
          productList.push(
             childSnapshot.val().product
           ); 

       });
       console.log(productList)
     })
    },[] )
    
    
   
   const handlePaste = ( e) => {
    setReadOnly(true)
    var txt =e.toLowerCase();
    setSmsText(e);
    console.log("txt: "+txt)
    const bussiness = bussinessList.find(bussiness => txt.includes(bussiness));
    console.log("bussiness: "+bussiness)
    const product = productList.find(product => txt.includes(product));
    console.log("product: "+product)
    let coupons = removeAllChars(txt);

      setCouponCode(...couponCode,coupons);



    setProduct(product);
    setBussiness(bussiness);  
    setToday(new Date());
  }

  const handleRemoveItem = (e) =>{
   
    const coupon = e;
    setCouponCode(couponCode.filter(item => item !== coupon))
  }
    const newCoupon = (e) => {
        e.preventDefault();
        const currentUID = fire.auth().currentUser.uid;
        if(couponCode && bussiness && product){
          for(let i=0; i < couponCode.length; i++){
            var ref =  fire.database().ref('Coupons/' +currentUID);
            ref
            .orderByChild('id')
            .equalTo(couponCode[i])
            .once("value")
            .then(function(snapshot) {
              if (!snapshot.exists()) {

                //add to firebase
                fire.database().ref('Coupons/' +currentUID).push({ 
                    id: couponCode[i],
                    coupon: couponCode[i],
                    bussiness: bussiness,
                    product: product,
                    today: today,
                    sms: smsText,
                    user_id: currentUID
                  }).then((data) =>{
                    console.log("success")
                    window.location.replace('/');
                  }).then((error) =>{
                    console.log("error")
                  })
                
              }
            });
          }
          
          var Products =  fire.database().ref('Products/' +currentUID);
          Products
          .orderByChild('product')
          .equalTo(product)
          .once("value")
          .then(function(snapshot) {
              if (!snapshot.exists()) {
              fire.database().ref('Products/' +currentUID).push({
                  id: Date.now(),
                  product: product.toLowerCase(),
                  user_id: currentUID
              }).then((data) =>{
              ///success callback
               
              }).then((error) =>{
              ///error callback
  
              })
  
          }});
          var Bussiness =  fire.database().ref('Bussinesses/' +currentUID);
          Bussiness
          .orderByChild('bussiness')
          .equalTo(bussiness)
          .once("value")
          .then(function(snapshot) {
              if (!snapshot.exists()) {
              fire.database().ref('Bussinesses/' +currentUID).push({
                  id: Date.now(),
                  bussiness: bussiness.toLowerCase(),
                  user_id: currentUID
              }).then((data) =>{
              ///success callback
              
              }).then((error) =>{
              ///error callback
  
              })
  
          }});
          
      }
    } 

  const removeAllChars=(txt)=>{ 
    let clrear = txt.split('תוקף');
    txt = clrear[0].replaceAll('-', '');
    txt = txt.replace(/[^0-9,]/g, ' ');
    txt = txt.split(/[ ,]+/).join(',');
    console.log(txt)
    let newArr = txt.split(',');
    console.log(newArr)
    let coupons = newArr.filter((a) => a.length >4);
    console.log(coupons)
    return coupons;
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
            <Grid className="dspalyflex">
            <TextField 
                value={sms}
                onChange={(e)=> setSms(e.target.value)}
                aria-label={t("put here the SMS you recived")} 
                placeholder={t("put here the SMS you recived")} 
                id="sms"
                variant="outlined"
                margin="normal"
                
                autoFocus
                inputProps={
                  { readOnly: readOnly, }
                }
                onPaste={(e)=>handlePaste(e.clipboardData.getData('Text'))}  
            /> 
            <Button
                onClick={()=>window.location.reload(false)}
                className={classes.submit}
            >
               {t("New SMS")}
            </Button>
            </Grid>       
            <form className={classes.form} noValidate onSubmit={newCoupon}>
            
                <List >
                  {couponCode.map((value,i) =>
                    <ListItem  key={i}>
                      <ListItemAvatar>
                        <Avatar>
                          <LoyaltyIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText   className={classes.text} primary={value} />
                      <IconButton edge="end" value={value} aria-label="delete" onClick={e => handleRemoveItem(value)}>
                        <DeleteIcon />
                      </IconButton>
                      

                    </ListItem>,
                  )}
                </List>

         
            
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