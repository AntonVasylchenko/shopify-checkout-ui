type ProductType = {
  node: {
    options: [
      {
        name: string;
        values: string[];
      }
    ];
    variants: {
      edges: [
        {
          node: {
            id: string;
            title: string;
            availableForSale: boolean;
          };
        }
      ];
    };
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

type OptionValues = {
  name: string,
  position: number,
  values: string[]
}

type VariantType = {
  id: string,
  title: string,
  available: boolean
}

type CurrentVariantType = {
  option: string,
  position: number,
}

type ConfigCartChange = {
  id: string;
  type: "updateCartLine";
  sellingPlanId?: string;
  quantity?: number;
  merchandiseId?: string
};
