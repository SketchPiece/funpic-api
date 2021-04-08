<template>
  <div>
    <VueLoadImage>
      <img width="450px" slot="image" :src="link" />
      <Loader slot="preloader" />
      <div slot="error">Ошибка во время загрузки изображения 😔</div>
    </VueLoadImage>
  </div>
</template>

<script>
import VueLoadImage from 'vue-load-image'
import Loader from './Loading'

export default {
  props: {
    link: String
  },
  components: {
    VueLoadImage,
    Loader
  }
}
</script>

<style scoped>
img {
  border: 5px solid rgb(49, 146, 230, 45%);
  border-radius: 15px;
}
</style>
