# Shopify Checkout Extension

## OverviewOverview
This project is a Shopify Checkout extension that enhances the checkout experience by allowing users to modify the quantity of items in their cart and select sales plans for each item. It leverages React for the user interface and the Shopify UI Extensions API for seamless integration with the Shopify platform.

### FilesFiles

### 1. Main Extension File
Description:
The main component of the extension, Extension, is rendered after each cart line on the checkout page.

Key Functionalities:

1. Fetches sales plans for products using the Shopify API.
2. Handles cart changes to reflect updated quantities and selected sales plans.
3. Displays QuantityElement and SelectorElement components for user interaction.

### 2. SelectorElement Component
Description:
The SelectorElement component allows users to select a sales plan for each item in the cart.

Key Functionalities:

1. Shows a list of sales plans in a dropdown menu.
2. Updates the selected sales plan based on user choice.

### 3. QuantityElement Component
Description:
The QuantityElement component enables users to adjust the quantity of items in their cart.

Key Functionalities:

1. Increases or decreases the item quantity.
2. Removes items from the cart if the quantity is set to zero.
3. Updates the cart with the new item quantity.

### 4. ModalProduct Component

Description:
The ModalProduct component provides a modal interface for users to change the variant of an item in their cart.

Key Functionalities:

1. Displays current variant options: Shows the currently selected options for the item.
2. Allows variant changes: Users can select different options to find a new variant of the product.
3. Finds and updates variants: Searches for the new variant based on user selection and updates the cart accordingly.
4. Handles user interactions: Includes buttons and modal windows for seamless user experience.

#### Test Product
[The Videographer Snowboard.](https://learn123456.myshopify.com/products/the-videographer-snowboard?_ab=0&_bt=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaDVzWldGeWJqRXlNelExTmk1dGVYTm9iM0JwWm5rdVkyOXRCam9HUlZRPSIsImV4cCI6IjIwMjQtMDgtMDVUMDQ6NDM6MDkuNjAwWiIsInB1ciI6InBlcm1hbmVudF9wYXNzd29yZF9ieXBhc3MifX0%3D--85c08e30c3efd1038c304035065f0b08cd964a4d&_fd=0&_sc=1&key=dc2dbe1ed2b1f8a3a142d2bc519b52e6feff012b724873439fe953a9a350bec1&preview_theme_id=144000844029 "The Videographer Snowboard.")
