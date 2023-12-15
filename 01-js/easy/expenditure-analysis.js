/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let mapped_transaction = {}
  transactions.forEach(element => {
    if(!(mapped_transaction[element.category])){
      mapped_transaction[element.category] = 0 
    }
    mapped_transaction[element.category] = mapped_transaction[element.category] + element.price
  });

  console.log(mapped_transaction)

  let result = Object.entries(mapped_transaction).map(
    ([category, totalSpent]) => ({category, totalSpent})
  )

  return result;
}

module.exports = calculateTotalSpentByCategory;
