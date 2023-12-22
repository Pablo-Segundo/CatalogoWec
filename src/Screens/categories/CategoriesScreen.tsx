import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ImageBackground,
  ScrollView,
  TextInput,
  SectionList,
} from 'react-native';
import API from '../../API/API';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoadingScreen from '../../components/loadintgScreen';
import { Button, Card, Searchbar, } from 'react-native-paper';
import { InternetComponet } from '../../components/internetcomp/InternetComponet';
import { NetworkModal } from '../../components/internetcomp/NetworkModal';
import { NetworkContext } from '../../context/NetworkConect/NetworkContext';
import { FloatingAction } from 'react-native-floating-action';
import { Recently } from '../../components/Recently';
import { TutoScreen } from '../../components/tutosReact/tutoScreen';
import { SearchBar } from '../../components/searchBar';
import Icon from 'react-native-vector-icons/AntDesign';

import { Box, Heading } from 'native-base';
import { ProductCard } from '../../components/ProductCard';
import { ProductContext } from '../../context/Product/ProductContext';
import { IndexProducts } from '../../components/IndexProducts';
import { FirstScreen } from '../../components/FirstScreen';

import { AppTourView, AppTourSequence } from 'react-native-copilot';
npm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilotnpm i react-native-copilot
interface Props extends NativeStackScreenProps<ñ´dsfmaklfgdn sks dfl,mnnakdsklf bnasjklnfbj sz<jkadjhfbjkdefjkwbdfhjbjkadsfjbfdsjkbldsabjknfkbdndksabjkfbknfsamn,emn, jk
adljmndfaklsdndf kasn adflsjkdnur klzsdjn klf asdf nasdklf klnnajs dgsjkal,dbjln asm,df

