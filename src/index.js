function buildPHPQuery(obj) {
  const query = []
  for (const name in obj) {
    const value = obj[name]
    if (!isScalar(value)) {
      if (!isTrueArray(value)) {
        buildObject(value, encodeURIComponent(name), query)
        continue
      }

      buildTrueArray(value, encodeURIComponent(name), query)
      continue
    }
    query.push(encodeURIComponent(name) + '=' + toScalar(value))
  }

  return query.join('&')
}

function isScalar(value) {
  return !(value !== null && typeof value === 'object')
}

function toScalar(scalar) {
  if (scalar === true) {
    return 'true'
  }

  if (scalar === false) {
    return 'false'
  }

  if (scalar === null || scalar === undefined) {
    return ''
  }

  return encodeURIComponent(scalar)
}

function buildObject(obj, name, query) {
  for (const key in obj) {
    const value = obj[key]
    if (!isScalar(value)) {
      if (!isTrueArray(value)) {
        buildObject(value, name + '[' + encodeURIComponent(key) + ']', query)
        continue
      }

      buildTrueArray(value, name + '[' + encodeURIComponent(key) + ']', query)
      continue
    }

    query.push(name + '[' + encodeURIComponent(key) + ']=' + toScalar(value))
  }
}

function isTrueArray(obj) {
  if (!Array.isArray(obj)) {
    return false
  }

  for (const value of obj) {
    if (
      !isScalar(value) &&
      !(Object.keys(value).length === 1 || Object.keys(value).length === 0)
    ) {
      return false
    }
  }

  return true
}

function buildTrueArray(array, name, query) {
  for (const value of array) {
    if (!isScalar(value)) {
      if (!isTrueArray(value)) {
        buildObject(value, name + '[]', query)
        continue
      }

      buildTrueArray(value, name + '[]', query)
      continue
    }
    query.push(name + '[]=' + toScalar(value))
  }
}
module.exports = buildPHPQuery
