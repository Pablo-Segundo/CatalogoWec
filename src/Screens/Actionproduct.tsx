import React, { useRef } from "react";
import { View, Button } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../interfaces/ProductsCategoryInterface";

interface Props {
  product: Product;
  route: any;
}
 
export const ActionSh = ({ product}: Props ) => {
  const refRBSheet = useRef();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF"
      }}
    >
      <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={600}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        {/* <ProductCard/> */}
      </RBSheet>
    </View>
  );
}