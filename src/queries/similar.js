import { gql } from "@apollo/client"

export default gql`
    query Similar($id: JSON) {
        products(where: {id: $id}) {
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
`