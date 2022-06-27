<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color" :value="color.id" v-model="colorPick">
        <span class="colors__value" :style="{ backgroundColor: color.code }">
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
