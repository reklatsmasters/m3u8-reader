'use strict'

import m3u8 from './'
import * as fs from 'fs'
import test from 'ava'

const playlist = fs.readFileSync('test.m3u8', 'utf8')

const template = [
  {STATUS: void 0},
  {'ID3-EQUIV-TDTG': '2015-01-01T01:21:00'},
  { MEDIA: {
    TYPE: 'VIDEO',
    'GROUP-ID': 'chunked',
    NAME: 'Source',
    AUTOSELECT: 'YES',
    DEFAULT: 'YES'
  }
  },
  { 'STREAM-INF': {
    'PROGRAM-ID': '1',
    BANDWIDTH: '3454382',
    RESOLUTION: '1280x720',
    VIDEO: 'chunked'
  }
  },
  'http://1.example.com/index.m3u8',
  { MEDIA: {
    TYPE: 'VIDEO',
    'GROUP-ID': 'high',
    NAME: 'High',
    AUTOSELECT: 'YES',
    DEFAULT: 'YES'
  }
  },
  { 'STREAM-INF': {
    'PROGRAM-ID': '1',
    BANDWIDTH: '1760000',
    RESOLUTION: '1280x720',
    VIDEO: 'high',
    CODECS: 'avc1.42C01E,mp4a.40.2'
  }
  },
  'http://2.example.com/index.m3u8',
  { 'PLAYLIST-TYPE': 'VOD' },
  { 'EXTINF': '10' }
]

test('m3u8', t => {
  t.deepEqual(m3u8(playlist), template)
})
