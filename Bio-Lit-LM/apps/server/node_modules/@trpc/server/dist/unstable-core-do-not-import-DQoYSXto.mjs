//#region src/unstable-core-do-not-import/http/formDataToObject.ts
const isNumberString = (str) => /^\d+$/.test(str);
const isUnsafeKey = (key) => key === "__proto__" || key === "constructor" || key === "prototype";
function set(obj, path, value) {
	if (path.length > 1) {
		const newPath = [...path];
		const key = newPath.shift();
		const nextKey = newPath[0];
		if (isUnsafeKey(key)) return;
		if (!Object.hasOwn(obj, key)) obj[key] = isNumberString(nextKey) ? [] : Object.create(null);
		else if (Array.isArray(obj[key]) && !isNumberString(nextKey)) obj[key] = Object.fromEntries(Object.entries(obj[key]));
		set(obj[key], newPath, value);
		return;
	}
	const p = path[0];
	if (isUnsafeKey(p)) return;
	if (obj[p] === void 0) obj[p] = value;
	else if (Array.isArray(obj[p])) obj[p].push(value);
	else obj[p] = [obj[p], value];
}
function formDataToObject(formData) {
	const obj = Object.create(null);
	for (const [key, value] of formData.entries()) {
		const parts = key.split(/[\.\[\]]/).filter(Boolean);
		set(obj, parts, value);
	}
	return obj;
}

//#endregion
export { formDataToObject };
//# sourceMappingURL=unstable-core-do-not-import-DQoYSXto.mjs.map