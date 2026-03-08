document.addEventListener("DOMContentLoaded", ()=>{

    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expense = JSON.parse(localStorage.getItem("expense")) || [];
    let totalAmount = calculateTotal();
    renderExpenses();
    updateTotal();


    expenseForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if(name !== "" && !isNaN(amount) && amount > 0){
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount
            }
            expense.push(newExpense);
            saveData();
            renderExpenses();
            updateTotal();

            //clear values
            expenseNameInput.value = "";
            expenseAmountInput.value = "";

        }

    });


    //important need to remember this .reduce function
    function calculateTotal(){
        return expense.reduce((sum, expense) => sum + expense.amount , 0);
    };

    function updateTotal(){
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }


    function saveData(){
        localStorage.setItem("expense", JSON.stringify(expense));
    };

    function renderExpenses(){
        expenseList.innerHTML = ``;
        expense.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button class="remove" data-id="${expense.id}">Delete</button>
            `;

            expenseList.appendChild(li);
        });
    }

    expenseList.addEventListener("click", (e)=>{
        if(e.target.classList.contains("remove")){
            const index = e.target.id;
            expense.splice(index, 1);
            saveData();
            renderExpenses();
            updateTotal();
        }
    });

    // expenseList.addEventListener("click", (e)=>{
    //     if(e.target.tagName === "BUTTON"){
    //         const expenseId = parseInt(e.target.getAttribute("data-id"));
    //         expense = expenseList.filter((expense) => expense.id !== expenseId);
    //         saveData();
    //         renderExpenses();
    //         updateTotal();
    //     }
    // })



});