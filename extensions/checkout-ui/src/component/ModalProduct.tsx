import React = require("react");
import { Modal, Pressable, Text, BlockLayout, View, Grid, Divider, InlineLayout, Button, useApi } from "@shopify/ui-extensions-react/checkout";
import { CartLine } from "@shopify/ui-extensions/build/ts/surfaces/checkout/api/standard/standard";

interface ModalProps {
    variants: VariantType[];
    cartLine: CartLine;
    values: OptionValues[];
    handleCartChange: (config: ConfigCartChange) => void;
}

const ModalProduct: React.FC<ModalProps> = ({ values, cartLine, variants, handleCartChange }) => {
    const { ui } = useApi();

    const currentVariant: CurrentVariantType[] = cartLine.merchandise.selectedOptions.map((options, index) => {
        return { position: index + 1, option: options.value }
    })
    const [variant, setVariant] = React.useState(currentVariant);
    const [newCartLine, setNewCartLine] = React.useState<VariantType | null>(null);

    const handleChange = ({ position, value }: { position: number, value: string }) => {
        setVariant(prev => {
            const newVariant = prev.map((element, index) => {
                if (index === position - 1) {
                    return { ...element, option: value };
                }
                return element;
            });
            return newVariant;
        });
    
        const currentTitle = variant.map(variant => variant.option).join(" / ");
        handleFindVariant(currentTitle.trim());
    }

    const handleFindVariant = (titleVariant: string): void => {
        const newVariant = variants.find(variant => variant.title === titleVariant);

        if (newVariant) setNewCartLine(newVariant);
    }

    const handleChangeVariant = () => {
        if (!newCartLine) return;
        handleCartChange({
            id: cartLine.id,
            type: "updateCartLine",
            merchandiseId: newCartLine.id,
        });
        ui.overlay.close('my-modal');
    }
    return (
        <Pressable
            border={"base"}
            padding={"base"}
            borderRadius={"base"}
            overlay={
                <Modal
                    id="my-modal"
                    padding
                    title="Change variant"
                >
                    <BlockLayout rows={"auto"}>
                        {
                            values.map(value => {
                                return (
                                    <View key={React.useId()} padding={["base", "none", "base", "none"]}>
                                        <Divider />
                                        <Grid rows={"auto"} padding={["base", "none"]}>
                                            <Text>{value.name}</Text>
                                            <InlineLayout padding={"base"} spacing={"base"} >
                                                {
                                                    value.values.map(option => {
                                                        return (
                                                            <Button
                                                                id={String(value.position)}
                                                                key={React.useId()}
                                                                inlineAlignment={"center"}
                                                                kind={variant[value.position - 1].option === option ? "primary" : "secondary"}
                                                                onPress={() => handleChange({ position: value.position, value: option })}
                                                            >
                                                                <Text>{option}</Text>
                                                            </Button>
                                                        )
                                                    })
                                                }
                                            </InlineLayout>
                                        </Grid>
                                        <Divider />
                                    </View>
                                )
                            })
                        }
                        {
                            newCartLine && (
                                <Pressable
                                    inlineAlignment={"center"}
                                    blockAlignment={"center"}
                                    maxInlineSize={200}
                                    maxBlockSize={30}
                                    border={"base"}
                                    cornerRadius={"base"}
                                    padding={"base"}
                                    disabled={!newCartLine.available}
                                    onPress={handleChangeVariant}
                                >
                                    Change variant
                                </Pressable>
                            )
                        }

                    </BlockLayout>
                </Modal>
            }
        >
            <Text>Change variant</Text>
        </Pressable>
    )
}

export default ModalProduct