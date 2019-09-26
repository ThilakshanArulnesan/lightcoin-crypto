//let balance = 500.00;

class Account {

  constructor() {
    //this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }
  commit() {
    this.account.balance += this.amount;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
  get balance() {
    //Add up vals of all transactions
    let tot = 0;
    for (let transaction in this.transactions) {
      tot += this.transactions[transaction].value;
    }
    return tot;
  }

}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }


  commit() {
    //Are we able to proceed?
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }

    return false;
  }

  isAllowed() {
    if (this.value > 0) return true; //We're depositing, no check required.
    if (this.account.balance < -this.value) { //Trying to take out more than is in the account
      console.log(`Could not make withdrawal. Insufficient funds, you currently have $ ${this.account.balance} in your account.`);
      return false;
    }
    return true;
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

}

class Withdrawal extends Transaction {

  // Update the balance in the account
  get value() {
    return -this.amount;
  }

}
/*

class Deposit {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }


  commit() {
    this.account.balance += this.amount;
  }

};

*/


// DRIVER CODE BELOW
/*
const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(1000.00, myAccount);
t2.commit();


console.log('Ending Balance:', myAccount.balance);
*/
//Extra tests:
// DRIVER CODE (yes, keep everything in one file for now... b/c cog load)
const myAccount = new Account();

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);
