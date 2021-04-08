<template>
  <a :href="href" target="_blank">{{ text }}</a>
</template>

<script>
export default {
  props: {
    href: String,
    text: String
  }
}
</script>
