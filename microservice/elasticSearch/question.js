
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node: 'http://localhost:9200'
});

// async function check() {
//   const response = await client.info();
//   console.log(response);
// }

// check();




await client.index({
    index: 'users',
    document: {
        name: 'Rishikesh',
        skills: ['Node.js', 'React']
    }
});


// Simple search query
const result = await client.search({
    index: 'users',
    query: {
        match: {
            name: 'Rishikesh'
        }
    }
});

console.log(result.hits.hits);

// Multi-match search query
const result2 = await client.search({
    index: 'users',
    query: {
        multi_match: {
            query: q,
            fields: ['name', 'skills'],
            type: 'phrase_prefix'
        }
    }
});
console.log(result2.hits.hits);


// match
{
    match: { title: "node developer" }
}

// term
{
    term: { status: "ACTIVE" }
}

await client.indices.create({
  index: 'products',
  mappings: {
    properties: {
      name: { type: 'text' },
      price: { type: 'integer' },
      createdAt: { type: 'date' }
    }
  }
});


await client.bulk({
  refresh: true,
  operations: [
    { index: { _index: 'users' } },
    { name: 'John' },

    { index: { _index: 'users' } },
    { name: 'Mike' }
  ]
});


const result = await client.search({
  index: 'orders',
  size: 0,
  aggs: {
    total_sales: {
      sum: {
        field: 'amount'
      }
    }
  }
});
