import { useQuery } from '@apollo/client'
import Head from 'next/head'
import Image from 'next/image'
import CustomCard from '../../../../components/Card';
import Grid from '@mui/material/Grid';
import { GET_CATEGORY_PRODUCT } from '../../../../config/apollo/Schema'; 
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link'
import { Alert, CircularProgress  } from '@mui/material';

const Categories = () => {
    const params = useRouter()
    const { loading, error, data } = useQuery(GET_CATEGORY_PRODUCT,{
      variables:{
        categoryId:params.query.products
      }
    });
    if (loading) return <CircularProgress />;
    if (error) return <p>Error :(</p>;
    return (
      <>
        <h1 className="text-xl mb-14"><Link href="/">Home</Link> / <span className="text-gray-500">{data.category.name}</span> </h1>
        <Grid container spacing={2}>
        {(data.category.products.items).map((a,i)=>(
           <Grid item xs={12} md={4} key={i}>
           <CustomCard  name={a.name} link={`/category/detail/${a.url_key}`} image={a.image.url} desc={a.description.html} price={a.price_range.minimum_price.final_price.value} res={a} show cart/>
          </Grid>
          ))}
        </Grid>
       
      </>
    )
}

export default Categories
