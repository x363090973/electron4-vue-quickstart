<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="openDevTool">打开vuedevtool</button>
    <button @click="checkForUpdate">检查更新</button>

  </div>
</template>

<script>
const { ipcRenderer } = require('electron')

const path = require('path')
export default {
  data () {
    return {
    }
  },

  components: {},

  computed: {},
  created () {
      ipcRenderer.on('updateMessage', (event, { message, data }) => {
        console.log(message,data) // Prints 'whoooooooh!'
      })
    },
  mounted () {

  },

  methods: {
    openDevTool () {
      ipcRenderer.send('OPEN_DEVTOOLS')
    },
    checkForUpdate () {

      ipcRenderer.send('checkForUpdate')
    }
  }
}

</script>
<style lang='scss' scoped>
</style>