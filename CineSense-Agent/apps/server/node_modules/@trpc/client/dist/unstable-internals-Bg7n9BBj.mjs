//#region src/internals/transformer.ts
/**
* @internal
*/
/**
* @internal
*/
function getTransformer(transformer) {
	const _transformer = transformer;
	if (!_transformer) return {
		input: {
			serialize: (data) => data,
			deserialize: (data) => data
		},
		output: {
			serialize: (data) => data,
			deserialize: (data) => data
		}
	};
	if ("input" in _transformer) return _transformer;
	return {
		input: _transformer,
		output: _transformer
	};
}

//#endregion
export { getTransformer };
//# sourceMappingURL=unstable-internals-Bg7n9BBj.mjs.map