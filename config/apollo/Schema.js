import {gql} from "@apollo/client";

export const GET_CATEGORIES = gql`
query getCategoryProducts($categoryId: Int) {
        category(id: $categoryId) {
        id
        name
        url_key
        children{
        id
        name
        product_count
            children{
                description
                image_path
                name
                id
            }
        }
    }
}
`

export const GET_CATEGORY_PRODUCT = gql`
    query getCategoryProducts($categoryId: Int) {
        category(id: $categoryId) {
        id
        name
        url_key
        products {
            items {
            id
            name
            image {
                url
            }
            description{
                html
              }
            popular_icon
            rating_summary
            review_count
            url_key
            price_range {
                minimum_price {
                final_price {
                    value
                }
                regular_price {
                    value
                }
                }
            }
            }
            total_count
        }
        }
    }
`

export const GET_PRODUCT = gql`
query getProduct($urlKey: String) {
    products(filter: {
      url_key: {
        eq: $urlKey
      }
    }){
      items{
        id
        name
        description {
          html
        }
        image{
          url
        }
        price_range{
          maximum_price{
            final_price{
              value
            }
            regular_price{
              value
            }
          }
        }
        qty_available
        rating_summary
        categories{
          name
        }
      }
    }
  }
`