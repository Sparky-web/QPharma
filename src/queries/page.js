import { gql } from "@apollo/client"

export default gql`
    query Page {
        faqs {
            id,
            question,
            answer
        },
        trustedBies {
            images {
                url
            }
        },
        certificates {
            images {
                url
            }
        },
        contents {
            name,
            data
        }
    }
`;