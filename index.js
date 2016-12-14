'use strict'

var NON_QUOTED_COMMA = /,(?=(?:[^"]|"[^"]*")*$)/
var KV_SPLITTER = /="?([^"]*)/
var KEY_PREFIX = '#EXT-X-'

module.exports = m3u

function m3u (playlist) {
  var lines = playlist.toString().split('\n')

  if (!lines.length || !startsWith(lines[0], '#EXTM3U')) {
    throw new Error('Invalid m3u playlist')
  }

  lines = lines.slice(1)

  var line
  var i
  var length = 0

  for (i = 0; i < lines.length; ++i) {
    line = trim(lines[i])

    lines[length] = startsWith(line, '#') ? transform(line) : line

    if (lines[length]) {
      ++length
    }
  }

  lines.length = length

  return lines
}

function transform (line) {
  var splitted = split(line)
  var obj = {}

  obj[normalize(splitted[0])] = splitted.length > 1
    ? parseParams(splitted[1])
    : void 0

  return obj
}

function parseParams (line) {
  var pairs = filter(line.split(NON_QUOTED_COMMA))
  var attrs = {}

  var i
  var kvList

  for (i = 0; i < pairs.length; ++i) {
    kvList = pairs[i].split(KV_SPLITTER)

    if (pairs.length === 1 && kvList.length === 1) {
      return kvList[0]
    }

    attrs[ trim(kvList[0]) ] = kvList.length > 1
      ? trim(kvList[1])
      : void 0
  }

  return attrs
}

function normalize (key) {
  return startsWith(key, KEY_PREFIX)
    ? key.slice(KEY_PREFIX.length)
    : startsWith(key, '#')
      ? key.slice(1)
      : key
}

function split (line) {
  var pos = line.indexOf(':')
  return pos > 0 ? [ line.slice(0, pos), line.slice(pos + 1) ] : [line]
}

function startsWith (s, prefix) {
  if (typeof s !== 'string') {
    return false
  }

  if (typeof s.startsWith === 'function') {
    return s.startsWith(prefix)
  }

  return s.indexOf(prefix) === 0
}

function trim (str) {
  return (typeof str.trim === 'function')
    ? str.trim()
    : str.replace(/^\s*|\s*$/g, '')
}

function filter (arr) {
  var length = 0

  for (var i = 0; i < arr.length; ++i) {
    arr[length] = trim(arr[i])

    if (arr[length]) {
      length += 1
    }
  }

  arr.length = length

  return arr
}
