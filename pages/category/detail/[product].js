import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { GET_PRODUCT } from "../../../config/apollo/Schema";
import { Alert, Grid } from "@mui/material";
import { ThemeContext } from "../../../config/context/ThemeContext";
import { client } from "../../../config/apollo/GraphqlProvider";

export default function Product({ singleProduct }) {
  const [carts, setCarts] = useState([]);
  const [success, setSuccess] = useState(false);
  const { dispatch } = React.useContext(ThemeContext);

  useEffect(() => {
    let cart = localStorage.getItem("cart");
    if (cart === null) {
      setCarts([]);
    } else {
      let result = JSON.parse(cart) || [];
      setCarts(result);
    }
  }, []);

  const fix = singleProduct.products.items[0];
  const handleSave = () => {
    if (carts.length === 0) {
      let arrayItem = [fix];
      let savedItem = JSON.stringify(arrayItem);
      localStorage.setItem("cart", savedItem);
    } else {
      let shoppingCart = carts;
      shoppingCart.push(fix);
      let savedItem = JSON.stringify(shoppingCart);
      localStorage.setItem("cart", savedItem);
    }
    dispatch({ type: "setCount" });
    setSuccess(true);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card sx={{ maxWidth: 500 }}>
          <CardMedia
            component="img"
            height="140"
            image={fix.image.url}
            alt="green iguana"
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h4" component="div">
            {fix.name}
          </Typography>
        </Box>
        <Typography gutterBottom variant="h6" component="div">
          Rp {fix.price_range.maximum_price.final_price.value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {fix.description.html ? (
            <div
              dangerouslySetInnerHTML={{ __html: fix.description.html }}
            ></div>
          ) : (
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis sint debitis magni voluptas odio corrupti praesentium mollitia delectus laudantium numquam"
          )}
        </Typography>
        <Button
          size="small"
          variant="contained"
          className="py-2 px-7 my-5"
          onClick={handleSave}
        >
          add to cart
        </Button>
        {success && (
          <Alert severity="success" color="success">
            This item has been successfully moved to cart — check it out!
          </Alert>
        )}
      </Grid>
    </Grid>
  );
}

export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: { urlKey: context.params.product },
  });
  return {
    props: {
      singleProduct: data,
    },
  };
}
