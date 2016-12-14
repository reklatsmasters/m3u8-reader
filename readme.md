# m3u8-reader
[![travis](https://travis-ci.org/ReklatsMasters/m3u8-reader.svg)](https://travis-ci.org/ReklatsMasters/m3u8-reader)
[![npm](https://img.shields.io/npm/v/m3u8-reader.svg)](https://npmjs.org/package/m3u8-reader)
[![license](https://img.shields.io/npm/l/m3u8-reader.svg)](https://npmjs.org/package/m3u8-reader)
[![downloads](https://img.shields.io/npm/dm/m3u8-reader.svg)](https://npmjs.org/package/m3u8-reader)

Read and parse m3u8 playlist into array

## Example

#### input
```
#EXTM3U
#EXT-X-MEDIA:TYPE=VIDEO,GROUP-ID="chunked",NAME="Source",AUTOSELECT=YES,DEFAULT=YES
http://1.example.com/index.m3u8
#EXT-X-PLAYLIST-TYPE:VOD
#EXTINF:10,
```

#### output
```json
[
  { "MEDIA": { 
      "TYPE": "VIDEO",
      "GROUP-ID": "chunked",
      "NAME": "Source",
      "AUTOSELECT": "YES",
      "DEFAULT": "YES" 
    }
  },
  "http://1.example.com/index.m3u8",
  { "PLAYLIST-TYPE": "VOD" },
  { "EXTINF": "10" }
]
```

## Usage

```js
const m3u = require('m3u8-reader')
const fs = require('fs')

console.log(m3u(fs.readFileSync('test.m3u8', 'utf8')))
````

## Related
* [m3u8-write](https://github.com/ReklatsMasters/m3u8-write) - create .m3u8 playlist from an array of objects
* [m3u8-stream-list](https://github.com/ReklatsMasters/m3u8-stream-list) - read list of streams from .m3u8 playlist

## License
MIT, 2016 (c) Dmitry Tsvettsikh