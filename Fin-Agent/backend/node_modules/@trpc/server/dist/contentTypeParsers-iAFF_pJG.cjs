
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
Object.defineProperty(exports, 'octetInputParser', {
  enumerable: true,
  get: function () {
    return octetInputParser;
  }
});