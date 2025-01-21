# vite-plugin-brotli-size 📦

A Vite plugin that displays the actual file sizes after building using Brotli compression

<img width="475" alt="Screenshot 2025-01-21 at 17 22 40" src="https://github.com/user-attachments/assets/b0ec058c-241e-49f0-a42c-a8db62eab958" />

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
