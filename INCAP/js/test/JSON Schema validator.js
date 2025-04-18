// Validating a JSON string involves checking whether the string is properly formatted according to the JSON specification. This can be done using a few different methods in JavaScript. Here are some common approaches:

// ### 1. Using `JSON.parse()`
// The simplest way to validate a JSON string is to attempt to parse it using `JSON.parse()`. If the string is not valid JSON, this method will throw an error.

// ```javascript
function isValidJSON(jsonString) {
    try {
        JSON.parse(jsonString);
        return true; // Valid JSON
    } catch (e) {
        return false; // Invalid JSON
    }
}

// Example usage
const jsonString = '{"name": "John", "age": 30}';
console.log(isValidJSON(jsonString)); // true

const invalidJsonString = '{"name": "John", "age": 30'; // Missing closing brace
console.log(isValidJSON(invalidJsonString)); // false
// ```

// ### 2. Using a Regular Expression (Not Recommended)
// While you can use a regular expression to validate JSON strings, it's generally not recommended due to the complexity of the JSON format. JSON can include nested structures, arrays, and various data types, making regex validation error-prone and difficult to maintain.

// However, if you still want to use regex for simple validation, here’s an example:

// // ```javascript
// function isValidJSONString(jsonString) {
//     const jsonStringPattern = /^(?:(?:"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\')|(?:\d+|true|false|null|(?:\{(?:[^{}]*|(?R))*\}|(?:\[(?:[^\[\]]*|(?R))*\])))$/;
//     return jsonStringPattern.test(jsonString);
// }

// // Example usage
// console.log(isValidJSONString('{"name": "John", "age": 30}')); // true
// console.log(isValidJSONString('{"name": "John", "age": 30')); // false
// // ```

// ### 3. Using a JSON Schema Validator
// For more complex validation, you can use a JSON Schema validator. JSON Schema allows you to define the structure and constraints of your JSON data. Libraries like `ajv` or `joi` can be used for this purpose.

// Here’s a simple example using `ajv`:

// // ```javascript
// const Ajv = require('ajv');
// const ajv = new Ajv();

// const schema = {
//     type: "object",
//     properties: {
//         name: { type: "string" },
//         age: { type: "integer" },
//     },
//     required: ["name", "age"],
// };

// const validate = ajv.compile(schema);

// const data = { name: "John", age: 30 };
// const valid = validate(data);

// if (valid) {
//     console.log("Valid JSON data");
// } else {
//     console.log("Invalid JSON data", validate.errors);
// }
// // ```

// ### Summary
// - **Using `JSON.parse()`** is the most straightforward and effective way to validate a JSON string.
// - **Regular expressions** can be used for simple cases but are not recommended for comprehensive validation.
// - **JSON Schema validators** are useful for validating the structure and constraints of JSON data, especially for complex objects.

// Choose the method that best fits your needs based on the complexity of the JSON data you are working with.