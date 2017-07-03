# iStore

Online store

- Initialize
  * git clone
  * npm install
  * npm start

- Developers:
  * Valentin Georgiev
  * Ivelin Todorov
  * George Dimov

- [Documentation](https://docs.google.com/document/d/1rcBJXrBC73CsblqBxUpDG1HBWqOCWHomXbFrSHcOklI/edit)

- Presentation

- Functionalities:
  * 1. Authentication
  * **Description:** This functionality includes sign up and log in. User model. And log out functionality. User type (user/admin) 
  
  * 2. Product
  * **Description:** Includes PDP (product details page), PLP (product listing pages), Product model
  
  * 3. Add to basket
  * **Description:** Includes add to basket functionality from all plps and pdp. AddedProduct model
  
  * 4. Checkout
  * **Description:** Includes all checkout proccess. Order model. 4 steps. Get current basket. Add an address, additional information and others. Add payment. See all details and finish checkout process.  
  
  * 5. Admin portal
  * **Description:** Add products, make order completed/uncompleted, change user type (admin/user).
  
  * 6. Search
  * **Description:** types of search (by name, by category and others)
  
  * 7. My Favourites
  * **Description:** Favourites model. Add product in favourites.
  
  * 8. Comment
  * **Description:** Comment model. Add comment functionality for product.
  
  * 9. Address
  * **Description:** Save/edit/delete address. Address model
  
  * 9. Payment
  * **Description:** Save/edit/delete payment method. Payment model
  
  
- Models
  * **User model**
     * first name
     * last name
     * email
     * password
     * type
     
  * **Product model**
    * name
    * image
    * description
    * price
    * size
    * quantity
    
  * **AddedProduct/Basket model**
    * user_id
    * product_id
    * size
    * quantity
    * price
  
  * **Order model**
    * addedproducts_id
    * price
    * user_id
    * address_id
    * information
    * status
    
  * **Favourites model**
    * products_id
    * user_id
   
  * **Comment model**
    * product_id
    * description
    * likes
    * dislikes
    * user_id
  
  * **Address model**
    * user_id
    * address
    * city
    * country
    * postal code
  
  * **Payment model**
    * user_id
    * iban
    * security_code
    * expired_date
    
 - Responsibilities:
   * Joro:
     - Auth/User model
     - Address
   * Ivo:
     - Order
     - Basket
   * Valio:
     - Product
     - Comment
    
 - Routing:
   * **Description:** React Routing is configured in "src/index.js" file. Example: 
   ```
    <Router history={hashHistory}>
     <Route path="/" component={App}>
      <Route path="/scheduler" component={Scheduler}/>
      <Route path="/day" component={Day}/>
      <Route path="/week" component={Week}/>
      <Route path="/year" component={Year}/>
     </Route>
     <Route path="/error" component={Error}/>
   </Router>

   ```
    * Router, Route, hashHistory came from "react-router" npm module. 
    * Router defines application routing
    * Route is a specific route. It can contains other routes
    * **history={hashHistory}** means that the url will be: localhost:3000/**#**/day for example. You can check for more information here [History docs](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md)
    * **path** is the url path that will be shown in browser.
    * **component** is the react component that will be invoked when user goes to the route path.
    * You can see that we have a nested routes. This means that when user goes to the **/#/day** for example, the components that will be rendered are App and Day (App contains header for example). But **/error** route is not nested. And when user goes to that route - only Error component will be rendered.
    * You can add other route wherever you like. Just be careful if you want to nest the route.  
   
   

