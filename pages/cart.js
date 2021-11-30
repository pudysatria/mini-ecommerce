import { Grid, Typography } from '@mui/material'
import React,{useState,useEffect} from 'react'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
const Cart = () => {
    const [cart, setCart] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    
    useEffect(() => {
        let cart = sessionStorage.getItem('cart')
        if(cart === null || cart.length === 0){
            setCart(null)
        }else{
            let result = JSON.parse(cart) || [];
            setCart(result);
        }
    }, [isDelete])
    
    const handleDelete = (item) => {
        let data = cart.filter((cart, index) => {
            return index !== item;
        })
        let items = JSON.stringify(data)
        sessionStorage.setItem('cart', items);
        setIsDelete(!isDelete);
    }
    return (
        <>
         <Typography variant="h5">
            Cart
            <Grid container spacing={2}>

            {cart?cart.map((item,i)=>(
                <Grid item xs={12} md={4} key={i}>
                    <Card sx={{ maxWidth: 500 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={item.image.url}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Box sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                        </Typography>
                        </Box>
                        <Typography gutterBottom variant="h6" component="div">
                        Rp {item.price_range.maximum_price.final_price.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {item.description.htmll?(<div dangerouslySetInnerHTML={{__html: item.description.html}}>
                        </div>):
                        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis sint debitis magni voluptas odio corrupti praesentium mollitia delectus laudantium numquam" }
                        </Typography>
                    </CardContent>
                    <CardActions className="p-5 ">
                        
                        <Button size="small" variant="contained" className="py-1 px-5 ml-1" onClick={() => {handleDelete(i)}} >Delete</Button>
                    </CardActions>
                    </Card>
            </Grid>

            )):<p>aa</p>}
            </Grid>
        </Typography>   
        </>
    )
}

export default Cart


