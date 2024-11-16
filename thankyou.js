window.onload = function() {
    // Retrieve order and customer data from localStorage
    const orderItems = JSON.parse(localStorage.getItem('orderItems'));
    const totalPrice = localStorage.getItem('totalPrice');

    const mobileNumber = localStorage.getItem('mobileNumber');
    const tableNumber = localStorage.getItem('tableNumber');

    const orderDetails = document.getElementById('thankYouOrderDetails');
    const finalPrice = document.getElementById('thankYouTotalPrice');
    const mobileDisplay = document.getElementById('thankYouMobileNumber');
    const tableDisplay = document.getElementById('thankYouTableNumber');

    // Populate order details (items and total price)
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

    // Display customer info
    mobileDisplay.textContent = mobileNumber || 'N/A';
    tableDisplay.textContent = tableNumber || 'N/A';
  };

  function goBackToMenu() {
    window.location.href = 'index.html'; // Redirect back to the menu page
  }