import { useQuery } from "@apollo/client";
import CustomCard from "../../../components/Card";
import { GET_CATEGORIES } from "../../../config/apollo/Schema";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { client } from "../../../config/apollo/GraphqlProvider";

export default function Home({ subCategories }) {
  return (
    <>
      <h1 className="text-xl mb-14">
        <Link href="/">Home</Link> /{" "}
        <span className="text-gray-500">{subCategories.category.name}</span>{" "}
      </h1>
      <Grid container spacing={2}>
        {subCategories.category.children.map((a, i) => (
          <Grid item xs={12} md={4} key={i}>
            <CustomCard
              name={a.name}
              link={`/category/${subCategories.category.id}/${a.id}`}
              count={a.product_count}
              show
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: GET_CATEGORIES,
    variables: { categoryId: context.params.subcategory },
  });
  return {
    props: {
      subCategories: data,
    },
  };
}
