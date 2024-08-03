type SellingsPlan = {
  node: {
    sellingPlanGroups: {
      edges: [
        {
          node: {
            name: string;
            sellingPlans: {
              edges: [
                {
                  node: {
                    id: string;
                    name: string;
                  };
                }
              ];
            };
          };
        }
      ];
    };
  };
};

type LinePlan = {
  value: string;
  label: string;
};

type ConfigCartChange = {
  id: string;
  type: "updateCartLine";
  sellingPlanId?: string;
  quantity?: number;
};
