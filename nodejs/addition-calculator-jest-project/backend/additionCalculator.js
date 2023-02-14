function additionCalculator(...numbers) {
    return numbers.reduce((sum, item) => sum + item, 0);
  }
  
module.exports = additionCalculator;