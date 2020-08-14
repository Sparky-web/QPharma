import { gql } from "@apollo/client"

export default gql`
    query Products {
        products {
            id,
            name,
            price,
            discount,
            description,
            isAvailable,
            images {
                uri
            },
            protection
        }        
    }
`;