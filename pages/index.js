import CustomCard from "../components/Card";
import { GET_CATEGORIES } from "../config/apollo/Schema";
import Grid from "@mui/material/Grid";
import { client } from "../config/apollo/GraphqlProvider";

export default function Home({ categories }) {
  return (
    <>
      <h1 className="text-4xl mb-14">Mini Ecommerce </h1>
      <Grid container spacing={2}>
        {categories.category.children.map((a, i) => (
          <Grid item xs={12} md={4} key={i}>
            <CustomCard name={a.name} link={`/category/${a.id}`} show />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: GET_CATEGORIES,
  });
  return {
    props: {
      categories: data,
    },
  };
}
