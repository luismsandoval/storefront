const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
});

export const DynamoDB = new AWS.DynamoDB();

const createTable = () => {
  const params = {
    TableName: "Products",
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  DynamoDB.createTable(params, (err, data) => {
    if (err) {
      console.error("unable to create table", err);
    } else {
      console.log("created table", data);
    }
  });
};

const addProduct = (
  image_url,
  id,
  name,
  description,
  category,
  price,
  inventory
) => {
  const params = {
    TableName: "Products",
    Item: {
      image_url: { S: image_url },
      id: { S: id },
      name: { S: name },
      description: { S: description },
      category: { S: category },
      price: { S: price },
      inventory: { N: inventory },
    },
  };

  DynamoDB.putItem(params, (err) => {
    if (err) {
      console.error("unable to add product", err);
    } else {
      console.log(`added ${name} to product list`);
    }
  });
};

const getAllProducts = async () => {
  const params = {
    TableName: "Products",
  };

  const products = await DynamoDB.scan(params, (err, data) => {
    if (err) {
      console.error("unable to find products", err);
    } else {
      console.log(`found ${data.Count} products`);
    }
  }).promise();

  return products;
};

const deleteProduct = (id) => {
  const params = {
    TableName: "Products",
    Key: {
      id: { S: id },
    },
  };

  DynamoDB.deleteItem(params, (err) => {
    if (err) {
      console.error("unable to find product");
    } else {
      console.log(`deleted product ${id}`);
    }
  });
};

const updateInventory = (product) => {
  const params = {
    TableName: "Products",
    Item: { ...product, inventory: { N: product.inventory.N-- } },
    ReturnConsumedCapacity: "TOTAL",
  };

  DynamoDB.putItem(params, (err) => {
    if (err) {
      console.log("unable to find product", err);
    } else {
      console.log(`updated product with new inventory of ${product}`);
    }
  });
};

const dbHandler = {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateInventory,
};

module.exports = {
  createTable,
  dbHandler,
};
