const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');


const products = [
    {id:'1',sku:'12345',title:'iphone',desc:'iphone is product from apple'},
    {id:'2',sku:'3333',title:'samsung',desc:'samsung is product from samsung'},
    {id:'3',sku:'4444',title:'internet',desc:'internet is product from dtv'},
]

const ProductType = new GraphQLObjectType({
    name : 'Product',
    fields : () =>({
        id:{type:GraphQLString},
        sku:{type:GraphQLString},
        title:{type:GraphQLString},
        description:{type:GraphQLString},

    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        product:{
            type: ProductType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                const url = `http://localhost:4000/api/v1/product/${args.id}`.trim();
                console.log(url);
                // const da =  axios.get(url).then(res => res.data);
                // console.log(da);
                return axios.get(url).then(res => res.data.data);
                // for(let i=0; i< products.length; i++){
                //     if(products[i].id==args.id){
                //         return products[i];
                //     }
                // }
            }
        },
        products:{
            type: new GraphQLList(ProductType),
            resolve(parentValue,args){
                return products;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query : RootQuery
});