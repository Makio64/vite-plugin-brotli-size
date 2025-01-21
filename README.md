# vite-plugin-brotli-size 📦

A Vite plugin that displays the actual file sizes after building using Brotli compression

## Installation

use your favorite pnpm / npm / yarn
```bash
pnpm i vite-plugin-brotli-size --save-dev
```
```bash
npm install vite-plugin-brotli-size --save-dev
```
```bash
yarn add vite-plugin-brotli-size --save-dev
```

## Usage
```js
// vite.config.js
import { defineConfig } from 'vite'
import brotliSizePlugin from 'vite-plugin-brotli-size'

export default defineConfig({
  plugins: [
    brotliSizePlugin()
  ]
})
```

After building (vite build), a Brotli compression report will appear in the console.

## License
MIT
