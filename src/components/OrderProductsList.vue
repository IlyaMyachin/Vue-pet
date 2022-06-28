<template>
  <div>
    <ul class="cart__orders">
      <OrderItem v-for="item in products" :key="item.productId" :item="item" />
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: <b>{{ products.length }}</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
    </div>
  </div>
</template>

<script>
import OrderItem from '@/components/OrderItem'
import numberFormat from '@/helpers/numberFormat'

export default {
  components: { OrderItem },
  props: ['products', 'totalPrice'],
  filters: { numberFormat }
}
</script>
