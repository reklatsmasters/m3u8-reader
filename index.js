'use strict'

const NON_QUOTED_COMMA = /,(?=(?:[^"]|"[^"]*")*$)/
const KV_SPLITTER = /="?([^"]*)/
const KEY_PREFIX = '#EXT-X-'

module.exports = m3u

function m3u (playlist) {
  const lines = playlist.toString().split('\n')

  if (!lines.length || !lines[0].startsWith('#EXTM3U')) {
    throw new Error('Invalid m3u playlist')
  }

  return lines.slice(1).map(line => line.startsWith('#') ? transform(line.trim()) : line.trim()).filter(Boolean)
}

function transform (line) {
  const splitted = split(line)

  return {[normalKey(splitted[0])]: (splitted.length === 1) ? void 0 : parseParams(splitted[1])}
}

function parseParams (line) {
  const pairs = line.split(NON_QUOTED_COMMA).map(e => e.trim()).filter(Boolean)
  const attrs = {}

  for (const kv of pairs) {
    const kvList = kv.split(KV_SPLITTER)

    if (pairs.length === 1 && kvList.length === 1) {
      return kvList[0]
    }

    attrs[ kvList[0].trim() ] = kvList.length > 1 ? kvList[1].trim() : void 0
  }

  return attrs
}

function normalKey (key) {
  return key.startsWith(KEY_PREFIX) ? key.slice(KEY_PREFIX.length) : key.startsWith('#') ? key.slice(1) : key
}

function split (line) {
  const pos = line.indexOf(':')
  return pos > 0 ? [ line.slice(0, pos), line.slice(pos + 1) ] : [line]
}
