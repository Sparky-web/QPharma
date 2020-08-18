import { gql } from "@apollo/client"

export default gql`
    query Categories {
        categories {
            id,
            name,
            image {
                url
            },
            categoryName
        }
        products {
            categoryName
        }
    }
`;