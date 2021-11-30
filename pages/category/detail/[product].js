import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from "next/link"
import { useRouter } from 'next/dist/client/router';
import { useQuery } from '@apollo/client';
import {  GET_PRODUCT } from '../../../config/apollo/Schema';
import { Alert } from '@mui/material';

export default  function Product() {
    const [carts, setCarts] = useState([]);
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        let cart = sessionStorage.getItem('cart');
        if(cart === null){
            setCarts([])
        }else{
            let result = JSON.parse(cart) || [];
            setCarts(result)
        }
    }, [])
    const params = useRouter()
    const { loading, error, data } = useQuery(GET_PRODUCT,{
      variables:{
        urlKey:params.query.product
      }
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const fix = data.products.items[0]
    
    const handleSave = () => {
      if(carts.length === 0){
          let arrayItem = [fix]
          let savedItem = JSON.stringify(arrayItem)
          sessionStorage.setItem('cart', savedItem)
      }else{
          let shoppingCart = carts;
          shoppingCart.push(fix);
          let savedItem = JSON.stringify(shoppingCart)
          sessionStorage.setItem('cart', savedItem)
      }
      setSuccess(true)
    }

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        height="140"
        image={fix.image.url}
        alt="green iguana"
      />
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {fix.name}
        </Typography>
        </Box>
        <Typography gutterBottom variant="h6" component="div">
         Rp {fix.price_range.maximum_price.final_price.value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {fix.description.html?(<div dangerouslySetInnerHTML={{__html: fix.description.html}}>
          </div>):
         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis sint debitis magni voluptas odio corrupti praesentium mollitia delectus laudantium numquam" }
        </Typography>
      </CardContent>
      <CardActions className="p-5 ">
         
          <Button size="small" variant="contained" className="py-1 px-5 ml-1" onClick={handleSave}>add to cart</Button>
      </CardActions>
      {success&&<Alert severity="success" color="info">
        This item has been successfully moved to cart — check it out!
      </Alert>}
    </Card>
  );
}


