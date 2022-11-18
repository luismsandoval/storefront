# Virtual Store

Redux Toolkit React app

## Manage state in a Redux store with multiple reducers/actions

### Categories

- State should be a list of categories as well as the active one

  - Each category should have a normalized name, display name, and a description

- Create an action that will trigger the reducer to change the active category

- Update the active category in the reducer when this action is dispatched

### Products

- State should be a list of all products

  - Each product should have a category association, name, description, price, inventory count

- Create an action that will trigger the reducer to filter the product list when the active category is changed

- Create a reducer that will filter the products list based on the active category

- Create an action that will trigger the reducer to reduce the stock counter

- Create a reducer that reduces the # in stock when that action is dispatched

### Cart

- State should be an array of products that have been added (all product details)

- Create an action that will trigger the reducer to add the selected item to the cart

  - Hint: this could be the same action type as you create for the Products reducer

- Create a reducer that adds the product to the array of items in state

- Add a “Remove from Cart” button to each item in the cart

  - Change the indicator in the menu

  - Add 1 back to the # in stock for that product
