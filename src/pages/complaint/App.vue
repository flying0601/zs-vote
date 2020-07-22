
<template>

<component  v-if="currentComponent" :is="currentComponent"></component>

</template>

<script>
export default {
  components: {
    VComplaint (resolve) {
      require(['@/components/v-complaint.vue'], resolve)
    }
  },
  data () {
    return {
      currentComponent: 'VComplaint'
    }
  },

  beforeCreate () {

  },
  created () {

  },
  mounted () {

  },
  methods: {
  }
}
</script>
<style lang="scss">
</style>
