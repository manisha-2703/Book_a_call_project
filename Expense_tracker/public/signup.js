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
    const loginForm = document.querySelector('.login-box');

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
          console.error('Error signing up user:', error);
          // Display error message on the page
          const errorMessageElement = signupForm.querySelector('.errorMessage');
          errorMessageElement.textContent = 'User already exists. Please log in.';
          errorMessageElement.style.display = 'block';
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
            const errorMessageElement = signinForm.querySelector('.errorMessage');
            errorMessageElement.textContent = 'Invalid email or password. Please try again.';
            errorMessageElement.style.display = 'block';
          } else {
            // Handle other errors
            const errorMessageElement = signinForm.querySelector('.errorMessage');
            errorMessageElement.textContent = 'An error occurred. Please try again later.';
            errorMessageElement.style.display = 'block';
          }
        });
    }

    signupForm.querySelector('.clkbtn').addEventListener('click', handleSignupSubmit);
    signinForm.querySelector('.clkbtn').addEventListener('click', handleSigninSubmit);
  });
