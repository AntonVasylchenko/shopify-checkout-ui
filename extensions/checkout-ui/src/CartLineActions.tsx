import React = require("react");

import {
  reactExtension,
  Grid,
  GridItem,
  useApi,
  useCartLineTarget,
  useApplyCartLinesChange,
} from "@shopify/ui-extensions-react/checkout";

import { queryProduct } from "./queries/queries";
import { ModalElement, QuantityElement, SelectorElement } from "./component";

export default reactExtension(
  "purchase.checkout.cart-line-item.render-after",
  () => <Extension />
);

function Extension() {
  const { query } = useApi();
  const cartLine = useCartLineTarget();

  const applyCartLinesChange = useApplyCartLinesChange();

  const [linePlans, setLinePlans] = React.useState<LinePlan[] | null>(null);
  const [values, setValues] = React.useState<OptionValues[] | null>(null);
  const [variants, setVariants] = React.useState<VariantType[] | null>(null);

  const handleCartChange = (config: ConfigCartChange) => {
    applyCartLinesChange(config);
  };

  React.useEffect(() => {
    if (!cartLine) return;
    const getVarintData = async () => {
      try {
        const productId = cartLine.merchandise.product.id;
        const response = await query<ProductType>(queryProduct(productId));
        if (response.data.node.variants) {
          const allVariant = response.data.node.variants.edges.map(variant => {
            return {
              id: variant.node.id,
              title: (variant.node.title).trim(),
              available: variant.node.availableForSale
            }
          });
          if (allVariant) {
            setVariants(allVariant)
          }

        }
        if (response.data.node.options) {
          const options = response.data.node.options.map((option, index) => {
            return {
              ...option,
              position: index + 1
            }
          });
          if (options) {
            setValues(options)
          }
        }
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
      {values && variants && variants.length > 1 && (
        <GridItem>
          <ModalElement
            variants={variants}
            cartLine={cartLine}
            values={values}
            handleCartChange={handleCartChange}
          />
        </GridItem>
      )}

    </Grid>
  );
}
