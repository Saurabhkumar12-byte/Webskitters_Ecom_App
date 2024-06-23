import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from '../components/Product/ProductListScreen';
import AddProductScreen from '../components/Product/AddProductScreen';
import EditProductScreen from '../components/Product/EditProductScreen';

const Stack = createStackNavigator();

const ProductNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProductList" component={ProductListScreen} />
    <Stack.Screen name="AddProduct" component={AddProductScreen} />
    <Stack.Screen name="EditProduct" component={EditProductScreen} />
  </Stack.Navigator>
);

export default ProductNavigator;
