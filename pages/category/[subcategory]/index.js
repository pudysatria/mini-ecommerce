import { useQuery } from '@apollo/client'
import CustomCard from '../../../components/Card';
import { GET_CATEGORIES } from '../../../config/apollo/Schema';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link'

export default function Home() {
  const params = useRouter()
  const { loading, error, data } = useQuery(GET_CATEGORIES,{
    variables:{
      categoryId:params.query.subcategory
    }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
     <h1 className="text-xl mb-14"><Link href="/">Home</Link> / <span className="text-gray-500">{data.category.name}</span> </h1>
      <Grid container spacing={2}>
      {data.category.children.map((a,i)=>(
         <Grid item xs={12} md={4} key={i}>
         <CustomCard name={a.name} link={`/category/${data.category.id}/${a.id}`} count={a.product_count} show/>
        </Grid>
        ))}
      </Grid>
    </>
  )
}