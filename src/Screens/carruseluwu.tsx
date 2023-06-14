import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Product } from '../interfaces/ProductsCategoryInterface';

interface Props {
  product: Product;
  route: any;
}


export const Carrusel = ({ product }: Props) => {
   //c onst [imageSize, setImageSize] = useState({ width: 300, height: 200 });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { width: screenWidth } = Dimensions.get('window');

  const renderCarouselItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => {
      setSelectedImageIndex(index);
      setIsModalVisible(true);
    }}>
      <Image style={styles.cardImage} source={{ uri: item.images['400x400'] }} />
    </TouchableOpacity>
  );



  return (
    <View>
      <Carousel
       renderItem={renderCarouselItem}
        data={product.multimedia}
        

        
        sliderWidth={screenWidth}
        itemWidth={300}
        loop={true}
        autoplay={true}
        autoplayInterval={2000}
      />

      <Modal visible={isModalVisible} transparent>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}
        >
          <Image
            style={styles.modalImage}
            source={{ uri: product.multimedia[selectedImageIndex].images['400x400'] }}
          />


        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: 300,
    height: 200,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalImage: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height - 80,
  },
});
