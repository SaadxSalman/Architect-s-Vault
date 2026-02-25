const require_codes = require('./codes-BfZsPdy-.cjs');

//#region src/unstable-core-do-not-import/http/formDataToObject.ts
const isNumberString = (str) => /^\d+$/.test(str);
function set(obj, path, value) {
	if (path.length > 1) {
		const newPath = [...path];
		const key = newPath.shift();
		const nextKey = newPath[0];
		if (!Object.hasOwn(obj, key)) obj[key] = isNumberString(nextKey) ? [] : require_codes.emptyObject();
		else if (Array.isArray(obj[key]) && !isNumberString(nextKey)) obj[key] = Object.fromEntries(Object.entries(obj[key]));
		set(obj[key], newPath, value);
		return;
	}
	const p = path[0];
	if (obj[p] === void 0) obj[p] = value;
	else if (Array.isArray(obj[p])) obj[p].push(value);
	else obj[p] = [obj[p], value];
}
function formDataToObject(formData) {
	const obj = require_codes.emptyObject();
	for (const [key, value] of formData.entries()) {
		const parts = key.split(/[\.\[\]]/).filter(Boolean);
		set(obj, parts, value);
	}
	return obj;
}

//#endregion
Object.defineProperty(exports, 'formDataToObject', {
  enumerable: true,
  get: function () {
    return formDataToObject;
  }
});