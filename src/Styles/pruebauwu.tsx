import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View, Text } from 'react-native';
import { Box, Button } from 'native-base';
import { OfferContext } from '../context/Offer/OfferContext';
import NetInfo from "@react-native-community/netinfo";
import { CategoryContext } from '../context/Category/CategoryContext';
import { BrandContext } from '../context/Brand/BrandContext';
import { CategoryCard } from '../components/CategoryCard';
import { CardBrands as CardBrands } from '../components/CardBrands';
import { Loading } from '../components/Loading';
import { ProductContext } from '../context/Product/ProductContext';
import { ProductsList } from '../components/ProductsList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext } from '../context/Cart/CartContext';
import { NoConnected } from '../components/NoConnected';
import { AuthContext } from '../context/Auth/AuthContext';
import messaging from '@react-native-firebase/messaging';
import { useNotification } from '../hooks/useNotification';
import { Carousel } from '../components/CarrouselHome';
import { Heading } from '../components/Home/Heading';
import { CurrencyHome } from '../components/Home/CurrencyHome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { calculateWbrand } from '../helpers/Dimension';

interface Props extends NativeStackScreenProps<any, any> {}

export function WelcomeScreen({ navigation, route }: Props) {
  const { getOffers, offers, getCurrencies, currencies } = useContext(OfferContext);
  const { getBrands, brands } = useContext(BrandContext);
  const { getCategories, categories } = useContext(CategoryContext);
  const { getIndexProducts, products } = useContext(ProductContext);
  const { columns } = calculateWbrand();
  const [refreshing, setRefreshing] = useState(false);
  const { getCart } = useContext(CartContext);
  const [connected, setConected] = useState(true);
  const { status } = useContext(AuthContext);
  const { sendToken } = useNotification();
  const { localCurrency } = useContext(OfferContext);
  const [loading, setLoading] = useState(true);

  NetInfo.fetch().then(state => {
    setConected(state.isConnected);
  });

  const getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    const url = status === 'unauthorized' ? '/notification-mobile' : '/notification-mobile/auth';
    const currentLocal = (await AsyncStorage.getItem('currency')) || 'MXN';
    sendToken(token, url);
    localCurrency(currentLocal);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    setLoading(true);
    getOffers();
    getBrands();
    getCategories();
    getIndexProducts();
    getCurrencies();
    getCart();
    setLoading(false);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getOffers();
    await getBrands();
    await getCategories();
    await getIndexProducts();
    await getCart();
    setRefreshing(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <>
        {connected === true ? (
          <>
            <CurrencyHome connected={connected} currencies={currencies} />
            <Box flex={1}>
              <FlatList
                data={[{ type: 'IndexProducts', data: [{ products }] }]}
                renderItem={({ item }) => {
                  switch (item.type) {
                    case 'IndexProducts':
                      return (
                        <>
                          <Heading title='Últimos agregados' />
                          <ProductsList products={products} navigation={navigation} route={route} />
                        </>
                      );
                    default:
                      return null;
                  }
                }}
                keyExtractor={(index) => index.toString()}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
              />
            </Box>
          </>
        ) : (
          <>
            <Box bg={'white'} h={'100%'}>
              <NoConnected />
              <Button w={'60%'} alignSelf={'center'} onPress={() => NetInfo.fetch().then(state => {
                setConected(state.isConnected);
              })}>
                <Text color={'white'} bold fontSize={'lg'}>
                  Volver a cargar
                </Text>
              </Button>
            </Box>
          </>
        )}
      </>
    </>
  );
}
