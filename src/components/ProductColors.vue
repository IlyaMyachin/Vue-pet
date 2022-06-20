<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colors" :key="color">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color" :value="color" v-model="colorPick">
        <span class="colors__value" :style="{ backgroundColor: color }">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>

export default {
  props: ['colors', 'selectedColor'],
  computed: {
    colorPick: {
      get() {
        return this.selectedColor;
      },
      set(value) {
        return this.$emit('update:selectedColor', value)
      }
    }
  }
}
</script>
