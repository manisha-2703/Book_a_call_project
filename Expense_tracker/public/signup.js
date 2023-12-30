document.addEventListener('DOMContentLoaded', function () {
    const signup = document.querySelector(".signup");
    const login = document.querySelector(".login");
    const slider = document.querySelector(".slider");
    const formSection = document.querySelector(".form-section");

    signup.addEventListener("click", () => {
      slider.classList.add("moveslider");
      formSection.classList.add("form-section-move");
    });

    login.addEventListener("click", () => {
      slider.classList.remove("moveslider");
      formSection.classList.remove("form-section-move");
    });

    const signupForm = document.querySelector('.signup-box');
    //const loginForm = document.querySelector('.login-box');

    function handleSignupSubmit(event) {
      event.preventDefault();

      // Get form data
      const name = signupForm.querySelector('.name').value;
      const email = signupForm.querySelector('.email').value;
      const password = signupForm.querySelector('.password').value;

      // Send data to server
      axios.post('http://localhost:3000/users/signup', { name, email, password })
        .then(response => {
          console.log(response.data);
          // Redirect to expenses page or handle it as needed
          window.location.href = 'expenses.html';
        })
        .catch(error => {
            console.error('Error logging in user:', error.response.status, error.response.data);

            // Check if the error is due to user not existing
            if (error.response.status === 400) {
                // User not found or incorrect password
                const errorMessageElement = document.getElementById('errorMessages');
                errorMessageElement.textContent = 'User already exists. Please log in';
                errorMessageElement.style.display = 'block';
            } else {
                // Handle other errors
                const errorMessageElement = document.getElementById('errorMessages');
                errorMessageElement.textContent = 'An error occurred. Please try again later.';
                errorMessageElement.style.display = 'block';
            }
        });
    }

    const signinForm = document.querySelector('.login-box');

    function handleSigninSubmit(event) {
      event.preventDefault();

      // Get form data
      const email = signinForm.querySelector('.email').value;
      const password = signinForm.querySelector('.password').value;

      // Send data to server for sign-in
      axios.post('http://localhost:3000/users/login', { email, password })
        .then(response => {
          console.log(response.data);
          // Redirect to expenses page or handle it as needed
          window.location.href = 'expenses.html';
        })
        .catch(error => {
            console.error('Error logging in user:', error.response.status, error.response.data);

            // Check if the error is due to user not existing
            if (error.response.status === 401) {
                // User not found or incorrect password
                const errorMessageElement = document.getElementById('errorMessage');
                errorMessageElement.textContent = 'Invalid email or password. Please try again.';
                errorMessageElement.style.display = 'block';
            } else {
                // Handle other errors
                const errorMessageElement = document.getElementById('errorMessage');
                errorMessageElement.textContent = 'An error occurred. Please try again later.';
                errorMessageElement.style.display = 'block';
            }
        });
    }

    signupForm.querySelector('.clkbtn').addEventListener('click', handleSignupSubmit);
    signinForm.querySelector('.clkbtn').addEventListener('click', handleSigninSubmit);
  });


/* document.addEventListener('DOMContentLoaded', function () {
    const signupBtn = document.getElementById('signupBtn');
    const signinBtn = document.getElementById('signinBtn');
    const nameField = document.getElementById('nameField');
    const title = document.getElementById('title');

    signinBtn.onclick = function () {
        nameField.style.maxHeight = "0";
        title.innerHTML = "Sign In";
        signupBtn.classList.add("disable");
        signinBtn.classList.remove("disable");
    };

    signupBtn.onclick = function () {
        nameField.style.maxHeight = "60px";
        title.innerHTML = "Sign Up";
        signupBtn.classList.remove("disable");
        signinBtn.classList.add("disable");
    };

    const signupForm = document.getElementById('signupForm');
    function handleSignupSubmit(event) {
        event.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Send data to server
        axios.post('http://localhost:3000/users/signup', { name, email, password })
            .then(response => {
                console.log(response.data);
                // Redirect to expenses page or handle it as needed
                window.location.href = 'expenses.html';
            })
            .catch(error => {
                console.error('Error signing up user:', error);
                // Display error message on the page
                const errorMessageElement = document.getElementById('errorMessage');
                errorMessageElement.textContent = 'User already exists. Please log in.';
                errorMessageElement.style.display = 'block';

                // Handle error (show error message, etc.)
            });

    }
    signupForm.addEventListener('dblclick', handleSignupSubmit);

    const signinForm = document.getElementById('signinForm');

    function handleSigninSubmit(event) {
        event.preventDefault();

        // Get form data
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Send data to server for sign-in
        axios.post('http://localhost:3000/users/login', { email, password })
            .then(response => {
                console.log(response.data);
                // Redirect to expenses page or handle it as needed
                window.location.href = 'expenses.html';
            })
            .catch(error => {
                console.error('Error logging in user:', error.response.status, error.response.data);

                // Check if the error is due to user not existing
                if (error.response.status === 401) {
                    // User not found or incorrect password
                    const errorMessageElement = document.getElementById('errorMessage');
                    errorMessageElement.textContent = 'Invalid email or password. Please try again.';
                    errorMessageElement.style.display = 'block';
                } else {
                    // Handle other errors
                    const errorMessageElement = document.getElementById('errorMessage');
                    errorMessageElement.textContent = 'An error occurred. Please try again later.';
                    errorMessageElement.style.display = 'block';
                }
            });
    }

    signinForm.addEventListener('dblclick', handleSigninSubmit);
});
 */


   /*  const signupForm = document.getElementById('signupForm');
    const signupBtn = document.getElementById('signupBtn');
    const signupPage = document.getElementById('signupPage');
    const expensesPage = document.getElementById('expensesPage');

    function hideForm(form) {
        form.style.display = 'none';
    }

    function showForm(form) {
        form.style.display = 'block';
    }

    function hidePage(page) {
        page.style.display = 'none';
    }

    function showPage(page) {
        page.style.display = 'block';
    }

    function handleSignupSubmit() {
        event.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        // Check if the email already exists
        axios.get(`http://localhost:3000/users/check-email/${email}`)
            .then(response => response.data)
            .then(data => {
                if (data.exists) {
                    console.error('User already exists.');
                    document.getElementById('signupMessage').textContent = 'User already exists. Please log in.';
                    document.getElementById('signupMessage').style.display = 'block';
                } else {
                    // If email is not present, proceed with user creation
                    const newUser = {
                        name: name,
                        email: email,
                        password: password,
                    };

                    axios.post('http://localhost:3000/users/signup', newUser)
                        .then(response => response.data)
                        .then(data => {
                            console.log('User signed up successfully:', data);
                            hidePage(signupPage);
                            showPage(expensesPage);
                            fetchExpenses(); // Fetch expenses upon navigating to the expenses page
                        })
                        .catch(error => {
                            console.error('Error signing up user:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Error checking email:', error);
            });
    }

    signupBtn.addEventListener('click', handleSignupSubmit); */