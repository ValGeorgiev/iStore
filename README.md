# iStore

Online store

- Initialize
  * git clone
  * npm install
  * npm start

- Developers:
  * Valentin Georgiev
  * Ivan Atanasov
  * Ivelin Todorov
  * George Dimov

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
    
  

