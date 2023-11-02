
/* let inventory = [];

// Function to load inventory from the API and update the display
function loadInventory() {
    axios.get('https://crudcrud.com/api/f3c993089ff24680aa8729939a0186df/inventory')
        .then(response => {
            inventory = response.data;
            displayInventory();
        })
        .catch(error => {
            console.error('Error loading inventory from API:', error);
        });
}

// Load inventory from local storage on page load
if (localStorage.getItem('inventory')) {
    inventory = JSON.parse(localStorage.getItem('inventory'));
    displayInventory();
    // Load the API data after displaying local storage data
    loadInventory();
} else {
    // If not found in local storage, load from the API
    loadInventory();
}

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemDesc = document.getElementById('itemDesc').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);

    if (itemName && itemDesc && !isNaN(itemPrice) && !isNaN(itemQuantity)) {
        const newItem = {
            name: itemName,
            description: itemDesc,
            price: itemPrice,
            quantity: itemQuantity
        };

        inventory.push(newItem);

        // Save the updated inventory to local storage
        localStorage.setItem('inventory', JSON.stringify(inventory));

        // Save the updated inventory to the API
        axios.post('https://crudcrud.com/api/f3c993089ff24680aa8729939a0186df/inventory', inventory)
            .then(response => {
                inventory = response.data;
                displayInventory();
            })
            .catch(error => {
                console.error('Error adding item:', error);
            });
    } else {
        alert('Please fill in all item details.');
    }
}

function buyItem(itemIndex, quantity) {
    if (inventory[itemIndex].quantity >= quantity) {
        inventory[itemIndex].quantity -= quantity;

        // Save the updated inventory to local storage
        localStorage.setItem('inventory', JSON.stringify(inventory));

        // Save the updated inventory to the API
        axios.post('https://crudcrud.com/api/f3c993089ff24680aa8729939a0186df/inventory', inventory)
            .then(response => {
                inventory = response.data;
                displayInventory();
            })
            .catch(error => {
                console.error('Error buying item:', error);
            });
    }
}

function displayInventory() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    inventory.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${item.name}</strong> - ${item.description}<br>
            Price: $${item.price.toFixed(2)}, Quantity: ${item.quantity}
            <button onclick="buyItem(${index}, 1)">Buy 1</button>
            <button onclick="buyItem(${index}, 2)">Buy 2</button>
            <button onclick="buyItem(${index}, 3)">Buy 3</button>
        `;
        itemList.appendChild(li);
    });
} */

let inventory = [];

// Function to load inventory from the API and update the display
function loadInventory() {
    axios.get('https://crudcrud.com/api/f3c993089ff24680aa8729939a0186df/inventory')
        .then(response => {
            inventory = response.data;
            displayInventory();
        })
        .catch(error => {
            console.error('Error loading inventory from API:', error);
        });
}

// Load inventory from local storage on page load
if (localStorage.getItem('inventory')) {
    inventory = JSON.parse(localStorage.getItem('inventory'));
    displayInventory();
    // Load the API data after displaying local storage data
    loadInventory();
} else {
    // If not found in local storage, load from the API
    loadInventory();
}

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemDesc = document.getElementById('itemDesc').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);

    if (itemName && itemDesc && !isNaN(itemPrice) && !isNaN(itemQuantity)) {
        const newItem = {
            name: itemName,
            description: itemDesc,
            price: itemPrice,
            quantity: itemQuantity
        };

        // Save the updated inventory to local storage
        inventory.push(newItem);
        localStorage.setItem('inventory', JSON.stringify(inventory));

        // Save the new item to the API
        axios.post('https://crudcrud.com/api/f3c993089ff24680aa8729939a0186df/inventory', newItem)
            .then(response => {
                // Update the local inventory with the response data
                inventory.push(response.data);
                displayInventory();
            })
            .catch(error => {
                console.error('Error adding item to API:', error);
            });
    } else {
        alert('Please fill in all item details.');
    }
}

function buyItem(itemIndex, quantity) {
    if (inventory[itemIndex].quantity >= quantity) {
        inventory[itemIndex].quantity -= quantity;

        // Save the updated inventory to local storage
        localStorage.setItem('inventory', JSON.stringify(inventory));

        // Prepare the payload for updating the item quantity
        const updatedQuantity = inventory[itemIndex].quantity;

        // Make a PUT request to update the item quantity
        axios.put(`https://crudcrud.com/api/f3c993089ff24680aa8729939a0186df/inventory/${inventory[itemIndex]._id}`, {
            quantity: updatedQuantity
        })
            .then(response => {
                // Update the local inventory with the response data
                inventory[itemIndex].quantity = updatedQuantity;
                displayInventory();
            })
            .catch(error => {
                console.error('Error buying item:', error);
            });
    }
}



function displayInventory() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    inventory.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${item.name}</strong> - ${item.description}<br>
            Price: $${item.price.toFixed(2)}, Quantity: ${item.quantity}
            <button onclick="buyItem(${index}, 1)">Buy 1</button>
            <button onclick="buyItem(${index}, 2)">Buy 2</button>
            <button onclick="buyItem(${index}, 3)">Buy 3</button>
        `;
        itemList.appendChild(li);
    });
}

// Initial load of inventory
loadInventory();
