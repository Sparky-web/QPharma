import { gql } from "@apollo/client"

export default gql`
    query Categories {
        categories {
            uId,
            name,
            image {
                url
            }
        }        
    }
`;