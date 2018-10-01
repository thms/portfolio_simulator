/* eslint-env jest */
const Portfolio = require('./index');

let portfolio = [];
// Generate portfolio with given set of loans
beforeAll(() => {

  // This would generate a random portfolio
  // portfolio = new Portfolio(
  //   /* Parameters */
  //   10,  // number of loans
  //   [0,3,5,7,9], starting month of the loan
  //   [2000, 4000, 5000, 7000, 1000], // amounts
  //   [5, 10, 15, 20], // interestRates
  //   [6, 12], // maturities
  //   [3, 8, 12, 18] //pds
  // )
  // this generates a predicable portfolio.
  // TODO: add a method to shoft the start of the loan around in time.
  portfolio = new Portfolio(
    /* Parameters */
    10,  // number of loans
    [0], // starting months
    [5000], // amounts
    [10], // interestRates
    [6], // maturities
    [8] //pds
  )

  portfolio.generateLoans();
})

test('portfolio should be constructed', () => {
  expect(portfolio).toBeDefined();
  expect(portfolio.loans.length).toBe(10);
});

test('portfolio value should be calcuated', () => {
  let value = portfolio.calculateTotalValue();
  expect(value.principal).toBe(50000);
  expect(value.interest).toBe(1458.3);
});

test('portfolio at given time should be calculated for active loans', () => {
  let value = portfolio.calculateOutstandingAt(0);
  expect(value.outstandingPrincipal).toBeCloseTo(41666.7);
  expect(value.outstandingInterest).toBeCloseTo(1041.6);
})

test('portfolio at given time should be calculated for past loans', () => {
  let value = portfolio.calculateOutstandingAt(4);
  expect(value.outstandingPrincipal).toBeCloseTo(0);
  expect(value.outstandingInterest).toBeCloseTo(0);
})
