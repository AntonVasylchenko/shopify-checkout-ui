export const queryProduct = (productId: string): string => `
  {
    node(id: "${productId}") {
      ... on Product {
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
