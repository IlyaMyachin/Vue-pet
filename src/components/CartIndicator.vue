<template>
  <router-link class="header__cart" :to="{name: 'cart'}" aria-label="Корзина с товарами">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span v-if="loading" class="header__count" aria-label="Количество товаров">...</span>
    <span v-else class="header__count" aria-label="Количество товаров">{{ $store.state.cartProducts.length }}</span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
 computed: {
    ...mapGetters({
      loading: 'cartLoading'}),
  },
}
</script>
