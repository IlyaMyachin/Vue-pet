<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="sendOrder()">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText title="ФИО" :error="formError.name" placeholder="Введите ваше полное имя"
              v-model="formData.name" />
            <BaseFormText title="Адрес доставки" :error="formError.address" placeholder="Введите ваш адрес"
              v-model="formData.address" />
            <BaseFormText title="Телефон" :error="formError.phone" type="tel" placeholder="Введите ваш телефон"
              v-model="formData.phone" />
            <BaseFormText title="Email" :error="formError.email" type="email" placeholder="Введи ваш Email"
              v-model="formData.email" />
            <BaseFormTextarea title="Комментарий к заказу" :error="formError.comment" placeholder="Ваши пожелания"
              v-model="formData.comment" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart__block">
          <OrderProductsList :products="products" :total-price="totalPrice" />
          <button class="cart__button button button--primery" type="submit" :disabled="sendingOrder">
            Оформить заказ
          </button>
        </div>

        <div v-if="sendingOrder">Оформляем...</div>
        <div v-else-if="emptyCartError" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ emptyCartError }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>

import OrderProductsList from '@/components/OrderProductsList';
import { mapGetters } from 'vuex';
import BaseFormText from '@/components/BaseFormText';
import BaseFormTextarea from '@/components/BaseFormTextarea';
import axios from 'axios';
import { API_BASE_URL } from "@/config";

export default {
  data() {
    return {
      formData: {},
      formError: {},
      emptyCartError: '',
      sendingOrder: false,
      sendingOrderFailed: false,
    }
  },
  components: { OrderProductsList, BaseFormText, BaseFormTextarea },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
    })
  },
  methods: {
    sendOrder() {
      this.formError = {};
      this.emptyCartError = '';
      this.sendingOrder = true;
      this.sendingOrderFailed = false;
      this.sendingOrderSuccess = false;

      axios.post(API_BASE_URL + '/api/orders',
        { ...this.formData },
        {
          params: {
            userAccessKey: this.$store.state.userAccessKey
          }
        })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.emptyCartError = error.response.data.error.message
        })
        .then(() => {
          this.sendingOrder = false;
        })
    }
  }
}
</script>
