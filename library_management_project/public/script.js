function borrowBook() {
  const title = document.getElementById('search').value;

  axios.post('http://localhost:3000/library/borrow', { title })
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
  axios.post('http://localhost:3000/library/return', { id })
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
  axios.post('http://localhost:3000/library/payfine', { id })
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
  axios.get('http://localhost:3000/library/borrowed')
    .then(response => {
      console.log('Borrowed Books Response:', response.data);
      const booksBorrowedSection = document.getElementById('booksBorrowed');
      booksBorrowedSection.innerHTML = '';

      const data = response.data;
      if (data.success) {
        data.books.forEach(book => {
          const bookElement = document.createElement('div');
          bookElement.className = 'book';

          bookElement.innerHTML = `
            <p>Book Name: ${book.title}</p>
            <p>Borrowed Time: ${book.borrowedAt}</p>
            <p>Return Time: ${book.returnedToBe}</p>
            <p>Pay Fine: ${book.fine}</p>
            <button onclick="returnBook(${book.id})" class="returnBtn">Return Book</button>
          `;

          booksBorrowedSection.appendChild(bookElement);
        });
      } else {
        console.error('Invalid response format for borrowed books:', data);
        alert('Error fetching borrowed books');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error fetching borrowed books');
    });

  axios.get('http://localhost:3000/library/returned')
    .then(response => {
      console.log('Returned Books Response:', response.data);
      const returnedBooksSection = document.getElementById('returnedBooks');
      returnedBooksSection.innerHTML = '';

      const data = response.data;
      if (data.success) {
        data.books.forEach(book => {
          const bookElement = document.createElement('div');
          bookElement.className = 'book';

          bookElement.innerHTML = `
            <p>Book Name: ${book.title}</p>
            <p>Borrowed Time: ${book.borrowedAt}</p>
            <p>Returned Time: ${book.returnedAt}</p>
            <p>Fine Paid: ${book.fine}</p>
          `;

          returnedBooksSection.appendChild(bookElement);
        });
      } else {
        console.error('Invalid response format for returned books:', data);
        alert('Error fetching returned books');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error fetching returned books');
    });
});
