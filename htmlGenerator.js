
  
  function generateOrderTable(items) {
    let tableRows = '';
    let total = 0;
  
    items.forEach(item => {
      const priceInDollars = (item.price / 100).toFixed(2);
      tableRows += `
        <tr>
          <td style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">${item.name}</td>
          <td style="padding: 12px; text-align: right; border-bottom: 1px solid #ddd;">$${priceInDollars}</td>
        </tr>
      `;
      total += item.price;
    });
  
    const totalInDollars = (total / 100).toFixed(2);
  
    const html = `
      <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
            <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
        <tfoot>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; text-align: left; font-weight: bold;">Total</td>
            <td style="padding: 12px; text-align: right; font-weight: bold;">$${totalInDollars}</td>
          </tr>
        </tfoot>
      </table>
    `;
  
    return html;
  }
  
  // Generate the table HTML
 export default generateOrderTable
  
