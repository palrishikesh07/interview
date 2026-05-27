const client = require('./src/config/elastic');
const Product = require('./src/models/product.model');

async function recreateIndex() {
    try {
        // Delete existing index
        await client.indices.delete({
            index: 'products'
        }, { ignore: [404] }); // Ignore 404 error if index does not exist
        
        // Create new index with mapping
        await client.indices.create({
            index: 'products',
            body: {
                mappings: {
                    properties: {
                        name: { type: 'text' },
                        description: { type: 'text' },
                        price: { type: 'integer' }
                    }
                }

                // Want to match with 20% typo, so using keyword with normalizer for case-insensitive search and exact match
                // mappings: {
                //     properties: {
                //         name: { 
                //             type: 'keyword',
                //             normalizer: 'lowercase_normalizer'
                //         },
                //         description: { 
                //             type: 'keyword',
                //             normalizer: 'lowercase_normalizer'
                //         },
                //         price: { type: 'integer' }
                //     }
                // },
                // settings: {
                //     analysis: {
                //         normalizer: {
                //             lowercase_normalizer: {
                //                 type: 'custom',
                //                 filter: ['lowercase']
                //             }
                //         }
                //     }
                // }
            }
        });

        // Fetch all products from MySQL and index them in ElasticSearch
        const products = await Product.findAll();
        for (const product of products) {
            await client.index({
                index: 'products',
                id: product.id.toString(),
                document: {
                    name: product.name,
                    description: product.description,
                    price: product.price
                }
            });
        }

        console.log('Index recreated and data synced successfully!');
    } catch (err) {
        console.error('Error recreating index:', err);
    }   
}


recreateIndex();



/