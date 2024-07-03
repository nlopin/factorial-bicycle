# Marcus Bikes

The repo provides a basic implementation of the domain model of the order in a bike shop. It intentionally does not contain storage and API layer to keep things as pure as possible.

The implementation of the domain logic is influenced by Domain-Driven Design. In this approach, the domain business logic is the core of the app. This approach is also known as ImPureIm sandwich, where all impure operations, like interaction with the DB or returning a response to the API, are moved to the edges of the module.

The assumptions made:
- we have only one type of user - guest user
- a user can order one bike per order

## Data Model



## Website User Journey

### The Product Page

The main factor for the e-commerce websites are the speed. It is crucial to show the product fast. In terms of the frontend that means having high LCP metric. Therefore, the initial page must be lean. The best solution here is to rely on Server Side Rendered pages and server cache to respond quickly.

To achieve that I'd postponed loading of uncritical styles and JS for secondary actions. Not every visitor comes to the product page to buy a bike, I consider it crucial, but secondary action in this context. That means the selectors for possible part combinations must be loaded asynchronously, with a lower priority.

The bike parts selection can be organised as a wizard, from core parts (frame) to optional. Each step, we make an API call to find out what options are possible to choose next.

Optionally, we can calculate the price on each step, showing the increment of the price on every option (see Apple Macbook customization flow). It requires extra endpoint which calculates the price based on an unfinished order.


### The "Add to Cart" Action

There are many approaches possible when user hits the "Add to Cart" button.

In the situation of small shop, I prefer the basic approach is to store the cart locally (keeping in mind we have only guest users). In case we want to send notifications nudging the client to finish the purchase, we can make an API call and persist the user email and the date of the action to be able to act on them later.

This approach also keep the system extensible. If at some point we decide we want to store the cart on the server, we can extend the basic endpoint.


## Website Administrator Journey

### Create New Product

To create a new product, the administrator must provide the following information:
- Name
- Description
- Images
- Customization Parts and their corresponding choices
- Price

This operation one of the core operations in the business, so it impacts a vast set of database tables:
- creates a new record in the product table
- if needed, creates new records for the customization parts. Then creates relation to the product
- if needed, creates choices for the customization parts. Then creates relations between the choices and corresponding parts
- sets price per each customization part and it's combination

Other operations on product are a subset of the work necessary to create a new product.

### Add a New Part Choice

The new part choice can be added from the product page assuming that this is the most frequent use case. The administrator opens an edit product page where they can see all the parts and choices available for the product.

By clicking a button the administrator can open a form where they provide the name of the new choice and the price. When saved, this choice will be available only for the current product, but not to the rest (it is also possible to ask the user what to do in case multiple products have this part assigned to them).

From the database point of view, we will create a new record in the part choices table and then a record to the product-choices table where we store what choices are available for each product. 


### Setting Up Prices