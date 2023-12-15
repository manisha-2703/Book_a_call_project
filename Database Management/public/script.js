document.addEventListener('DOMContentLoaded', function () {
    loadTables();
  
    document.getElementById('createTableForm').addEventListener('submit', function (event) {
      event.preventDefault();
      createTable();
    });
  });
  
  function loadTables() {
    axios.get('http://localhost:3000/api/tables')
      .then(response => {
        const tableList = document.getElementById('tableList');
        tableList.innerHTML = response.data.map(table => `<li>${table.tableName}</li>`).join('');
      })
      .catch(error => {
        console.error('Error fetching tables:', error);
      });
  }
  
  function createTable() {
    const tableName = document.getElementById('tableName').value;
    const columns = document.getElementById('columns').value.split(',');
    const dataTypes = document.getElementById('dataTypes').value.split(',');
  

    axios.post('http://localhost:3000/api/tables', { tableName, columns, dataTypes })
      .then(response => {
        loadTables();
  
        document.getElementById('tableName').value = '';
        document.getElementById('columns').value = '';
        document.getElementById('dataTypes').value = '';
      })
      .catch(error => {
        console.error('Error creating table:', error);
      });
  }
  