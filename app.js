/*
 *
 * @ Creator : Ebere
 * @ Version : 1.0.0
 */

 /*


 */

var budgetController = (function(){
    //create Expense & Income class
    //so that a new object is created
    //for each expense and income
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


    Income.prototype.calcPercentage = function(){

    }

    //calc the total incomes or expenses
    var calcTotal = function(type){
      var sum = 0

      data.allItems[type].forEach(function(cur){
          sum += cur.value
      })

      data.totals[type] = sum

    }

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
        var ids, index;
        /*
          After so many tries, decided to
          check the array of income or expense
          find the position of object in Array
          by checking what position the object is in
          find the index then splice
        */
        ids = data.allItems[type].map(function(current) {
                return current.id;
            });
        console.log(ids)

        index = ids.indexOf(id);
        console.log(index)

        data.allItems[type].splice(index, 1);
      },
      calcBudget : function(){

          calcTotal("expense")
          calcTotal("income")

          //calc budget: income - expense
          data.budget = data.totals.income - data.totals.expense
          console.log(data.budget.income)
          if(data.totals.income > 0){
            data.percentage =  Math.round((data.totals.expense / data.totals.income) * 100)
          }else{
            data.percentage = -1
          }
      },
      getBudget : function (){
        return {
          budget : data.budget,
          totalIncome : data.totals.income,
          totalExpense : data.totals.expense,
          percentage : data.percentage
        }
      },
      test : function(){
        return data;
      }
    }
})();

/*
  UIController
*/

var UIController = (function(){

  var DOMClass = {
    inputType   : ".type",
    inputDesc   : ".desc",
    inputValue  : ".value",
    addBtn      : ".add_button",
    dateLabel   : ".datelabel",
    budgetLabel : ".totalBudget",
    incomeLabel : ".totalIncomeValue",
    expenseLabel : ".totalExpenseValue",
    percentLabel : ".percentage",
    incomeList  : ".inclist",
    expenseList : ".explist",
    delBtn      : ".item_delete",
    container : ".bugetInformation"
  }



  return {
      getInput : function(){
        return{
          //get income or expense
           type  : document.querySelector(DOMClass.inputType).value,
           desc  : document.querySelector(DOMClass.inputDesc).value,
           value : parseFloat(document.querySelector(DOMClass.inputValue).value)
        }
      },
      addListItem: function(obj, type){
        var html, element, newHtml;

        if(type === "expense"){
          //html
          element = DOMClass.expenseList
          html =  "<div class='item clearfix' id='expense-"+ obj.id +"'><div class='item-desc'>" + obj.description + "</div><div class='right'><div class='item_delete right'><button class='btn'>x</button></div><div class='item-amount right padTop5'> £" + obj.value + "</div></div></div>"
          // console.log(obj)
        }else if(type === "income"){
          element = DOMClass.incomeList
          html =  "<div class='item clearfix' id='income-"+ obj.id +"'><div class='item-desc padTop5'>" + obj.description + "</div><div class='right'><div class='item_delete right'><button class='btn'>x</button></div><div class='item-amount right padTop5'>£ " + obj.value + "</div></div></div>"
          // console.log(obj)
        }

        //<div class='item_delete'><button class='btn'>x</button></div>
        document.querySelector(element).insertAdjacentHTML("beforeend",html)

      },
      clearInput :function(){
        var fields, fieldArr;

          //returns array
          fields = document.querySelectorAll(DOMClass.inputDesc + "," + DOMClass.inputValue)
          //Tricks compiler into thinking its an object
          fieldArr = Array.prototype.slice.call(fields)

          fieldArr.forEach(function(c){
            c.value = ""
          })

      },

      displayMonth: function() {
            var now, months, month, year;

            now = new Date();
            //var christmas = new Date(2016, 11, 25);

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();

            year = now.getFullYear();
            document.querySelector(DOMClass.dateLabel).textContent = months[month] + ' ' + year;
      },
      displayBudget:function(obj){
        document.querySelector(DOMClass.budgetLabel).textContent = "£" + obj.budget.toLocaleString()
        document.querySelector(DOMClass.incomeLabel).textContent = "£" +obj.totalIncome.toLocaleString()
        document.querySelector(DOMClass.expenseLabel).textContent ="£" + obj.totalExpense.toLocaleString()

        document.querySelector(DOMClass.percentLabel).textContent = obj.percentage + "%"
      },
      delItem : function(id){
          let selector = document.querySelector("#"+id); //select the node to delete
          selector.parentNode.removeChild(selector) //move up to parentNode then remove the child
      },
      getDOMString : function(){
        return DOMClass;
      }
  }
})();


//Start app
var AppController = (function(UICtrl, budgetCtrl){
    // var z = budgetCtrl.publicTest(5);

    function allEvents(){
      var DOMClass = UICtrl.getDOMString() //get DOM String

      document.querySelector(DOMClass.addBtn).addEventListener('click', clickAddItemBtn)

      // Event Deligation because container is the parent of all items
      document.querySelector(DOMClass.container).addEventListener('click',clickDelItemBtn)

    }

    var updateBudget = function(){
      //calc budget
          budgetCtrl.calcBudget()
      //return budget
      var budget = budgetCtrl.getBudget()

      UICtrl.displayBudget(budget)


    }

    var clickAddItemBtn = function(){
      var input, newItem;

      input = UICtrl.getInput()

      if(input.desc !== "" && !isNaN(input.value) && input.value > 0){
          newItem = budgetCtrl.addItem(input.type, input.desc, input.value)

          UICtrl.addListItem(newItem, input.type)

          UICtrl.clearInput()
          // console.log(input);

          updateBudget()
      }
    }

    var clickDelItemBtn = function(event){
      var item, split, type, id;
      //Target the parent element of the button clicked and get its "id"
      // This is easier to do in jQuery
      item = event.target.parentNode.parentNode.parentNode.id;
      // UICtrl.parent.removeChild(child)
      split = item.split("-");
      type = split[0]
      id = parseInt(split[1]) //gave errors at first so i need to parse as int

      //delete from data structure
      budgetCtrl.delItem(type, id)
      //delete from UI
      UICtrl.delItem(item)
      //update budget
      updateBudget()

        console.log(event.target.parentNode.parentNode.parentNode.id)
    }



    return {
       init: function() {
         console.log("---Started ---");
         UICtrl.displayMonth();
         UICtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpense: 0,
                percentage: -1
            });

         allEvents();
       }

    }
})(UIController, budgetController);

AppController.init();
