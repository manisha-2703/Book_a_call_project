document.addEventListener('DOMContentLoaded', function () {
  const createTableBtn = document.getElementById('createTableBtn');
  const tableList = document.getElementById('tableList');
  const createTableFormContainer = document.getElementById('createTableFormContainer');
  const insertRecordFormContainer = document.getElementById('insertRecordFormContainer');
  const tableContainer = document.getElementById('tableContainer');

  createTableBtn.addEventListener('click', showCreateTableForm);

  async function showCreateTableForm() {
    createTableFormContainer.innerHTML = '';

    const form = document.createElement('form');
    form.innerHTML = `
      <label for="tableName">Table Name:</label>
      <input type="text" id="tableName" name="tableName" required>
      <label for="fieldName">Field Name:</label>
      <input type="text" id="fieldName" name="fieldName" required>
      <label for="fieldType">Field Type:</label>
      <input type="text" id="fieldType" name="fieldType" required>
      <button type="button" onclick="addAnotherField()">+ Add Another Field</button>
      <button type="button" onclick="createTable()">Create Table</button>
    `;
    createTableFormContainer.appendChild(form);

    createTableFormContainer.style.display = 'block';
  }

  window.addAnotherField = function () {
    const form = createTableFormContainer.querySelector('form');
    const fieldContainer = document.createElement('div');
    fieldContainer.innerHTML = `
      <label for="fieldName">Field Name:</label>
      <input type="text" name="fieldName" required>
      <label for="fieldType">Field Type:</label>
      <input type="text" name="fieldType" required>
    `;
    form.insertBefore(fieldContainer, form.lastChild);
  };

  window.createTable = async function () {
    const tableName = document.getElementById('tableName').value;
    const fields = [];
    const fieldInputs = createTableFormContainer.querySelectorAll('input[name="fieldName"]');
    fieldInputs.forEach((input, index) => {
      const fieldTypeInput = createTableFormContainer.querySelectorAll('input[name="fieldType"]')[index];
      fields.push({ name: input.value, type: fieldTypeInput.value });
    });

    try {
      const response = await fetch('http://localhost:3000/tables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableName, columns: fields }),
      });

      if (!response.ok) {
        throw new Error(`Error creating table: ${response.status}`);
      }

      alert('Table created successfully!');
      await loadTableList();
      createTableFormContainer.style.display = 'none';
    } catch (error) {
      console.error('Error creating table:', error.message);
      alert('Error creating table');
    }
  };

  async function loadTableList() {
    try {
      const response = await fetch('http://localhost:3000/tables');
      if (!response.ok) {
        throw new Error(`Error getting tables: ${response.status}`);
      }

      const data = await response.json();
      renderTableList(data.tables);
    } catch (error) {
      console.error('Error fetching tables:', error.message);
      alert('Error fetching tables');
    }
  }

  function renderTableList(tables) {
    tableList.innerHTML = '';
    tables.forEach(tableName => {
      const li = document.createElement('li');
      li.textContent = tableName;
      li.addEventListener('click', () => {
        showTable(tableName);
      });
      tableList.appendChild(li);
    });
  }

  // Function to show a table
  // Function to show a table
async function showTable(tableName) {
  try {
    // Fetch table structure data
    const structureResponse = await fetch(`http://localhost:3000/structure/${tableName}`);
    console.log('Structure Response:', structureResponse); // Log the entire response

    if (!structureResponse.ok) {
      throw new Error(`Failed to fetch table structure. Status: ${structureResponse.status}`);
    }

    const structureData = await structureResponse.json();
    console.log('Structure data:', structureData);

    // Check if structureData.columns is an array
    if (!Array.isArray(structureData.columns)) {
      console.error('Columns is not an array:', structureData.columns);
      return;
    }

    // Render the table with empty records array and structureData.columns
    renderTable([], structureData.columns);

    // Show "Insert Record" button
    const insertRecordBtn = document.getElementById('insertRecordBtn');
    insertRecordBtn.style.display = 'block';

    // Hide insert record form container
    insertRecordFormContainer.style.display = 'none';

    // Call showInsertRecordForm with columns
    showInsertRecordForm(structureData.columns, tableName);
  } catch (error) {
    console.error('Error fetching table structure:', error.message);
    alert('Error fetching table structure');
  }
}

  // Function to get user-defined columns for the specific table
  function getUserDefinedColumns(allColumns, tableName) {
    // Assume you have some logic to determine user-defined columns
    // For simplicity, let's say user-defined columns are the first half of all columns
    const totalColumns = allColumns.length;
    const userDefinedColumns = allColumns.slice(0, Math.ceil(totalColumns / 2));
    return userDefinedColumns;
  }

  // Event listener for "Insert Record" button
  const insertRecordBtn = document.getElementById('insertRecordBtn');
  insertRecordBtn.addEventListener('click', showInsertRecordForm);

  // Function to show the insert record form
  // Function to show the insert record form
function showInsertRecordForm(columns, tableName) {
  // Clear previous content in the form container
  insertRecordFormContainer.innerHTML = '';

  // Get the user-defined columns for the specific table
  const userDefinedColumns = getUserDefinedColumns(columns, tableName);

  // Create the form
  const form = document.createElement('form');

  // Create form elements for each user-defined column
  userDefinedColumns.forEach(column => {
    const label = document.createElement('label');
    label.textContent = `${column}: `;
    form.appendChild(label);

    const input = document.createElement('input');
    input.type = 'text';
    input.name = column.name; // Use the column name as the input name
    form.appendChild(input);
  });

  // Create the submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.textContent = 'Insert Record';
  submitButton.addEventListener('click', () => insertRecord(tableName, userDefinedColumns));
  form.appendChild(submitButton);

  // Append the form to the form container
  insertRecordFormContainer.appendChild(form);

  // Show the form container
  insertRecordFormContainer.style.display = 'block';
}

// Function to insert a record
async function insertRecord(tableName, columns) {
  const values = {};

  // Get values from the form inputs
  columns.forEach(column => {
    const input = insertRecordFormContainer.querySelector(`input[name="${column.name}"]`);
    values[column.name] = input.value; // Use the column name as the key in values
  });

  try {
    const response = await fetch(`http://localhost:3000/records/${tableName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values, columns }), // Include columns in the payload
    });

    console.log('Response status:', response.status);
    console.log('Response data:', await response.json());

    if (response.ok) {
      alert('Record inserted successfully!');
      showTable(tableName);
      insertRecordFormContainer.style.display = 'none';
    } else {
      throw new Error(`Error inserting record: ${response.status}`);
    }
  } catch (error) {
    console.error('Error inserting record:', error.message);
    alert('Error inserting record');
  }
}

  // Function to render a table
  function renderTable(records, columns) {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';
  
    if (columns.length === 0) {
      const noFieldsMessage = document.createElement('p');
      noFieldsMessage.textContent = 'No fields available.';
      tableContainer.appendChild(noFieldsMessage);
      return;
    }
  
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
  
    columns.forEach(column => {
      const th = document.createElement('th');
      th.textContent = column.name; // Access the column name property
      headerRow.appendChild(th);
    });
  
    table.appendChild(headerRow);
  
    if (records.length === 0) {
      const messageRow = document.createElement('tr');
      const messageCell = document.createElement('td');
      messageCell.colSpan = columns.length;
      messageCell.textContent = 'No records available.';
      messageRow.appendChild(messageCell);
      table.appendChild(messageRow);
    } else {
      records.forEach(record => {
        const row = document.createElement('tr');
  
        columns.forEach(column => {
          const cell = document.createElement('td');
          cell.textContent = record[column.name] || ''; // Access the column name property
          row.appendChild(cell);
        });
  
        table.appendChild(row);
      });
    }
  
    tableContainer.appendChild(table);
  
    const insertRecordBtn = document.getElementById('insertRecordBtn');
    insertRecordBtn.style.display = records.length === 0 ? 'block' : 'none';
  }
  
  loadTableList();
}); 