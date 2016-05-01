'use strict'

const NON_QUOTED_COMMA = /,(?=(?:[^"]|"[^"]*")*$)/
const KV_SPLITTER = /="?([^"]*)/
const KEY_PREFIX = '#EXT-X-'

module.exports = m3u

function m3u(playlist) {
  const lines = playlist.toString().split('\n')

  if (!lines.length || !lines[0].startsWith('#EXTM3U')) {
    throw new Error('Invalid m3u playlist')
  }

  return lines.slice(1).map(line => line.startsWith("#") ? transform(line.trim()) : line.trim()).filter(Boolean)
}

function transform(line) {
  const splitted = line.split(':', 2)

  return {[normal_key(splitted[0])]: (splitted.length == 1) ? void 0 : parse_params(splitted[1])}
}

function parse_params(line) {
  const pairs = line.split(NON_QUOTED_COMMA).map(e => e.trim()).filter(Boolean)
  const attrs = {}

  for (const kv of pairs) {
    const kv_list = kv.split(KV_SPLITTER)

    if (pairs.length == 1 && kv_list.length == 1) {
      return kv_list[0]
    }

    attrs[ kv_list[0].trim() ] = kv_list.length > 1 ? kv_list[1].trim() : void 0
  }

  return attrs
}

function normal_key(key) {
  return key.startsWith(KEY_PREFIX) ? key.slice(KEY_PREFIX.length) : key.startsWith('#') ? key.slice(1) : key
}
