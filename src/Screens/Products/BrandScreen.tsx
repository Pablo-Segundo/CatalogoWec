import React, { useContext, useEffect, useState } from "react";
import { View,FlatList, RefreshControl, ActivityIndicator } from "react-native";
import LoadingScreen from "./loadintgScreen";
import API from "../../API/API";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NoInternet } from '../../components/uwuwuw';
import { Brands } from "../Brands/Brands";
import { CartContext } from "../../context/cart/CartContext";
import { Actionsheet, useDisclose } from 'native-base';
import { Product } from "../../interfaces/ProductsCategoryInterface";

interface Props extends NativeStackScreenProps<any, any> { }

export const BrandScreen  = ({ route, navigation }: Props) => {
    navigation.setOptions({
        title: route.params?.name,
      });

    const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectcategory, setSelectcategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('')
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);


  const { incrementQuantity, decrementQuantity , addToCart,} = useContext(CartContext);
  const { cart } = useContext(CartContext);
 
  const cartProduct = cart.find((item) => item.product === Brands);
  const initialQuantity = cartProduct ? cartProduct.quantity : 1;
  const [quantity, setQuantity] = useState(initialQuantity);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { isOpen, onOpen, onClose } = useDisclose();


  const [brands, setBrands] = useState([]);
  const [selectedBrandName, setSelectedBrandName] = useState('');
  const [selectedBrandImage, setSelectedBrandImage] = useState('');
  
  const [currentIndex, setCurrentIndex] = useState(0);


  const getBrands2 = async () => {
    try {
      const { data } = await API.get('/brands');
      const brands = data.brands;
      setBrands(brands);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async (_id: string, pageNumber: number = 1) => {
    try {
      setIsLoadingMore(true); 
      const { data } = await API.get(
        `/products/category-brand-pagination/${_id}/${route.params?._id}?limit=${limit}&page=${pageNumber}`
      );
      const newProducts = data.products;
      if (pageNumber === 1) {
       
        setProducts(newProducts);
      } else {
       
        setProducts([...products, ...newProducts]);
      }
      setSelectedCategory(_id);
      setPage(pageNumber + 1);
      setLimit(data.limit);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoadingMore(false); 
    }
  };

  const getBrands = async () => {
    try {
      const { data } = await API.get(`/categories/brand/${route.params?._id}`);
      setCategories(data.categories);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(true);
    }
  };

  const handleCategorySelect = (_id: string) => {
    setSelectedCategory(_id); 
    setProducts([]);
    setPage(1);
    setLimit(5);
    getProducts(_id);
  };

  useEffect(() => {
    getBrands();
    getBrands2();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      handleCategorySelect(categories[0]._id);
      setIsLoading(false);
    }
  }, [categories]);

  useEffect(() => {
    if (selectcategory) {
      setProducts([]);
      setPage(1);
      setLimit(5);
      getProducts(selectcategory);
    }
  }, [selectcategory]);

  const renderFooter = () => {
    if (isLoadingMore) {
      return <ActivityIndicator style={{ marginVertical: 10 }} size="large" color="#1E90FF" />;
    }
    return null;
  };

  const masdatos = () => {
    if (!isLoadingMore) {
      const nextPage = Math.ceil(products.length / limit) + 1;
      getProducts(selectedCategory, nextPage);
    }
  };



  return(
    <>
    <FlatList
  data={products}
  refreshControl={ 
    <RefreshControl refreshing={isLoading} onRefresh={getProducts} />
  }
  renderItem={({ item }) => (
    <Brands product={item} />


  )}
      onEndReached={masdatos}
      onEndReachedThreshold={0.10}
      ListFooterComponent={renderFooter}
  
/>


  </>
  )

}