import { gql } from "@apollo/client"

export default gql`
    query Page ($limit: Int, $start: Int) {
        categories {
            uId,
            name,
            image {
                url
            }
        },
        masks (limit: $limit, start: $start) {
            id,
            name,
            price,
            discount,
            description,
            isAvailable,
            images {
                url
            },
            categoryId,
            protection
        }            
    }
`;