export const CategoriesScreen = ({ navigation, start }: Props) => {
  const [categories, setCategories] = useState();
  const { height, width } = Dimensions.get('window');
  const [brands, setBrands] = useState([]);
  const { isConnected } = useContext(NetworkContext);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [isFABActive, setIsFABActive] = useState(false);
  const [serchbar, setSerchbar] = useState('');
  const [tutorialVisible, setTutorialVisible] = useState(true);

  const { getIndexProducts, products } = useContext(ProductContext);

  // recomendaciones
  const [recommendations, setRecommendations] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await API.get('/categories');
      const categories = data.categories.filter(
        (category: any) => category.totalProducts > 0,
      );
      setCategories(categories);
    } catch (error) {
      console.log(error);
   
    }
  };

  const handleFetch = () => {
    if (isConnected) {
      setVisible(true);
      return;
    }
    getCategories();
  };

  //  useEffect(() => {
  //   getIndexProducts();
  //  console.log(typeof getIndexProducts  )
  // }, []);

  useEffect(() => {
    handleFetch();
  }, []);


  const getBrands = async () => {
    try {
      const { data } = await API.get('/brands');
      const brands = data.brands;
      setBrands(brands);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getBrands();

  }, []);
  if (!categories || !brands) {
    return <LoadingScreen />;
    
  }
  const actions = [
    {
      text: 'Accessibility',
      icon: require('../../assets/lottie/osuxd.png'),
      name: 'bt_accessibility',
      position: 2,
    },
    {
      text: 'Contácto',
      icon: require('../../assets/lottie/osuxd.png'),
      name: 'bt_language',
      position: 1,
    },


  ];

  const handleSearch = () => {
  };

  const handleTutorialPress = () => {
    setTutorialVisible(false);
    // Puedes realizar acciones adicionales después de que el usuario presiona OK.
  };

  function start(): void {
    throw new Error('Function not implemented.');
  }

  // const handleRefresh = async () => {
  //   setRefreshing(true);

  //   await getBrands();
  //   await getCategories();
  //   await getIndexProducts();

  //   setRefreshing(false);
  // };

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  const handleStart = () => {
    const tourSteps = [
      {
        targetView: 'button1',
        title: 'Paso 1',
        description: 'Este es el botón 1',
        outerCircleColor: '#3498db',
        innerCircleColor: '#3498db',
        targetRadius: 40,
        titleTextSize: 24,
        descriptionTextSize: 16,
      },
    ];

    const tourSequence = new AppTourSequence();
    tourSteps.forEach(step => tourSequence.addStep(step));

    start(tourSequence);
  };



  return (
    <>
      
      <InternetComponet>
      <View style={styles.container2}>
      <TouchableOpacity
        style={styles.button2}
        onPress={handleStart}
        testID="button1"
      >
        <Text style={styles.buttonText2}>Botón 1</Text>
      </TouchableOpacity>

      <AppTourView />
    </View>

    <View>
    <Button title="Start tutorial" onPress={() => start()} />
    </View>
  

        <NetworkModal visible={visible} setVisible={setVisible} />
        <ScrollView
        // bounces={false}
        >
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}>
              <Card style={styles.cardContainer2}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Icon name="search1" size={30} color="#000" />
                  <Text style={{ color: 'gray', marginVertical: 5 }}> buscar un producto</Text>
                </View>
              </Card>
            </TouchableOpacity>

          </View>

          <View>
            {/* <Text style={{color:'black', fontSize: 18, fontWeight: 'bold'}}> Productos Agregados</Text> */}
            <Card style={styles.cardContainer}>
              <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
                {' '}
                Marcas{' '}
              </Text>
            </Card>
          </View>

          <FlatList
            data={brands}
            nestedScrollEnabled={true}
            scrollEnabled={true}
            horizontal={true}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ borderRadius: 100 }}
                onPress={() => navigation.navigate('brands', item)}>
                <View style={styles.directiorow}>
                  <View style={styles.imageContainer}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      {' '}
                      -{item.name}-
                    </Text>
                    <ImageBackground
                      source={{ uri: item.images['400x400'] }}
                      style={styles.imagebrand}></ImageBackground>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />


          <View>
            <Card style={styles.cardContainer}>
              <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
                {' '}
                Tambien te puede interesar{' '}
              </Text>
            </Card>
     <Card>
      <View>
            {/* <Recently />  */}
               <IndexProducts   />
           </View>
     </Card>
           
                
            
          </View>

          <View>
            {/* <Text style={{color:'black', fontSize: 18, fontWeight: 'bold'}}> Productos Agregados</Text> */}
            <Card style={styles.cardContainer}>
              <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
                {' '}
                categorías{' '}
              </Text>
            </Card>
          </View>

          <View style={{ marginTop: 10 }}></View>


          <FlatList
            data={categories}
            style={{ alignSelf: 'center', width: '100%' }}
            numColumns={height / width > 1.6 ? 1 : 2}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity
                  style={styles.container}
                  onPress={() => navigation.navigate('Products', item)}>
                  <ImageBackground
                    source={{ uri: item.imagesMobile['400x400'] }}
                    resizeMode="cover"
                    style={styles.image}>
                    <View style={styles.overlay}>
                      <Text style={styles.text}>-{item.name}-</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </>
            )}
          />
          {categories.length === 0 && (
            <Text style={{color:'black'}}>
              Por el momento no hay datos que mostrar.
            </Text>
          )}
          
        </ScrollView>

        {isFABActive && <View style={styles.overlayFLOAT}></View>}
        <View style={{ position: 'absolute', bottom: 20, right: 5, zIndex: 999 }}>
          <FloatingAction
            actions={actions}
            buttonSize={65}
            color="#FF1493"
            position="right"
            // overrideWithAction={true}
            onOpen={() => setIsFABActive(true)}
            onClose={() => setIsFABActive(false)}
            onPressItem={name => {
              console.log(`selected button: ${name}`);
            }}
          />
        </View>

      
      </InternetComponet>

 
<View>
   <FirstScreen/>
</View>
     
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width:
      Dimensions.get('window').height / Dimensions.get('window').width > 1.6
        ? '100%'
        : '48%',
    justifyContent: 'center',
    alignItems: 'center',
    margin:
      Dimensions.get('window').height / Dimensions.get('window').width > 1.6
        ? 0
        : 5,
    marginBottom: 5,
  },

  container2: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  button2: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
  },
  buttonText2: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },


  cardproducts: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  overlayFLOAT: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semi-transparente
    zIndex: 998, // Asegura que esté por debajo del FAB
  },
  image: {
    width: '100%',
    height: 170,
    resizeMode: 'cover',
  },

  imagebrand: {
    width: 105,
    height: 100,

    resizeMode: 'cover',
  },

  imageContainer: {
    width: 150,
    marginRight: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10,
  },
  directiorow: {
    flexDirection: 'row',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: Dimensions.get('window').height * 0.03,
    fontWeight: 'bold',
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
  cardContainer2: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  headerText: {
    textAlign: 'left',
    fontSize: 19,
    color: 'black',
  },
  imgHeaderContainer: {
    width: 71,
    height: 95,
    backgroundColor: '#ff1493',
  },
  directionInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: 'white',
    color: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '100%',
    minWidth: '98%',
    maxWidth: '98%',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10
  },
});
