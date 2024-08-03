import React = require("react");

import {
  Text,
  Grid,
  View,
  Pressable,
  Icon,
  InlineSpacer,
} from "@shopify/ui-extensions-react/checkout";
import { CartLine } from "@shopify/ui-extensions/build/ts/surfaces/checkout/api/standard/standard";

interface QuantityProps {
  cartLine: CartLine;
  handleCartChange: (config: ConfigCartChange) => void;
}

const Quantity: React.FC<QuantityProps> = ({ cartLine, handleCartChange }) => {
  const [currentQuantity, setCurrentQuantity] = React.useState<number>(
    cartLine.quantity
  );

  const handleQuantity = (type: string): void => {
    setCurrentQuantity((prevQuantity) => {
      const newQuantity = type === "plus" ? prevQuantity + 1 : prevQuantity - 1;
      return Math.max(newQuantity, 0);
    });
  };

  const handleRemove = (): void => {
    setCurrentQuantity(0);
  };

  const updateCartLine = React.useCallback(() => {
    handleCartChange({
      id: cartLine.id,
      type: "updateCartLine",
      quantity: currentQuantity,
    });
  }, [currentQuantity, cartLine.id]);

  React.useEffect(() => {
    updateCartLine();
  }, [updateCartLine]);

  return (
    <Grid columns={[20, 30, 20, 10, 30]} rows={[50]} blockAlignment="center">
      <View
        border={"base"}
        borderRadius="base"
        blockAlignment={"center"}
        background="subdued"
        inlineAlignment={"center"}
      >
        <Pressable
          disabled={currentQuantity === 1}
          onPress={() => handleQuantity("minus")}
          accessibilityLabel="minus"
        >
          <Icon source="minus" size="base" />
        </Pressable>
      </View>
      <View inlineAlignment={"center"}>
        <Text>{currentQuantity}</Text>
      </View>
      <View
        border={"base"}
        borderRadius="base"
        blockAlignment={"center"}
        background="subdued"
        inlineAlignment={"center"}
      >
        <Pressable
          onPress={() => handleQuantity("plus")}
          accessibilityLabel="plus"
        >
          <Icon source="plus" size="base" />
        </Pressable>
      </View>
      <InlineSpacer spacing="base" />
      <View blockAlignment={"center"} inlineAlignment={"center"}>
        <Pressable onPress={() => handleRemove()} accessibilityLabel="delete">
          <Icon source="delete" size="base" />
        </Pressable>
      </View>
    </Grid>
  );
};

export default Quantity;
