import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/slices/productSlice';
import { RootState } from '../../redux/rootReducer';
import uuid from 'uuid-random';

const AddProductScreen = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(''); // New state for description
  const [imageUrl, setImageUrl] = useState(''); // New state for image URL
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.product);

  const handleAddProduct = () => {
    const id = uuid();
    dispatch(addProduct({ id, name, description, price: parseFloat(price), imageUrl }));
    navigation.goBack();
  };

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
        style={styles.input}
        keyboardType="numeric"
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
      {error && <Text style={styles.error}>{error}</Text>}
      <Button mode="contained" onPress={handleAddProduct} loading={loading}>
        Add Product
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default AddProductScreen;
