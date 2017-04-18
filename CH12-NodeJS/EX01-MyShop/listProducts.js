const faker = require('faker');

let productName = faker.commerce.productName;
let price = faker.commerce.price;

for (let i = 0; i < 10; i++) {
    console.log(`${productName()} - $${price()}`);
}

