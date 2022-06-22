<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="removeOneProduct">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="currentItemAmount" name="count">

    <button type="button" aria-label="Добавить один товар" @click.prevent="addOneProduct">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ["itemAmount"],

  methods: {
    removeOneProduct() {
      if (this.currentItemAmount > 1) {
        return this.currentItemAmount--
      }
      else {
        return this.currentItemAmount
      }
    },
    addOneProduct() {
      return this.currentItemAmount++
    }
  },
  computed: {
    currentItemAmount: {
      get() {
        return this.itemAmount;
      },
      set(value) {
        return this.$emit('update:itemAmount', value)
      }
    }
  }
}
</script>
