import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from "@/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    cartProductsLoading: false,
    cartProductsLoadingFailed: false,
    orderInfo: null,
    orderProducts: [],
    orderIdError: false,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo
    },
    resetCart(state) {
      state.cartProducts = [],
      state.cartProductsData = []
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find(item => item.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey
    },
    updateCartProductData(state, cartItems) {
      state.cartProductsData = cartItems
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity,
          image: item.product.image.file.url
        }
      })
    }
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(p => p.product.id === item.productId).product
        return {
          ...item,
          product,
        }
      })
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0)
    },
    cartLoading(state) {
      return state.cartProductsLoading
    },
    cartLoadingFailed(state) {
      return state.cartProductsLoadingFailed
    },
    orderInfo(state) {
      return state.orderInfo
    },
    orderIdError(state) {
      return state.orderIdError
    },
    orderProducts(state) {
      const products = state.orderInfo.basket.items.map(item => {
        return {
          ...item,
          productId: item.product.id,
          amount: item.quantity
        }
      })
      return products
    }
  },
  actions: {
    loadCart(context) {
      context.state.cartProductsLoading = true;
      context.state.cartProductsLoadingFailed = false;
      return axios.get(API_BASE_URL + '/api/baskets', {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(response => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductData', response.data.items);
          context.commit('syncCartProducts')
        })
        .catch(() => context.state.cartProductsLoadingFailed = true)
        .then(() => context.state.cartProductsLoading = false);
    },
    addProductToCart(context, { productId, amount }) {
      return axios.post(API_BASE_URL + '/api/baskets/products', {
        productId,
        quantity: amount
      },
        {
          params: {
            userAccessKey: context.state.userAccessKey,
          }
        })
        .then(response => {
          context.commit('updateCartProductData', response.data.items);
          context.commit('syncCartProducts');
        })
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount })

      return axios.put(API_BASE_URL + '/api/baskets/products', {
        productId,
        quantity: amount
      },
        {
          params: {
            userAccessKey: context.state.userAccessKey,
          }
        })
        .then(response => {
          context.commit('updateCartProductData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        })
    },
    deleteCartProduct(context, { productId }) {
      context.commit('deleteCartProduct', productId)

      return axios.delete(API_BASE_URL + '/api/baskets/products', {
        data: {
          productId
        },
        params: {
          userAccessKey: context.state.userAccessKey,
        }
      })
        .then(response => {
          context.commit('updateCartProductData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        })
    },
    loadOrderInfo(context, orderId) {
      context.state.orderIdError = false;
      return axios.get(API_BASE_URL + '/api/orders/' + orderId, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
      .then(response => {
        context.commit('updateOrderInfo', response.data);
      })
      .catch(() => context.state.orderIdError = true)
    }
  }
})
