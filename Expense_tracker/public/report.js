document.addEventListener('DOMContentLoaded', function () {
    const monthHeading = document.getElementById('monthHeading');
    const reportTableBody = document.querySelector('#reportTable tbody');
    const totalSalaryExpenses = document.getElementById('totalSalaryExpenses');
    const totalExpensesWithoutSalary = document.getElementById('totalExpensesWithoutSalary');
    const savings = document.getElementById('savings');
    const yearlyReportContainer = document.getElementById('yearlyReportContainer');
    const yearlyReportTableBody = document.querySelector('#yearlyReportTable tbody');

    // Fetch and display expenses for the current month
    fetchExpensesForCurrentMonth();

    // Function to fetch and display expenses for the current month
    async function fetchExpensesForCurrentMonth() {
        try {
            const token = localStorage.getItem('token');
            const currentDate = new Date();
            const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
            const currentYear = currentDate.getFullYear();
            const response = await axios.get(`http://localhost:3000/expenses?month=${currentMonth}&year=${currentYear}`, {
                headers: { "Authorization": token }
            });

            if (response.data) {
                // Display the current month in the heading
                monthHeading.textContent = `${currentMonth} ${currentYear}`;

                // Clear existing table content
                reportTableBody.innerHTML = '';

                // Process and display each expense
                response.data.forEach(expense => {
                    const row = document.createElement('tr');

                    const dateCell = document.createElement('td');
                    dateCell.textContent = expense.date;
                    row.appendChild(dateCell);

                    const categoryCell = document.createElement('td');
                    categoryCell.textContent = expense.category;
                    row.appendChild(categoryCell);

                    const descriptionCell = document.createElement('td');
                    descriptionCell.textContent = expense.description;
                    row.appendChild(descriptionCell);

                    const expensesCell = document.createElement('td');
                    expensesCell.textContent = `$${expense.expense}`;
                    row.appendChild(expensesCell);

                    reportTableBody.appendChild(row);
                });

                // Calculate and display total salary expenses, total expenses (without salary), and savings
                const salaryExpenses = response.data.filter(expense => expense.category.toLowerCase() === 'salary');
                const expensesWithoutSalary = response.data.filter(expense => expense.category.toLowerCase() !== 'salary');

                const totalSalary = salaryExpenses.reduce((total, expense) => total + expense.expense, 0);
                const totalWithoutSalary = expensesWithoutSalary.reduce((total, expense) => total + expense.expense, 0);
                const totalSavings = totalSalary - totalWithoutSalary;

                totalSalaryExpenses.textContent = `$${totalSalary}`;
                totalExpensesWithoutSalary.textContent = `$${totalWithoutSalary}`;
                savings.textContent = `$${totalSavings}`;
            }
        } catch (error) {
            console.error('Error fetching expenses for the report:', error);
        }
    }
    // Fetch and display yearly expenses
    fetchYearlyExpenses();

    // Function to fetch and display yearly expenses
    async function fetchYearlyExpenses() {
        try {
            const token = localStorage.getItem('token');
            const currentYear = new Date().getFullYear();
            const response = await axios.get(`http://localhost:3000/expenses/yearly?year=${currentYear}`, {
                headers: { "Authorization": token }
            });

            if (response.data) {
                // Clear existing table content
                yearlyReportTableBody.innerHTML = '';

                // Process and display each month's data
                response.data.forEach(monthData => {
                    const row = document.createElement('tr');

                    const monthCell = document.createElement('td');
                    monthCell.textContent = monthData.month;
                    row.appendChild(monthCell);

                    const totalSalaryCell = document.createElement('td');
                    totalSalaryCell.textContent = `$${monthData.totalSalary}`;
                    row.appendChild(totalSalaryCell);

                    const expensesWithoutSalaryCell = document.createElement('td');
                    expensesWithoutSalaryCell.textContent = `$${monthData.totalExpensesWithoutSalary}`;
                    row.appendChild(expensesWithoutSalaryCell);

                    const savingsCell = document.createElement('td');
                    savingsCell.textContent = `$${monthData.savings}`;
                    row.appendChild(savingsCell);

                    yearlyReportTableBody.appendChild(row);
                });

                // Show the yearly report container
                yearlyReportContainer.style.display = 'block';
            }
        } catch (error) {
            console.error('Error fetching yearly expenses:', error);
        }
    }

    // Add event listener for the "Home" button
    document.getElementById('home').addEventListener('click', function () {
        // Redirect to the home page
        window.location.href = 'expenses.html';
    });

    // Add event listener for the "Yearly Report" button
    document.getElementById('showYearlyReportBtn').addEventListener('click', function () {
        // Fetch and display yearly expenses
        fetchYearlyExpenses();

        // Hide the day-to-day expenses table
        document.getElementById('reportTable').style.display = 'none';
    });

    // Add event listener for the "Home" button
    document.getElementById('home').addEventListener('click', function () {
        // Redirect to the home page
        window.location.href = 'expenses.html';
    });
});
