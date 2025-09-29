// PDF Invoice Generator using jsPDF
// Add this script tag to your HTML: <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

export const generateInvoicePDF = (cartItems) => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Company Logo and Header
  doc.setFontSize(20);
  doc.setTextColor(40, 67, 96); // Dark blue
  doc.text('TOUR BOOKING INVOICE', 20, 30);
  
  // Invoice Details
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  const currentDate = new Date().toLocaleDateString();
  const invoiceNumber = 'INV-' + Date.now().toString().slice(-8);
  
  doc.text(`Invoice Number: ${invoiceNumber}`, 20, 50);
  doc.text(`Date: ${currentDate}`, 20, 60);
  doc.text(`Payment Method: Cash Payment`, 20, 70);
  
  // Company Details (Right side)
  doc.text('Tour Company Ltd.', 120, 50);
  doc.text('123 Travel Street', 120, 60);
  doc.text('Tourism City, TC 12345', 120, 70);
  doc.text('Phone: +1 234 567 8900', 120, 80);
  
  // Line separator
  doc.setLineWidth(0.5);
  doc.line(20, 90, 190, 90);
  
  // Table Headers
  let yPosition = 110;
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text('Package Details', 20, yPosition);
  doc.text('Duration', 80, yPosition);
  doc.text('Adults', 110, yPosition);
  doc.text('Children', 130, yPosition);
  doc.text('Price', 150, yPosition);
  doc.text('Total', 170, yPosition);
  
  // Underline headers
  doc.line(20, yPosition + 2, 190, yPosition + 2);
  
  // Table Content
  yPosition += 15;
  doc.setFont(undefined, 'normal');
  
  let subtotal = 0;
  
  cartItems.forEach((item) => {
    const itemTotal = (item.adult_single_price * item.adults) + (item.child_single_price * item.children);
    subtotal += itemTotal;
    
    // Package title (truncate if too long)
    const title = item.title.length > 25 ? item.title.substring(0, 25) + '...' : item.title;
    doc.text(title, 20, yPosition);
    doc.text(`${item.total_days} Days`, 80, yPosition);
    doc.text(item.adults.toString(), 115, yPosition);
    doc.text(item.children.toString(), 135, yPosition);
    
    // Price breakdown
    const adultPrice = item.adult_single_price * item.adults;
    const childPrice = item.child_single_price * item.children;
    doc.text(`$${item.adult_single_price}`, 150, yPosition);
    doc.text(`$${itemTotal.toFixed(2)}`, 170, yPosition);
    
    yPosition += 10;
    
    // Price breakdown details (smaller text)
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    if (item.adults > 0) {
      doc.text(`Adults: ${item.adults} × $${item.adult_single_price} = $${adultPrice.toFixed(2)}`, 25, yPosition);
      yPosition += 8;
    }
    if (item.children > 0) {
      doc.text(`Children: ${item.children} × $${item.child_single_price} = $${childPrice.toFixed(2)}`, 25, yPosition);
      yPosition += 8;
    }
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    yPosition += 5;
  });
  
  // Total Section
  yPosition += 10;
  doc.line(120, yPosition, 190, yPosition);
  yPosition += 10;
  
  doc.setFont(undefined, 'bold');
  doc.setFontSize(12);
  doc.text('Subtotal:', 130, yPosition);
  doc.text(`$${subtotal.toFixed(2)}`, 170, yPosition);
  
  yPosition += 10;
  const tax = subtotal * 0.1; // 10% tax
  doc.setFont(undefined, 'normal');
  doc.text('Tax (10%):', 130, yPosition);
  doc.text(`$${tax.toFixed(2)}`, 170, yPosition);
  
  yPosition += 15;
  doc.setFont(undefined, 'bold');
  doc.setFontSize(14);
  doc.text('TOTAL AMOUNT:', 130, yPosition);
  doc.text(`$${(subtotal + tax).toFixed(2)}`, 170, yPosition);
  
  // Payment Terms
  yPosition += 25;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  doc.text('Payment Terms & Conditions:', 20, yPosition);
  yPosition += 8;
  doc.text('• Payment is due in full before tour commencement', 20, yPosition);
  yPosition += 8;
  doc.text('• Cancellation must be made 48 hours in advance for full refund', 20, yPosition);
  yPosition += 8;
  doc.text('• Please bring this invoice and valid ID on tour day', 20, yPosition);
  yPosition += 8;
  doc.text('• Emergency contact: +1 234 567 8900', 20, yPosition);
  
  // Footer
  yPosition += 20;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Thank you for choosing our tour services!', 20, yPosition);
  doc.text('For inquiries, please contact us at info@tourcompany.com', 20, yPosition + 8);
  
  // Save the PDF
  const fileName = `Tour-Invoice-${invoiceNumber}.pdf`;
  doc.save(fileName);
  
  return invoiceNumber;
};

