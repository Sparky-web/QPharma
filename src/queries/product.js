import { gql } from "@apollo/client"

export default gql`
    query Product($id: ID!) {
        product(id: $id) {
            id,
            name,
            price,
            discountPrice,
            description,
            isAvailable,
            images {
                url
            },
            protection,
            categoryName
        }
    }
`