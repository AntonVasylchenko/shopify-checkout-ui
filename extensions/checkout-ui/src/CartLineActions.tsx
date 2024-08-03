import React = require("react");
import QuantityElement from "../src/component/Quantity";
import SelectorElement from "../src/component/Selector";

import {
  reactExtension,
  Grid,
  GridItem,
  useApi,
  useCartLineTarget,
  useApplyCartLinesChange,
} from "@shopify/ui-extensions-react/checkout";
import { queryProduct } from "./queries/queries";

export default reactExtension(
  "purchase.checkout.cart-line-item.render-after",
  () => <Extension />
);

function Extension() {
  const { query } = useApi();
  const cartLine = useCartLineTarget();
  const applyCartLinesChange = useApplyCartLinesChange();

  const [linePlans, setLinePlans] = React.useState<LinePlan[] | null>(null);

  const handleCartChange = (config: ConfigCartChange) => {
    applyCartLinesChange(config);
  };

  React.useEffect(() => {
    if (!cartLine) return;
    const getVarintData = async () => {
      try {
        const productId = cartLine.merchandise.product.id;
        const response = await query<SellingsPlan>(queryProduct(productId));

        if (response.data.node.sellingPlanGroups.edges[0]) {
          const nodePlans =
            response.data.node.sellingPlanGroups.edges[0].node.sellingPlans
              .edges;
          if (nodePlans) {
            const result = nodePlans.map((node) => {
              return {
                value: node.node.id,
                label: node.node.name,
              };
            });

            const emptyPlan = {
              value: "",
              label: "Without plan",
            };
            setLinePlans([emptyPlan, ...result]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getVarintData();
  }, []);

  if (!cartLine) return null;

  return (
    <Grid columns={["1fr", "1fr"]} padding={["base", "none"]}>
      <GridItem>
        <QuantityElement
          cartLine={cartLine}
          handleCartChange={handleCartChange}
        />
      </GridItem>
      {linePlans && (
        <GridItem>
          <SelectorElement
            cartLine={cartLine}
            linePlans={linePlans}
            handleCartChange={handleCartChange}
          />
        </GridItem>
      )}
    </Grid>
  );
}
