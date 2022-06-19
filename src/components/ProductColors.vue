<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colors" :key="color">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color" :value="color" v-model="currentColor">
        <span class="colors__value" :style="{ backgroundColor: color }">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>

export default {
  props: ['colors', 'selectedColor'],
  data() {
    return {
      currentColor: ''
      }
  },
  computed: {
    colorPick() {
      return this.$emit('update:selectedColor', this.currentColor);
    }
  }
}
</script>
