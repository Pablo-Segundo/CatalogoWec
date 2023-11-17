import React, {useState, useEffect, useContext} from 'react';
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
} from 'react-native';
import API from '../../API/API';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import LoadingScreen from '../Products/loadintgScreen';
import {Card} from 'react-native-paper';
import {InternetComponet} from '../../components/InternetComponet';
import {NoInternet} from '../../components/NoInternet ';
import {NetworkModal} from '../../components/NetworkModal';
import {NetworkContext} from '../../context/NetworkContext';
import {FloatingAction} from 'react-native-floating-action';


interface Props extends NativeStackScreenProps<any, any> {}

export const CategoriesScreen = ({navigation}: Props) => {
  const [categories, setCategories] = useState();
  const {height, width} = Dimensions.get('window');
  const [brands, setBrands] = useState([]);
  const {isConnected} = useContext(NetworkContext);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [isFABActive, setIsFABActive] = useState(false);
  
  // recomendaciones
  const [recommendations, setRecommendations] = useState([]);

  const getCategories = async () => {
    try {
      const {data} = await API.get('/categories');
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

  useEffect(() => {
    handleFetch();
  }, []);

  const getBrands = async () => {
    try {
      const {data} = await API.get('/brands');
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
    // useEffect(() => {
    //   getCategories();
    //   getBrands();
    // }, []);
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
    {
      text: 'Location',
      icon: require('../../assets/lottie/osuxd.png'),
      name: 'bt_room',
      position: 3,
    },
    {
      text: 'Video',
      icon: require('../../assets/lottie/osuxd.png'),
      name: 'bt_videocam',
      position: 4,
    },
  ];

  return (
    <>
      <InternetComponet>
        <NetworkModal visible={visible} setVisible={setVisible} />

        {/* <TouchableOpacity
                    onPress={handleFetch}
                    style={{
                        width: '90%',
                        height: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'teal' //375027 
                    }}
                >
                    <Text style={{
                        color: 'white'
                    }}>
                        Get Dummy Todos
                    </Text>
                </TouchableOpacity>
                <Text>
                    Dummy to do: {title}
                </Text> */}

        <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Buy now!</Text>
            <View style={styles.imgHeaderContainer} />
          </View>

          <View>
            {/* <Text style={{color:'black', fontSize: 18, fontWeight: 'bold'}}> Productos Agregados</Text> */}
            <Card style={styles.cardContainer}>
              <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
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
            keyExtractor={item => item._id.toString()}
            renderItem={({item}) => (
              <ScrollView horizontal={true}>
                <TouchableOpacity
                  style={{borderRadius: 100}}
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
                        source={{uri: item.images['400x400']}}
                        style={styles.imagebrand}></ImageBackground>
                    </View>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            )}
          />

          <View>
            <Card style={styles.cardContainer}>
              <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
                {' '}
                Tambien te puede interesar{' '}
              </Text>
            </Card>

            <TouchableOpacity>
                 {/* <Recently/>  */}
            </TouchableOpacity>
          </View>

          <View>
            {/* <Text style={{color:'black', fontSize: 18, fontWeight: 'bold'}}> Productos Agregados</Text> */}
            <Card style={styles.cardContainer}>
              <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
                {' '}
                categorías{' '}
              </Text>
            </Card>
          </View>

          <View style={{marginTop: 10}}></View>


          <FlatList
            data={categories}
            style={{alignSelf: 'center', width: '100%'}}
            numColumns={height / width > 1.6 ? 1 : 2}
            renderItem={({item}) => (
              <>
                <TouchableOpacity
                  style={styles.container}
                  onPress={() => navigation.navigate('Products', item)}>
                  <ImageBackground
                    source={{uri: item.imagesMobile['400x400']}}
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

          <View>
            {/* <Text style={{color:'black', fontSize: 18, fontWeight: 'bold'}}> Productos Agregados</Text> */}
            <Card style={styles.cardContainer}>
              <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
                {' '}
                productos mas comprados{' '}
              </Text>
            </Card>
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Other Booking Now!</Text>
            <View style={styles.imgHeaderContainer} />
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Other Booking Now!</Text>
            <View style={styles.imgHeaderContainer} />
          </View>
        </ScrollView>

        {isFABActive && <View style={styles.overlayFLOAT}></View>}
        <View style={{position: 'absolute', bottom: 20, right: 5, zIndex: 999}}>
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
});
