<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#" @click.prevent="gotoPage('product', {id: product.id})">
      <img style="object-fit: contain" :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="itemColor in product.colors" :key="itemColor">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="itemColor" v-model="color">
          <span class="colors__value" :style="{ backgroundColor: itemColor, outline: addOutline(itemColor) }">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage'
import numberFormat from '@/helpers/numberFormat'

export default {
  props: ['product'],
  data() {
    return {
      color: this.product.colors[0],
    }
  },
  methods: {
    addOutline(currentColor) {
      if (currentColor === '#FFF') {
        return '1px solid #000'
      }
      else {
        return 'none'
      }
    },
    gotoPage
  },
  filters: {
    numberFormat
  }
}
</script>
