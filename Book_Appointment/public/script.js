document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('callForm');
    const submitButton = document.getElementById('submitBtn');
    const userListContainer = document.getElementById('userListContainer');

    function displayUserDetails(users) {
        userListContainer.innerHTML = '';
    
        if (Array.isArray(users) && users.length > 0) {
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                const userDiv = document.createElement('div');
                userDiv.classList.add('user-details');
    
                const nameParagraph = document.createElement('p');
                nameParagraph.textContent = `Name: ${user.name}`;
    
                const emailParagraph = document.createElement('p');
                emailParagraph.textContent = `Email: ${user.email}`;
    
                const phoneParagraph = document.createElement('p');
                phoneParagraph.textContent = `Phone: ${user.phone || 'N/A'}`;
    
                const dateTimeParagraph = document.createElement('p');
                dateTimeParagraph.textContent = `Date ${user.dateTime} `;
    
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => editUserData(user.id));
    
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteUserData(user.id));
    
                userDiv.appendChild(nameParagraph);
                userDiv.appendChild(emailParagraph);
                userDiv.appendChild(phoneParagraph);
                userDiv.appendChild(dateTimeParagraph);
                userDiv.appendChild(editButton);
                userDiv.appendChild(deleteButton);
                userListContainer.appendChild(userDiv);
            }
        }
    }
    

    function fetchUserDetails() {
        axios.get("/")
            .then((response) => {
                const users = response.data.data;
                displayUserDetails(users);
            })
            .catch((err) => {
                console.log('Error fetching user details:', err);
            });
    }

    function deleteUserData(userId) {
        axios.delete(`/deleteUser/${userId}`)
            .then(response => {
                console.log('User deleted successfully:', response);
                fetchUserDetails(); // Refresh the user list
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }

    function editUserData(userId) {
        axios.get(`/getUser/${userId}`)
            .then(response => {
                const userData = response.data.data;
                populateFormWithUserData(userData);
            })
            .catch(error => {
                console.error('Error fetching user data for editing:', error);
            });
    }

    // Add other functions as needed

    function populateFormWithUserData(userDetails) {
        // Populate form fields with user details for editing
        document.getElementById('fname').value = userDetails.name;
        document.getElementById('email').value = userDetails.email;
        document.getElementById('Phone').value = userDetails.phone || '';
        document.getElementById('date').value = userDetails.date;
        document.getElementById('time').value = userDetails.time;
    }

    function handleFormSubmit(event) {
        event.preventDefault(); // Prevent the default form submission
    
        const name = document.getElementById('fname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('Phone').value;
        const dateTime = document.getElementById('date').value;
        const time = document.getElementById('time').value;
    
        const userData = {
            name,
            email,
            phone,
            dateTime,
            time
        };
    
        axios.post("/addUser", userData)
            .then((response) => {
                console.log('User added successfully:', response);
                fetchUserDetails(); // Refresh the user list
            })
            .catch((err) => {
                console.log('Axios Error:', err);
            });
    
        form.reset();
    
        // Add this line to prevent the default form submission behavior
        return false;
    
    }
    
    submitButton.addEventListener('click', handleFormSubmit);
    
    // Fetch initial user details on page load
    fetchUserDetails();
});




