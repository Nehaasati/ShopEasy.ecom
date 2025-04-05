# ShopEasy E-commerce Website

## Project Description
ShopEasy is a fully responsive e-commerce website built with HTML, CSS (including Flexbox), and JavaScript. The frontend is designed to work with a Java/JDBC backend.

## Features
- Product listing with filtering and sorting
- Product detail pages
- Shopping cart functionality
- Checkout process with form validation
- Responsive design for all device sizes

## Technologies Used
- HTML5
- CSS3 (with Flexbox for layout)
- JavaScript (DOM manipulation, localStorage for cart)
- (Backend would be Java/JDBC)

## How to Run the Project
1. Clone or download the project files
2. Open the `index.html` file in a web browser
3. Navigate through the website using the navigation menu

## Connecting to Java Backend
To connect this frontend to your Java backend:

1. Replace all mock data fetches in `main.js` with actual API calls to your Java backend
2. The backend should provide RESTful endpoints for:
   - Product listings
   - Product details
   - Cart operations
   - Order processing

## Common Issues and Solutions

### "localhost refused to connect" Error
This error occurs when the frontend can't connect to your backend server. Here's how to fix it:

1. **Ensure your Java backend is running**:
   - Start your Java server (Tomcat, Jetty, etc.)
   - Verify it's running on the expected port (usually 8080)

2. **Check your API endpoints**:
   - Make sure the URLs in your JavaScript code match your backend endpoints
   - Example: `fetch('http://localhost:8080/api/products')`

3. **Enable CORS if needed**:
   - If your frontend and backend are on different ports, configure CORS in your Java backend
   - Add these headers to your responses:
     ```
     Access-Control-Allow-Origin: *
     Access-Control-Allow-Methods: GET, POST, PUT, DELETE
     Access-Control-Allow-Headers: Content-Type
     ```

4. **Check your network connection**:
   - Ensure you're connected to the network
   - Disable any VPN or proxy that might interfere

5. **Verify firewall settings**:
   - Make sure your firewall isn't blocking the connection
   - Add exceptions for your Java server and browser

## Project Structure
- `index.html`: Home page with featured products
- `products.html`: All products listing with filters
- `product-detail.html`: Single product view
- `cart.html`: Shopping cart
- `checkout.html`: Checkout process
- `css/`: Stylesheets
- `js/`: JavaScript files
- `images/`: Product images

## Future Enhancements
- User authentication
- Product reviews and ratings
- Order history
- Admin dashboard