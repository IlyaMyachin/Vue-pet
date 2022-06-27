<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.image" width="120" height="120" srcset="img/phone-square-3@2x.jpg 2x" :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>
    <CartItemAmount :item-amount.sync="amount" />
    <b class="product__price">
      {{ item.product.price * item.amount | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct()">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'
import CartItemAmount from '@/components/CartItemAmount';

export default {
  props: ["item"],
  components: { CartItemAmount },
  filters: { numberFormat },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch("updateCartProductAmount", { productId: this.item.productId, amount: value });
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
    deleteProduct() {
      this.$store.dispatch('deleteCartProduct', { productId: this.item.productId })
    }
  }
}
</script>