// Alternative PDF generator using HTML2PDF (if jsPDF is not available)
export const generateInvoiceHTML2PDF = (cartItems, cartTotal) => {
  const invoiceNumber = 'INV-' + Date.now().toString().slice(-8);
  const currentDate = new Date().toLocaleDateString();
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="color: #2563eb; margin: 0;">TOUR BOOKING INVOICE</h1>
        <p style="margin: 5px 0; color: #666;">Professional Travel Services</p>
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <div>
          <h3 style="color: #374151; margin-bottom: 10px;">Invoice Details</h3>
          <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
          <p><strong>Date:</strong> ${currentDate}</p>
          <p><strong>Payment Method:</strong> Cash Payment</p>
        </div>
        <div>
          <h3 style="color: #374151; margin-bottom: 10px;">Company Details</h3>
          <p>Tour Company Ltd.</p>
          <p>123 Travel Street</p>
          <p>Tourism City, TC 12345</p>
          <p>Phone: +1 234 567 8900</p>
        </div>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left;">Package</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">Duration</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">Adults</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">Children</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: right;">Unit Price</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${cartItems.map(item => {
            const itemTotal = (item.adult_single_price * item.adults) + (item.child_single_price * item.children);
            return `
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 12px;">
                  <strong>${item.title}</strong>
                  <br>
                  <small>Adults: $${item.adult_single_price} × ${item.adults} = $${(item.adult_single_price * item.adults).toFixed(2)}</small>
                  ${item.children > 0 ? `<br><small>Children: $${item.child_single_price} × ${item.children} = $${(item.child_single_price * item.children).toFixed(2)}</small>` : ''}
                </td>
                <td style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">${item.total_days} Days</td>
                <td style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">${item.adults}</td>
                <td style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">${item.children}</td>
                <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right;">$${item.adult_single_price}</td>
                <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right; font-weight: bold;">$${itemTotal.toFixed(2)}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      
      <div style="text-align: right; margin-bottom: 30px;">
        <div style="display: inline-block; text-align: left;">
          <p><strong>Subtotal: $${cartTotal.toFixed(2)}</strong></p>
          <p>Tax (10%): $${(cartTotal * 0.1).toFixed(2)}</p>
          <p style="font-size: 18px; color: #2563eb;"><strong>TOTAL: $${(cartTotal * 1.1).toFixed(2)}</strong></p>
        </div>
      </div>
      
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 30px;">
        <h3 style="color: #374151; margin-top: 0;">Payment Terms & Conditions</h3>
        <ul style="color: #6b7280;">
          <li>Payment is due in full before tour commencement</li>
          <li>Cancellation must be made 48 hours in advance for full refund</li>
          <li>Please bring this invoice and valid ID on tour day</li>
          <li>Emergency contact: +1 234 567 8900</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin-top: 40px; color: #9ca3af; font-size: 12px;">
        <p>Thank you for choosing our tour services!</p>
        <p>For inquiries, please contact us at info@tourcompany.com</p>
      </div>
    </div>
  `;
  
  // Create a new window and print
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice ${invoiceNumber}</title>
        <style>
          body { margin: 0; padding: 20px; }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        ${htmlContent}
        <div class="no-print" style="text-align: center; margin-top: 30px;">
          <button onclick="window.print()" style="background: #2563eb; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin-right: 10px;">Print Invoice</button>
          <button onclick="window.close()" style="background: #6b7280; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">Close</button>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  
  return invoiceNumber;
};