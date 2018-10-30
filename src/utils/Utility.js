export default {
  flatten (input, reference = undefined, output = {}) {
    for (var key in input) {
      var value = input[key]
      key = reference ? reference + '.' + key : key
      if (typeof value === 'object' && value !== null) {
        this.flatten(value, key, output)
      } else {
        output[key] = value
      }
    }
    return output
  }
}
