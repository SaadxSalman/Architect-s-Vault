"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultJsonSerializer_js_1 = require("./defaultJsonSerializer.js");
const extract_files_1 = require("extract-files");
const form_data_1 = __importDefault(require("form-data"));
/**
 * Duck type if NodeJS stream
 * https://github.com/sindresorhus/is-stream/blob/3750505b0727f6df54324784fe369365ef78841e/index.js#L3
 */
const isExtractableFileEnhanced = (value) => (0, extract_files_1.isExtractableFile)(value) ||
    (value !== null && typeof value === `object` && typeof value.pipe === `function`);
/**
 * Returns Multipart Form if body contains files
 * (https://github.com/jaydenseric/graphql-multipart-request-spec)
 * Otherwise returns JSON
 */
const createRequestBody = (query, variables, operationName, jsonSerializer = defaultJsonSerializer_js_1.defaultJsonSerializer) => {
    const { clone, files } = (0, extract_files_1.extractFiles)({ query, variables, operationName }, ``, isExtractableFileEnhanced);
    if (files.size === 0) {
        if (!Array.isArray(query)) {
            return jsonSerializer.stringify(clone);
        }
        if (typeof variables !== `undefined` && !Array.isArray(variables)) {
            throw new Error(`Cannot create request body with given variable type, array expected`);
        }
        // Batch support
        const payload = query.reduce((accu, currentQuery, index) => {
            accu.push({ query: currentQuery, variables: variables ? variables[index] : undefined });
            return accu;
        }, []);
        return jsonSerializer.stringify(payload);
    }
    const Form = typeof FormData === `undefined` ? form_data_1.default : FormData;
    const form = new Form();
    form.append(`operations`, jsonSerializer.stringify(clone));
    const map = {};
    let i = 0;
    files.forEach((paths) => {
        map[++i] = paths;
    });
    form.append(`map`, jsonSerializer.stringify(map));
    i = 0;
    files.forEach((paths, file) => {
        form.append(`${++i}`, file);
    });
    return form;
};
exports.default = createRequestBody;
//# sourceMappingURL=createRequestBody.js.map