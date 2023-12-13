/* document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('expenseForm');
    const submitButton = document.getElementById('submitBtn');
    const expenseListContainer = document.getElementById('expenseList');

    function displayExpenses(expenses) {
        expenseListContainer.innerHTML = '';

        if (!Array.isArray(expenses)) {
            console.error('Invalid expenses response:', expenses);
            return;
        }

        expenses.forEach((expense, index) => {
            const expenseDiv = document.createElement('div');
            expenseDiv.classList.add('expense-details');

            const expenseParagraph = document.createElement('p');
            expenseParagraph.textContent = `Expense: $${expense.expense}`;

            const descriptionParagraph = document.createElement('p');
            descriptionParagraph.textContent = `Description: ${expense.description}`;

            const categoryParagraph = document.createElement('p');
            categoryParagraph.textContent = `Category: ${expense.category}`;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editExpense(index));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteExpense(expense.id));

            expenseDiv.appendChild(expenseParagraph);
            expenseDiv.appendChild(descriptionParagraph);
            expenseDiv.appendChild(categoryParagraph);
            expenseDiv.appendChild(editButton);
            expenseDiv.appendChild(deleteButton);

            expenseListContainer.appendChild(expenseDiv);
        });
    }

    function handleFormSubmit() {
        event.preventDefault();

        const expense = document.getElementById('expense').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;

        const newExpense = {
            expense: parseFloat(expense),
            description: description,
            category: category,
        };

        axios.post('/expenses', newExpense)
            .then(response => response.data)
            .then(data => {
                fetchExpenses();
            })
            .catch(error => console.error('Error adding expense:', error));
    }

    function fetchExpenses() {
        axios.get('/expenses')
            .then(response => {
                if (!response.data) {
                    throw new Error('No data received from the server');
                }
                displayExpenses(response.data);
            })
            .catch(error => {
                console.error(error);
                // Handle the error or provide user feedback
            });
    }

    function deleteExpense(expenseId) {
        axios.delete(`/expenses/${expenseId}`)
            .then(response => response.data)
            .then(data => {
                fetchExpenses();
            })
            .catch(error => console.error('Error deleting expense:', error));
    }

    function editExpense(index) {
        
        console.log('Edit expense at index', index);
    }

    submitButton.addEventListener('click', handleFormSubmit);

    // Fetch initial expenses on page load
    fetchExpenses();
});
 */

// public/script.js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('expenseForm');
    const submitButton = document.getElementById('submitBtn');
    const expenseListContainer = document.getElementById('expenseList');
    const editForm = document.getElementById('editExpenseForm'); // Add this line

    function displayExpenses(expenses) {
        expenseListContainer.innerHTML = '';

        if (!Array.isArray(expenses)) {
            console.error('Invalid expenses response:', expenses);
            return;
        }

        expenses.forEach((expense, index) => {
            const expenseDiv = document.createElement('div');
            expenseDiv.classList.add('expense-details');

            const expenseParagraph = document.createElement('p');
            expenseParagraph.textContent = `Expense: $${expense.expense}`;

            const descriptionParagraph = document.createElement('p');
            descriptionParagraph.textContent = `Description: ${expense.description}`;

            const categoryParagraph = document.createElement('p');
            categoryParagraph.textContent = `Category: ${expense.category}`;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editExpense(expense));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteExpense(expense.id));

            expenseDiv.appendChild(expenseParagraph);
            expenseDiv.appendChild(descriptionParagraph);
            expenseDiv.appendChild(categoryParagraph);
            expenseDiv.appendChild(editButton);
            expenseDiv.appendChild(deleteButton);

            expenseListContainer.appendChild(expenseDiv);
        });
    }

    function handleFormSubmit() {
        event.preventDefault();

        const expense = document.getElementById('expense').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;

        const newExpense = {
            expense: parseFloat(expense),
            description: description,
            category: category,
        };

        axios.post('/expenses', newExpense)
            .then(response => response.data)
            .then(data => {
                fetchExpenses();
            })
            .catch(error => console.error('Error adding expense:', error));
    }

    function fetchExpenses() {
        axios.get('/expenses')
            .then(response => {
                if (!response.data) {
                    throw new Error('No data received from the server');
                }
                displayExpenses(response.data);
            })
            .catch(error => {
                console.error(error);
                // Handle the error or provide user feedback
            });
    }

    function deleteExpense(expenseId) {
        axios.delete(`/expenses/${expenseId}`)
            .then(response => response.data)
            .then(data => {
                fetchExpenses();
            })
            .catch(error => console.error('Error deleting expense:', error));
    }

    function editExpense(expense) {
        // Populate the edit form with expense details
        document.getElementById('editExpenseId').value = expense.id;
        document.getElementById('editExpense').value = expense.expense;
        document.getElementById('editDescription').value = expense.description;
        document.getElementById('editCategory').value = expense.category;

        // Show the edit form
        editForm.style.display = 'block';
    }

    // Add event listener for the "Update Expense" button in the edit form
    document.getElementById('updateBtn').addEventListener('click', function () {
        updateExpense();
    });

    // Add event listener for the "Cancel" button in the edit form
    document.getElementById('cancelBtn').addEventListener('click', function () {
        // Hide the edit form
        editForm.style.display = 'none';
    });

    // Function to send a request to update the expense
    function updateExpense() {
        const id = document.getElementById('editExpenseId').value;
        const expense = document.getElementById('editExpense').value;
        const description = document.getElementById('editDescription').value;
        const category = document.getElementById('editCategory').value;

        const updatedExpense = {
            expense: parseFloat(expense),
            description: description,
            category: category,
        };

        axios.put(`/expenses/${id}`, updatedExpense)
            .then(response => response.data)
            .then(data => {
                // Hide the edit form
                editForm.style.display = 'none';

                // Fetch updated expenses
                fetchExpenses();
            })
            .catch(error => console.error('Error updating expense:', error));
    }

    submitButton.addEventListener('click', handleFormSubmit);

    // Fetch initial expenses on page load
    fetchExpenses();
});
