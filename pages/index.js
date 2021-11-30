import { useQuery } from '@apollo/client'
import Head from 'next/head'
import Image from 'next/image'
import CustomCard from '../components/Card'
import { GET_CATEGORIES } from '../config/apollo/Schema'
import styles from '../styles/Home.module.css'
import Grid from '@mui/material/Grid';

export default function Home() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    console.log(data)
  return (
    <>
      <h1 className="text-4xl mb-14">Mini Ecommerce </h1>
      <Grid container spacing={2}>
      {data.category.children.map((a,i)=>(
         <Grid item xs={12} md={4} key={i}>
         <CustomCard  name={a.name} link={`/category/${a.id}`} show/>
        </Grid>
        ))}
      </Grid>
    </>
  )
}
