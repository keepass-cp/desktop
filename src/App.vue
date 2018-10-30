<template>
  <div id="app">
    <template v-if="loaded">
      <h1>Hello world</h1>
    </template>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      loaded: false
    }
  },
  mounted () {
    window.storage.get({
      'settings.theme': 'default'
    }).then((theme) => {
      console.debug(`Selected theme: ${theme}`)
      document.body.className = `th-${theme}`

      this.loaded = true
    })
  }
}
</script>
