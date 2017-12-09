(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// module.exports = function(x) {
//     console.log(x);
//     console.lg(y);
// };


// function name(a, b){
//   return a + b;
// }


var budgetController = (function(){

    class Expense{
      constructor(id, description, value) {
          this.id = id
          this.description = description
          this.value = value
          this.percentage = -1
        }
    }

    Expense.prototype.calcPercentage = function (totalIncome) {
        (totalIncome > 0) ? this.percentage = (Math.round(this.value/totalIncome) * 100) : this.percentage = -1
    }

    class Income{
      constructor(id, description, value) {
          this.id = id
          this.description = description
          this.value = value
          this.percentage = -1
        }
    }


    Income.prototype.calcPercentage = function(){}

    // function calc

    var data = {
        allItems: {
            expense: [], //store all expenses
            income: [] //all incomes
        },
        totals: {
            expense: 0,
            income: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
      addItem : function(type, des, val){
          var newItem, id;
          // 1,3,5,6

          console.log(data.allItems[type].length)
          //check array length then increment
          if(data.allItems[type].length > 0){
              id = data.allItems[type][data.allItems[type].length - 1].id + 1
          }else{
              id = 0
          }

          if(type === "expense"){
            newItem = new Expense(id, des, val)
          }else if(type === "income"){
            newItem = new Income(id, des, val)
          }

          data.allItems[type].push(newItem)

          return newItem
      },
      delItem : function(type,id) {
        // data.allItems[type]
        console.log(data.allItems[type][id]);
      }
    }
})();

module.exports = budgetController;

},{}]},{},[1]);
