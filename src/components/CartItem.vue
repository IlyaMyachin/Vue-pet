<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" srcset="img/phone-square-3@2x.jpg 2x"
        :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <div class="form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="removeOneProduct">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count">

      <button type="button" aria-label="Добавить один товар" @click.prevent="addOneProduct">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ item.product.price * item.amount | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
    @click.prevent="deleteProduct(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'

export default {
  props: ["item"],
  filters: { numberFormat },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.commit("updateCartProductAmount", { productId: this.item.productId, amount: value });
      }
    }
  },
  methods: {
    removeOneProduct() {
      if (this.amount > 1) {
        return this.amount--
      }
      else {
        return this.amount
      }
    },
    addOneProduct() {
      return this.amount++
    },
    deleteProduct(productId) {
      this.$store.commit('deleteCartProduct', productId)
    }
  }
}
</script>
