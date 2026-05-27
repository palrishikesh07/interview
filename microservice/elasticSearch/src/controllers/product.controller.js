const Product = require('../models/product.model');
const elasticClient = require('../config/elastic.js');
const { Op } = require('sequelize');
// Create Product
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        console.log("Product created in MySQL:", product.toJSON());
        // Sync to elastiSearch
        await elasticClient.index({
            index: 'products',
            id: product.id.toString(),
            document: {
                name: product.name,
                description: product.description,
                price: product.price
            }
        })

        res.status(201).json(product);

    }
    catch (err) {
        console.log(err)
        console.error(err);
        res.status(500).json({ message: 'Error creating product' });
    }
}

// Get Products from MYSQL
exports.getProducts = async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
}

// Search Products in ElasticSearch
exports.searchProducts = async (req, res) => {

    try {
        const q = req.query.q;
        const result = await elasticClient.search({
            index: 'products',
            // For simple match query
            // query:{
            //     multi_match:{
            //         query: q,
            //         fields: ['name','description']
            //     }
            // }
            // For fuzzy search (typo tolerance, will match similar words)
            // query: {
            //     fuzzy: {
            //         name: {
            //             value: q,
            //             fuzziness: 'AUTO'
            //         }
            //     }
            // }
            // For multi-field fuzzy search
            // query: {
            //     multi_match: {
            //         query: q,
            //         fields: ['name', 'description'],
            //         fuzziness: 'AUTO'
            //     }
            // }
            // For prefix search (matches terms that start with the query)
            // query: {
            //     prefix: {
            //         name: q
            //     }
            // }
            // Matching only two characters of the query (useful for short queries) 
            // query: {
            //     multi_match: {
            //         query: q,
            //         fields: [
            //             'name',
            //             'description'
            //         ],
            //         fuzziness: 'AUTO',
            //         minimum_should_match: '0%'
            //     }
            // }
            // For matching the beginning of the field with the query (useful for autocomplete)
            // query: {
            //     match_phrase_prefix: {
            //         name: {
            //             query: q
            //         }
            //     }
            // }

            query: {
                multi_match: {
                    query: q,
                    fields: ['name', 'description'],
                    type: 'phrase_prefix'
                }
            }
        })

        const hits = result.hits.hits.map((item) => {
            console.log("Hit Item:", item);
            return item._source;
        }); // Extract the source data from hits
        res.json({
            products: hits,
            searchEngine: 'ElasticSearch'
        });
    }
    catch (err) {
        console.error(err);
        const q = req.query.q;
        console.log("Search Query:", q);
        const product = await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${q}%` } },
                    { description: { [Op.like]: `%${q}%` } }
                ]

            }   
        })
        return res.json(
            {
                products: product,
                searchEngine: 'MySQL',
            }
        );
        res.status(500).json({ message: 'Error searching products' });
    }
    }

    // Update Product
    exports.updateProduct = async (req, res) => {
        const { id } = req.params;

        await Product.update(req.body, {
            where: { id }
        })

        const updateProduct = await Product.findByPk(id);
        // Update elastic search
        await elasticClient.index({
            index: 'products',
            id: id,
            document: {
                name: updateProduct.name,
                description: updateProduct.description,
                price: updateProduct.price
            }
        })

        res.json(updateProduct);
    }

    // Delete Product
    exports.deleteProduct = async (req, res) => {
        const { id } = req.params;

        await Product.destroy({
            where: { id }
        })

        // Delete from elasticsearch
        await elasticClient.delete({
            index: 'products',
            id: id
        })

        res.json({
            message: 'Deleted Successfully'
        })
    }


