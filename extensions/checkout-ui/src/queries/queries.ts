export const queryProduct = (productId: string): string => `
  {
    node(id: "${productId}") {
      ... on Product {
        options(first:3) {
          name
          values
        }
        variants(first:100) {
          edges {
            node {
              id
              title
              availableForSale
            }
          }
        }
        sellingPlanGroups(first: 1) {
          edges {
            node {
              name
              sellingPlans(first: 10) {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
