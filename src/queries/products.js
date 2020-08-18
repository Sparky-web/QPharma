import { gql } from "@apollo/client"

export default gql`
    query Products($categoryName: String, $sort: String, $start: Int, $limit: Int) {
        products (where: {categoryName: $categoryName}, sort: $sort, start: $start, limit: $limit) {
            id,
            name,
            price,
            discountPrice,
            description,
            isAvailable,
            images {
                url
            },
            protection
        }        
    }
`;