import { promises as fs } from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

// Basic ANSI color codes
const c = {
	reset: '\x1b[0m',
	bold: '\x1b[1m',
	dim: '\x1b[2m',
	cyan: '\x1b[36m',
	green: '\x1b[32m',
	magenta: '\x1b[35m',
	yellow: '\x1b[33m'
}

function formatKb( bytes ) {
	return ( bytes / 1024 ).toFixed( 2 ) + ' kB'
}

function brotliSizePlugin() {
	return {
		name: 'brotli-size-plugin',
		apply: 'build',
		async writeBundle( { dir }, bundle ) {
			const results = []

			for ( const [fileName, info] of Object.entries( bundle ) ) {
				if ( fileName.endsWith( '.map' ) ) continue
				if ( info.type === 'chunk' || info.type === 'asset' ) {
					const filePath = path.join( dir, fileName )
					const content = await fs.readFile( filePath )
					const brotliSize = await new Promise( resolve => {
						zlib.brotliCompress( content, ( err, result ) => {
							if ( err ) return resolve( 0 )
							resolve( result.length )
						} )
					} )
					results.push( {
						fileName,
						originalSize: content.length,
						brotliSize
					} )
				}
			}

			const totalBrotli = results.reduce( ( sum, r ) => sum + r.brotliSize, 0 )
			const totalOriginal = results.reduce( ( sum, r ) => sum + r.originalSize, 0 )

			console.log( `${c.bold}\n───────────── Brotli Report ─────────────\n${c.reset}` )
			results.forEach( ( { fileName, originalSize, brotliSize } ) => {
				console.log(
					`${c.cyan}${fileName.padEnd( 40 )}${c.reset}│ ` +
          `${c.green}${formatKb( brotliSize ).padStart( 10 )}${c.reset}` +
          `  (${formatKb( originalSize )})`
				)
			} )
			console.log(
				`\n${c.cyan}Total: ` +
        `Brotli: ${formatKb( totalBrotli )}  ` +
        `(Original: ${formatKb( totalOriginal )})${c.reset}\n`
			)
		}
	}
}

export default brotliSizePlugin
export { brotliSizePlugin }
