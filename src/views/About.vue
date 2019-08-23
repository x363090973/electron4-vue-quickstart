<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="openDevTool">打开vuedevtool</button>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')
export default {
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  mounted () {

  },

  methods: {
    openDevTool () {
      ipcRenderer.send('OPEN_DEVTOOLS')
    }
  }
}

</script>
<style lang='scss' scoped>
</style>