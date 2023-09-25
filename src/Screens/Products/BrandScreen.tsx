import React, { useEffect, useState } from "react";
import { View,FlatList, RefreshControl } from "react-native";
import LoadingScreen from "./loadintgScreen";
import API from "../../API/API";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NoInternet } from '../../components/NoInternet';
import { Brands } from "../../Styles/brands";


interface Props extends NativeStackScreenProps<any, any> { }

export const BrandScreen  = ({ route, navigation }: Props) => {
    navigation.setOptions({
        title: route.params?.name,
      });

    const [brands, setBrands] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [brandsCategory, setBrandsCategory] = useState();
   


    const getBrandsCateg = async () =>{
      try{
        const { data } = await API.get(`products/brand/${route.params?._id}`);
        setBrandsCategory(data.brandsCategory);
      }catch (error) {
        setIsLoading(false);
      }
    }

    const getBrands = async () => {
        try {
            const { data } = await API.get(`/categories/brand/${route.params?._id}`);
            setBrands(data.brands);
            setIsLoading(false);
          } catch (error) {
            setIsError(true);
            setIsLoading(true);
          } 
    };

 

    useEffect(() => {
        getBrands();
       getBrandsCateg();

      }, []);

  if (isError) {
    <NoInternet />
  }
  if (isLoading) {
    return <LoadingScreen />;
  }

  return(
    <>
    <FlatList
  data={brands}
  numColumns={2}
  refreshControl={ 
    <RefreshControl refreshing={isLoading} onRefresh={getBrands} />
  }
  renderItem={({ item }) => (
    <Brands brand={item} />


  )}
  
  
/>


  </>
  )

}