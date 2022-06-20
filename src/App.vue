<template>
  <component :is="currentPageComponent" :page-params="currentPageParams"/>
</template>

<script>
import MainPage from './pages/MainPage'
import ProductPage from './pages/ProductPage'
import NotFoundPage from './pages/NotFoundPage'
import eventBus from './eventBus'

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
}

export default {
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    }
  },
  components: { MainPage, ProductPage, NotFoundPage },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage'
    }
  },
  methods: {
    gotoPage(pageName, pageParams) {
      this.currentPage = pageName,
      this.currentPageParams = pageParams || {}
    }
  },
  created() {
    return eventBus.$on('gotoPage', (pageName, pageParams) => this.gotoPage(pageName, pageParams))
  }
}
</script>
