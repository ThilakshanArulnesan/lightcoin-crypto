//let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username;
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
    //  this.account.balance += this.value; //takes negative of stored value if its a withdrawal, else + of value
    //this.value calls the get value() function
    this.time = new Date();
    this.account.addTransaction(this);
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

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
