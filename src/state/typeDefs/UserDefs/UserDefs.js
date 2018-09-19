export default `

    extend Type Query{
        token:String!
        me:User!
    }

    extend Type Mutation{
        logOut: String
        logIn: String
    }

    type User {
        token: String!
    }

`;
