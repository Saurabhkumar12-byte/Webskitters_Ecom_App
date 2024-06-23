import { takeLatest, call, put, all } from 'redux-saga/effects';
import firebase from 'firebase/compat/app';
import { firestore } from '../../config/firebase';
import {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProduct,
  addProductSuccess,
  addProductFailure,
  editProduct,
  editProductSuccess,
  editProductFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
} from '../slices/productSlice';
import { Product } from '../../types';

function* handleFetchProducts(): Generator<any, void, any> {
  try {
    console.log("inside firestore")
    const snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = yield call(() => firestore.collection('products').get());
    const products: Product[] = snapshot.docs.map(doc => {
      const data = doc.data() as Product; 
      console.log("got the data")

      return {
        id: doc.id,
        name: data.name,
        price: data.price,
        description: data.description,
        imageUrl:data.imageUrl
      };
    });
    yield put(fetchProductsSuccess(products));
  } catch (error: any) {
    console.log("error")

    yield put(fetchProductsFailure(error.message));
  }
}

function* handleAddProduct(action: ReturnType<typeof addProduct>): Generator<any, void, any> {
  try {
    const product: Product = action.payload;
    const docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = yield call(() => firestore.collection('products').add(product));
    yield put(addProductSuccess({ ...product, id: docRef.id }));
  } catch (error: any) {
    yield put(addProductFailure(error.message));
  }
}

function* handleEditProduct(action: ReturnType<typeof editProduct>): Generator<any, void, any> {
  try {
    console.log("inside edit saga")
    const { id, name, price, description } = action.payload;
    yield call(() => firestore.collection('products').doc(id).update({ name, price, description }));
    yield put(editProductSuccess({ id, name, price, description }));
  } catch (error: any) {
    yield put(editProductFailure(error.message));
  }
}

function* handleDeleteProduct(action: ReturnType<typeof deleteProduct>): Generator<any, void, any> {
  try {
    const id = action.payload;
    yield call(() => firestore.collection('products').doc(id).delete());
    yield put(deleteProductSuccess(id));
  } catch (error: any) {
    yield put(deleteProductFailure(error.message));
  }
}

export default function* productSaga(): Generator<any, void, any> {
  yield all([
    takeLatest(fetchProducts.type, handleFetchProducts),
    takeLatest(addProduct.type, handleAddProduct),
    takeLatest(editProduct.type, handleEditProduct),
    takeLatest(deleteProduct.type, handleDeleteProduct),
  ]);
}
