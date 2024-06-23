import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, selectProductById } from '../../redux/slices/productSlice';
import { RootState } from '../../redux/rootReducer';
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';

const EditProductScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { productId } = route.params;
  const product = useSelector((state: RootState) => selectProductById(state.product, productId));
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price ? product.price : ''); 
  const [description, setDescription] = useState(product?.description || '');
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || ''); 
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (product) {
      setName(product.name);
      if(product.price){setPrice(product.price.toString());}
      setDescription(product.description);
      if(product.imageUrl){setImageUrl(imageUrl);} 
    }
  }, [product]);

  const handleEditProduct = () => {
    dispatch(editProduct({ id: productId, name, price: parseFloat(price), description, imageUrl }));
    navigation.goBack();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Product Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        label="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleEditProduct}>
        Edit Product
      </Button>
      {error && <ErrorMessage error={error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
});

export default EditProductScreen;
