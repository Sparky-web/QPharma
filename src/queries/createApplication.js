import {gql} from "@apollo/client"

export default gql`
      mutation($name: String, $email: String, $phone: String, $order: String, $company: String) {
          createApplication(
            input: {
              data: {
                name: $name
                email: $email
                phone: $phone
                order: $order,
                company: $company
              }
            }
          ) {
            application {
              name
              email
              order,
              company
            }
          }
    }

    `