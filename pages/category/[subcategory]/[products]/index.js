import CustomCard from "../../../../components/Card";
import Grid from "@mui/material/Grid";
import { GET_CATEGORY_PRODUCT } from "../../../../config/apollo/Schema";
import Link from "next/link";
import { client } from "../../../../config/apollo/GraphqlProvider";

const Categories = ({ products }) => {
  return (
    <>
      <h1 className="text-xl mb-14">
        <Link href="/">Home</Link> /{" "}
        <span className="text-gray-500">{products.category.name}</span>{" "}
      </h1>
      <Grid container spacing={2}>
        {products.category.products.items.map((a, i) => (
          <Grid item xs={12} md={4} key={i}>
            <CustomCard
              name={a.name}
              link={`/category/detail/${a.url_key}`}
              image={a.image.url}
              price={a.price_range.minimum_price.final_price.value}
              res={a}
              show
              cart
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: GET_CATEGORY_PRODUCT,
    variables: { categoryId: context.params.products },
  });
  return {
    props: {
      products: data,
    },
  };
}

export default Categories;
