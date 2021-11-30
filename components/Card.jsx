import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from "next/link"

export default  function CustomCard({name,image,desc,link,cart,show,price,count,res}) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={image||"/tumb.jpg"}
        alt="green iguana"
      />
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        </Box>
       {count&& <Typography gutterBottom variant="subtitle1" component="div">
          {count} Products available  
        </Typography>}
        {price&&<Typography gutterBottom variant="h6" component="div">
         Rp {price}
        </Typography>}
        <Typography variant="body2" color="text.secondary">
          {desc?(<div dangerouslySetInnerHTML={{__html: desc}}>
          </div>):
         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis sint debitis magni voluptas odio corrupti praesentium mollitia delectus laudantium numquam" }
        </Typography>
      </CardContent>
      <CardActions className="p-5 ">
          {show&&<Link href={link}>
              <a >
                <Button size="small" variant="outlined" className="py-1 px-5" >Show</Button>
              </a>
          </Link>}
     
      </CardActions>
    </Card>
  );
}
