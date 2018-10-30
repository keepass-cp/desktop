import Utility from './Utility'

class Storage {
  constructor () {
    if (typeof browser === 'undefined') {
      this._isBrowser = false
      this._storage = require('electron-settings')
    } else {
      this._isBrowser = true
    }
  }

  has (key, type = 'locale') {
    if (this._isBrowser) {
      return browser.storage[this._fixType(type)]
        .get(key)
        .then(() => true)
        .catch(() => false)
    } else {
      return Promise.resolve(this._storage.has(key))
    }
  }

  get (keys, type = 'locale') {
    if (this._isBrowser) {
      return browser.storage[this._fixType(type)].get(keys)
    } else {
      if (keys === null || typeof keys === 'undefined') return Promise.resolve(this._storage.getAll())
      else if (Array.isArray(keys)) {
        return Promise.all(keys.map(key => Promise.resolve(this._storage.get(key))))
      } else if (typeof keys === 'string') {
        return Promise.resolve(this._storage.get(keys))
      } else {
        let values = []
        keys = Utility.flatten(keys)
        for (const key in keys) {
          if (keys.hasOwnProperty(key)) {
            values.push(Promise.resolve(this._storage.get(key, keys[key])))
          }
        }
        return Promise.all(values)
      }
    }
  }

  set (keys, type = 'locale') {
    if (this._isBrowser) {
      return browser.storage[this._fixType(type)].set(keys)
    } else {
      return Promise.resolve(this._storage.setAll(keys))
    }
  }

  remove (keys, type = 'locale') {
    if (this._isBrowser) {
      return browser.storage[this._fixType(type)].remove(keys)
    } else {
      if (Array.isArray(keys)) {
        return Promise.all(keys.map(key => Promise.resolve(this._storage.delete(key))))
      } else {
        return Promise.resolve(this._storage.delete(keys))
      }
    }
  }

  clear (type = 'locale') {
    if (this._isBrowser) {
      return browser.storage[this._fixType(type)].clear()
    } else {
      return Promise.resolve(this._storage.deleteAll())
    }
  }

  _fixType (type) {
    switch (type) {
      case 'loale':
      case 'sync':
        return type

      default:
        return 'sync'
    }
  }
}

export default window.storage || (window.storage = new Storage())
