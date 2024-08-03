import React = require("react");

import { Select } from "@shopify/ui-extensions-react/checkout";
import { CartLine } from "@shopify/ui-extensions/build/ts/surfaces/checkout/api/standard/standard";

interface SelectorProps {
  cartLine: CartLine;
  linePlans: LinePlan[];
  handleCartChange: (config: ConfigCartChange) => void;
}

const Selector: React.FC<SelectorProps> = ({
  cartLine,
  linePlans,
  handleCartChange,
}) => {
  const [currentPlan, setCurrentPlan] = React.useState<string>(
    cartLine.merchandise.sellingPlan ? cartLine.merchandise.sellingPlan.id : ""
  );

  const handlePlan = (currentPlan: string) => {
    setCurrentPlan(currentPlan);

    handleCartChange({
      id: cartLine.id,
      type: "updateCartLine",
      sellingPlanId: currentPlan ? currentPlan : null,
    });
  };

  return (
    <Select
      label="Selling plan"
      onChange={handlePlan}
      value={currentPlan}
      options={linePlans}
    />
  );
};

export default Selector;
