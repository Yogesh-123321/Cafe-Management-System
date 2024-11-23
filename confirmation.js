import htmlGenerator from './htmlGenerator.js';

window.onload = function() {
  // Retrieve order data from localStorage
  const orderItems = JSON.parse(localStorage.getItem('orderItems'));
  const totalPrice = localStorage.getItem('totalPrice');

  const orderDetails = document.getElementById('orderDetails');
  const finalPrice = document.getElementById('finalPrice');
  const mobileNumberInput = document.getElementById('mobileNumberInput');
  const tableNumberInput = document.getElementById('tableNumberInput');
  const errorMessageMobile = document.createElement('div'); // This will hold the error message for invalid mobile number
  const errorMessageTable = document.createElement('div'); // This will hold the error message for invalid table number

  errorMessageMobile.style.color = 'red'; // Red text for mobile number error message
  errorMessageTable.style.color = 'red';  // Red text for table number error message

  // Populate order details
  if (orderItems && orderItems.length > 0) {
    orderItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
      orderDetails.appendChild(li);
    });
    finalPrice.textContent = totalPrice;
  } else {
    orderDetails.innerHTML = "<li>No items found in your order.</li>";
  }

  paymentForm.addEventListener('change', function(event) {
    if (event.target.value === 'Credit Card' || event.target.value === 'Cash') {
      qrCodeContainer.style.display = 'block';
      
      // Generate QR code based on payment method
      let paymentData;
      if (event.target.value === 'Credit Card') {
        paymentData = `Order Details: ${orderItems.map(item => item.name).join(', ')} | Total: ₹${totalPrice} | Payment Method: Credit Card`;
      } else {
        paymentData = `Order Details: ${orderItems.map(item => item.name).join(', ')} | Total: ₹${totalPrice} | Payment Method: Cash`;
      }

      // Generate QR code
      new QRCode(qrCodeElement, {
        text: paymentData,
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
    }
  });

  // Handle form submission for payment
  paymentForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const mobileRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  // Regex for a valid Indian mobile number
    const mobileNumber = mobileNumberInput.value;

    console.log(!mobileRegex.test(mobileNumber))
    console.log("khbjhbbjbjjh")

    // Validate mobile number
    if (!mobileRegex.test(mobileNumber)) {
      // Display error message for mobile number
      errorMessageMobile.textContent = "Please enter a valid mobile number";
      mobileNumberInput.parentNode.appendChild(errorMessageMobile);  // Append error message under the mobile number input field
      return;  // Prevent form submission
    } else {
      // Clear mobile error message if the number is valid
      if (errorMessageMobile.textContent !== "") {
        errorMessageMobile.textContent = "";  // Clear error message if the number is valid
      }
    }

    // Validate table number
    const tableNumber = tableNumberInput.value;
    const tableNumberInt = parseInt(tableNumber, 10);

    if (isNaN(tableNumberInt) || tableNumberInt <= 0 || tableNumberInt >= 21) {

      // Display error message for table number
      errorMessageTable.textContent = "Please enter a valid table number (between 1 and 20)";
      tableNumberInput.parentNode.appendChild(errorMessageTable);  // Append error message under the table number input field
      return;  // Prevent form submission
    } else {
      // Clear table number error message if the number is valid
      if (errorMessageTable.textContent !== "") {
        errorMessageTable.textContent = "";  // Clear error message if the table number is valid
      }
    }

    // Collect payment method
    const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    // Save payment details in localStorage
    localStorage.setItem('paymentMethod', selectedPaymentMethod);
    localStorage.setItem('mobileNumber', mobileNumber);
    localStorage.setItem('tableNumber', tableNumberInt);

    console.log(selectedPaymentMethod)
    console.log(mobileNumber)
    console.log(tableNumberInt)
    console.log(orderItems)

    const data = {
      to : mobileNumber,
      subject : "Order Details",
      from : "Resto Management",  
      text : `Your order has been placed successfully. Your table number is ${tableNumberInt}. You will receive a confirmation message shortly.`,
      html : htmlGenerator(orderItems)    
    }

    const url = 'https://mailer-q658.onrender.com/sendMail'

    const res = await fetch(url, {
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify(data), // Convert data object to JSON string
    })

    console.log(res)


    // Redirect to the Thank You page (or wherever the final confirmation happens)
    window.location.href = 'thankyou.html'; // Change this to your thank you page URL
  });
};

// Function to go back to the menu
function goBack() {
  window.location.href = 'index.html'; // Redirect back to the menu page
}
