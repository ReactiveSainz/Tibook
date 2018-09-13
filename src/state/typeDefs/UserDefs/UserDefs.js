export default `


    extend Type Query{
        token:String!
        me:User!
    }

    type User {
        username: String!
        email: String!
        token: String!
    }

`;
