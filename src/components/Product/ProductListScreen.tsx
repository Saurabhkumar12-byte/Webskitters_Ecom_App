import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Button, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../redux/slices/productSlice';
import { RootState } from '../../redux/rootReducer';
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';

const ProductListScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []); 

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProduct(id));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <View style={styles.noProductsContainer}>
          <Text>No products available.</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              description={`Name: ${item.name}\nDescription: ${item.description}\nPrice: Rs ${item.price}\nProduct ID: ${item.id}`}
              left={(props) => <List.Icon {...props} icon={item.imageUrl ? { uri: item.imageUrl } : 'folder'} />}
              right={() => (
                <View style={styles.actions}>
                  <Button onPress={() => navigation.navigate('EditProduct', { productId: item.id })}>Edit</Button>
                  <Button onPress={() => handleDeleteProduct(item.id)}>Delete</Button>
                </View>
              )}
              titleNumberOfLines={2} 
              descriptionNumberOfLines={5} 
            />
          )}
        />
      )}
      <Button mode="contained" onPress={() => navigation.navigate('AddProduct')}>
        Add Product
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  actions: {
    flexDirection: 'row',
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductListScreen;
