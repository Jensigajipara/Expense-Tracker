let income = 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalExpense = calculateTotal();
updateList();
updateBalance();

function addIncome() {
    const incomeValue = Number(document.getElementById("income").value);
    if (incomeValue <= 0) return alert("Enter valid income!");

    income += incomeValue;
    document.getElementById("totalIncome").innerText = income;
    updateBalance();
    document.getElementById("income").value = "";
}

function addExpense() {
    const desc = document.getElementById("description").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    if (desc === "" || amount <= 0) return alert("Invalid input");

    const expense = {
        name: desc,
        amount,
        category
    };

    expenses.push(expense);
    saveData();
    updateList();
    updateBalance();
    
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

function updateList() {
    const list = document.getElementById("expenseList");
    list.innerHTML = "";
    
    expenses.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - ₹${item.amount} [${item.category}] 
        <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>`;
        list.appendChild(li);
    });

    document.getElementById("totalExpense").innerText = calculateTotal();
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    saveData();
    updateList();
    updateBalance();
}

function calculateTotal() {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
}

function updateBalance() {
    document.getElementById("balance").innerText = income - calculateTotal();
}

function searchExpense() {
    const filter = document.getElementById("search").value.toLowerCase();
    const listItems = document.querySelectorAll("li");

    listItems.forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(filter) ? "block" : "none";
    });
}

function saveData() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
