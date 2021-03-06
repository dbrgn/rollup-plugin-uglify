import { minify } from 'uglify-js';

export default function uglify(options = {}, minifier = minify) {
	return {
		name: 'uglify',

		transformBundle(code) {
			options.fromString = true;
			delete options.inSourceMap;
			delete options.outSourceMap;

			// trigger sourcemap generation
			if (options.sourceMap !== false) {
				options.outSourceMap = 'x';
			}

			const result = minifier(code, options);

			// Strip sourcemaps comment and extra \n
			if (result.map) {
				const commentPos = result.code.lastIndexOf('//#');
				result.code = result.code.slice(0, commentPos).trim();
			}

			return result;
		}
	};
}
