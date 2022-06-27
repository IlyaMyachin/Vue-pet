<template>
  <div>
    <ul class="catalog__list">
      <ProductItem v-for="product in products" :key="product.id" :product="product"></ProductItem>
    </ul>
    <div v-show="products.length === 0">По вашему запросу ничего не найдено</div>
  </div>
</template>


<script>
import ProductItem from "./ProductItem";

export default {
  props: ['products'],
  components: { ProductItem },
}
</script>
