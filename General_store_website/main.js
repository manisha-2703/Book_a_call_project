

let inventory = [];

async function loadInventory() {
    try {
        inventory = [];
        const response = await axios.get('https://crudcrud.com/api/c84bc8ee31b24a0fac552f8d589e553d/inventory');
        inventory = response.data;
        displayInventory();
    } catch (error) {
        console.error('Error loading inventory from API:', error);
    }
}

async function addItem() {
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

        try {
            const response = await axios.post('https://crudcrud.com/api/c84bc8ee31b24a0fac552f8d589e553d/inventory', newItem);
            inventory.push(response.data);
            displayInventory();
        } catch (error) {
            console.error('Error adding item to API:', error);
        }
    } else {
        alert('Please fill in all item details.');
    }
}

async function buyItem(itemIndex, quantity) {
    if (inventory[itemIndex].quantity >= quantity) {
        inventory[itemIndex].quantity -= quantity;

        try {
            const updatedQuantity = inventory[itemIndex].quantity;
            await axios.put(`https://crudcrud.com/api/c84bc8ee31b24a0fac552f8d589e553d/inventory/${inventory[itemIndex]._id}`, {
                quantity: updatedQuantity
            });
            inventory[itemIndex].quantity = updatedQuantity;
            displayInventory();
        } catch (error) {
            console.error('Error buying item:', error);
        }
    }
}

async function deleteItem(itemIndex) {
    try {
        await axios.delete(`https://crudcrud.com/api/c84bc8ee31b24a0fac552f8d589e553d/inventory/${inventory[itemIndex]._id}`);
        inventory.splice(itemIndex, 1);
        displayInventory();
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}

function displayInventory() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    if (inventory.length === 0) {
        itemList.innerHTML = '<tr><td colspan="6">No items in inventory.</td></tr>';
        return;
    }

    const tbody = document.getElementById('itemList');

    inventory.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>${item.price ? `$${item.price.toFixed(2)}` : 'N/A'}</td>
            <td>${item.quantity}</td>
            <td>
                <button onclick="buyItem(${index}, 1)">Buy 1</button>
                <button onclick="buyItem(${index}, 2)">Buy 2</button>
                <button onclick="buyItem(${index}, 3)">Buy 3</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}


try {
    // Initial load of inventory
    loadInventory();
} catch (error) {
    console.error('Error during initial load:', error);
}
