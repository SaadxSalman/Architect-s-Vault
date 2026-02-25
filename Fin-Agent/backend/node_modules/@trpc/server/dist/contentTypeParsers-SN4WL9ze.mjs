//#region src/unstable-core-do-not-import/http/contentTypeParsers.ts
const octetInputParser = {
	_input: null,
	_output: null,
	parse(input) {
		if (input instanceof ReadableStream) return input;
		throw new Error(`Parsed input was expected to be a ReadableStream but was: ${typeof input}`);
	}
};

//#endregion
export { octetInputParser };
//# sourceMappingURL=contentTypeParsers-SN4WL9ze.mjs.map