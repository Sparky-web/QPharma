import { gql } from "@apollo/client"

export default gql`
    query Page ($limit: Int, $start: Int, $sort: String) {
        categories {
            uId,
            name,
            image {
                url
            }
        },
        masks (limit: $limit, start: $start, sort: $sort) {
            id,
            name,
            price,
            discountPrice,
            description,
            isAvailable,
            images {
                url
            },
            categoryId,
            protection
        },
        masksConnection {
            aggregate {
                totalCount
            }
        }
    }
`;