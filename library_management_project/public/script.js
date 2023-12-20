function borrowBook() {
  const title = document.getElementById('search').value;

  axios.post('http://localhost:3000/borrow', { title })
    .then(response => {
      const data = response.data;
      alert(data.success ? 'Book borrowed successfully!' : data.error);
      location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error borrowing book');
    });
}

function returnBook(id) {
  axios.post('http://localhost:3000/return', { id })
    .then(response => {
      const data = response.data;
      if (data.success) {
        alert(`Fine: ${data.fine} Rupees`);
      } else {
        alert(data.error);
      }
      location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error returning book');
    });
}

function payFine(id) {
  axios.post('http://localhost:3000/payfine', { id })
    .then(response => {
      const data = response.data;
      alert(data.success ? 'Fine paid successfully!' : data.error);
      location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error paying fine');
    });
}

document.addEventListener('DOMContentLoaded', function () {
  // Fetch and display borrowed books using Axios
  axios.get('http://localhost:3000/borrow')
    .then(response => {
      const booksBorrowedSection = document.getElementById('booksBorrowed');
      booksBorrowedSection.innerHTML = ''; // Clear existing content

      // Assuming the response.data is an array of borrowed book objects
      response.data.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.innerHTML = `
          <p>Book Name: ${book.title}</p>
          <p>Borrowed Time: ${book.borrowedTime}</p>
          <p>Return Time: ${book.returnTime}</p>
          <p>Pay Fine: ${book.payFine}</p>
          <button onclick="returnBook(${book.id})">Return Book</button>
        `;
        booksBorrowedSection.appendChild(bookElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error fetching borrowed books');
    });

  // Fetch and display returned books using Axios
  axios.get('http://localhost:3000/return')
    .then(response => {
      const returnedBooksSection = document.getElementById('returnedBooks');
      returnedBooksSection.innerHTML = ''; // Clear existing content

      // Assuming the response.data is an array of returned book objects
      response.data.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.innerHTML = `
          <p>Book Name: ${book.title}</p>
          <p>Borrowed Time: ${book.borrowedTime}</p>
          <p>Return Time: ${book.returnTime}</p>
          <p>Pay Fine: ${book.payFine}</p>
        `;
        returnedBooksSection.appendChild(bookElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error fetching returned books');
    });
});
