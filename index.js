const LoanJS = require('loanjs');
const _ = require('lodash');
const rnd = num => Math.round(num * 100) / 100

class Portfolio {

  constructor(numberOfLoans, startingMonths, amounts, interestRates, maturities, pds) {
    this.numberOfLoans = numberOfLoans;
    this.startingMonths = startingMonths;
    this.amounts = amounts;
    this.interestRates = interestRates;
    this.maturities = maturities;
    this.pds = pds;
    this.loans = [];
  }


  /* Generate a sample of loans */
  generateLoans() {
    for ( var i = 0; i < this.numberOfLoans; i++ ) {
      let loan = new LoanJS.Loan(
        _.sample(this.amounts),
        _.sample(this.maturities),
        _.sample(this.interestRates),
        true
      )
      loan.startingMonth = _.sample(this.startingMonths);
      this.loans.push(loan);
    }
  }

  /* Calculate total interest and principal of portfolio, without defaults or regards to when the loans were issued */
  calculateTotalValue() {
    return({
      principal: _.sumBy(this.loans, (loan) => loan.amount ),
      interest: _.sumBy(this.loans, (loan) => loan.interestSum )
    })
  }

  // Calculate outstanding principal and interest at given month
  // only loans current active
  calculateOutstandingAt(month) {
    return({
      outstandingPrincipal: rnd(_.sumBy(this.loans, (loan) =>
        this.isLoanActive(loan, month) ? loan.installments[month].remain : 0
      )),
      outstandingInterest: rnd(_.sumBy(this.loans, (loan) =>
        this.isLoanActive(loan, month) ? loan.interestSum - loan.installments[month].interestSum : 0
      ))
    })
  }

  // returns true if the loan has outstanding principal during the months
  // TODO: remove loans that are in default
  isLoanActive(loan, month) {
    return loan.startingMonth <= month && month < loan.startingMonth + loan.installments.length
  }
}

module.exports = Portfolio;
