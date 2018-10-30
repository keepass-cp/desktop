import './utils/Storage'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import store from './store'

const isDev = process.env.NODE_ENV !== 'production'
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = isDev

// Load vue plugins
Vue.use(VueI18n)

if (module.hot) {
  const api = require('vue-hot-reload-api')
  // make the API aware of the Vue that you are using.
  // also checks compatibility.
  api.install(Vue)

  // compatibility can be checked via api.compatible after installation
  if (!api.compatible) {
    throw new Error('vue-hot-reload-api is not compatible with the version of Vue you are using.')
  }

  // indicate this module can be hot-reloaded
  module.hot.accept()
}

window.storage
  .get({
    'settings.locale': navigator.language.substr(0, 2).toLowerCase()
  })
  .then(locale => {
    const i18n = new VueI18n({
      locale,
      fallbackLocale: 'en',
      messages: {
        en: require('@assets/locales/en.json'),
        fr: require('@assets/locales/fr.json')
      },
      dateTimeFormats: {
        en: {
          short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          },
          long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          }
        },
        fr: {
          short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          },
          long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          }
        }
      }
    })

    // eslint-disable-next-line no-new
    new Vue({
      el: '#app',
      render: h => h(App),
      i18n,
      store
    })
  })
