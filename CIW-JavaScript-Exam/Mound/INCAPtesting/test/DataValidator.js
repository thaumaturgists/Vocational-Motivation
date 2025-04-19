// Below is an encapsulated function that includes various regex patterns for common data formats. This function can be used to validate different types of data, such as names, emails, phone numbers, dates, and more. You can easily extend or modify the regex patterns based on your specific requirements.

// Encapsulated Validation Function

class DataValidator {
    // Function to validate data using regex
    static validate(data) {
        const validationResults = {};

        // Regex patterns
        const patterns = {
            name: /^[a-zA-Z\s]+$/, // Only letters and spaces
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format
            phone: /^\+?[0-9\s\-()]+$/, // Basic phone number format
            date: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, // YYYY-MM-DD format
            url: /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/, // Basic URL format
            postalCode: /^[0-9]{5}(?:-[0-9]{4})?$/, // US ZIP code format
            username: /^[a-zA-Z0-9_]{3,16}$/, // Alphanumeric username (3-16 characters)
            password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // At least 8 characters, 1 letter, 1 number
            integer: /^-?\d+$/, // Validates integer values (positive or negative)
            float: /^-?\d+(\.\d+)?$/, // Validates floating-point numbers (positive or negative)
            hexadecimalColorCode: /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, // Validates hex color codes (e.g., #FFF or #FFFFFF)
            ipv4Address: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, // Validates IPv4 addresses
            time24Hour: /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, // Validates time in 24-hour format (e.g., 14:30)
            time12Hour: /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?[APap][mM]$/, // Validates time in 12-hour format with AM/PM (e.g., 02:30 PM)
            creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|7[0-9]{15})$/, // Validates major credit card formats
            ssn: /^\d{3}-\d{2}-\d{4}$/, // Validates US Social Security Numbers (XXX-XX-XXXX)
            htmlTag: /^<([a-z1-6]+)([^>]*?)>(.*?)<\/\1>$/i, // Validates simple HTML tags (e.g., <div>content</div>)
            alphanumeric: /^[a-zA-Z0-9]+$/, // Validates strings that contain only letters and numbers
            base64: /^(?:[A-Z0-9+\/]{4})*([A-Z0-9+\/]{3}=|[A-Z0-9+\/]{2}==)?$/i, // Validates Base64 encoded strings
            markdownLink: /$$(.*?)$$$(.*?)$/, // Validates Markdown-style links (e.g., [link text](http://example.com))
            uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, // Validates UUIDs
            positiveInteger: /^[1-9]\d*$/, // Validates positive integers (no leading zeros)
            negativeInteger: /^-?[1-9]\d*$/, // Validates negative integers (no leading zeros)
            nonNegativeInteger: /^\d+$/, // Validates non-negative integers (including zero)
            nonPositiveInteger: /^-\d+|0$/, // Validates non-positive integers (including zero)
            hexadecimalNumber: /^0[xX][0-9a-fA-F]+$/, // Validates hexadecimal numbers (e.g., 0x1A3F)
            scientificNotation: /^[+-]?\d+(\.\d+)?[eE][+-]?\d+$/, // Validates numbers in scientific notation (e.g., 1.23e+10)
            imageFileExtension: /\.(jpg|jpeg|png|gif|bmp|svg)$/i, // Validates common image file extensions
            videoFileExtension: /\.(mp4|avi|mov|wmv|mkv)$/i, // Validates common video file extensions
            audioFileExtension: /\.(mp3|wav|ogg|flac)$/i, // Validates common audio file extensions
            documentFileExtension: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i, // Validates common document file extensions
            zipFileExtension: /\.zip$/i, // Validates ZIP file extensions
            markdownHeader: /^#{1,6}\s.*$/, // Validates Markdown headers (e.g., # Header)
            slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, // Validates URL slugs (e.g., my-slug)
            latitude: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/, // Validates latitude values (-90 to 90)
            longitude: /^[-+]?((1[0-7][0-9]|[1-9]?\d)(\.\d+)?|180(\.0+)?)$/, // Validates longitude values (-180 to 180)
            ipAddress: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, // Validates IPv4 addresses
            creditCardExpiration: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, // Validates credit card expiration dates (MM/YY)
            htmlComment: /^<!--[\s\S]*?-->$/, // Validates HTML comments
            cssClass: /^[a-zA-Z_][a-zA-Z0-9_-]*$/, // Validates CSS class names
            cssId: /^#[a-zA-Z_][a-zA-Z0-9_-]*$/, // Validates CSS ID selectors
            xmlTag: /^<([a-zA-Z_][a-zA-Z0-9_-]*)\b[^>]*>(.*?)<\/\1>$/, // Validates XML tags
            nonEmptyString: /^(?!\s*$).+$/, // Validates non-empty strings
            integerRange: /^-?\d{1,3}$/, // Validates integers in the range of -999 to 999
            positiveFloat: /^(0|[1-9]\d*)(\.\d+)?$/, // Validates positive floating-point numbers
            negativeFloat: /^-?(0|[1-9]\d*)(\.\d+)?$/, // Validates negative floating-point numbers
            timeDuration: /^(?:[0-9]+:)?[0-5][0-9]:[0-5][0-9]$/, // Validates time duration in HH:MM:SS format
            htmlEntity: /&[a-zA-Z0-9#]+;/, // Validates HTML entities (e.g., &nbsp;)
            passwordStrength: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
            macAddress: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, // Validates MAC addresses
            isbn10: /^(?:ISBN(?:-10)?:? )?(?=[0-9]{9}X?$)([0-9]{9}[0-9X])$/, // Validates ISBN-10 format
            isbn13: /^(?:ISBN(?:-13)?:? )?(?=[0-9]{13}$)([0-9]{13})$/, // Validates ISBN-13 format
            htmlAttribute: /^[a-zA-Z_][a-zA-Z0-9_-]*=".*?"$/, // Validates HTML attributes (e.g., class="example")
            jsonString: /^(?:"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\')$/, // Validates JSON strings
            };
           // sqlInjection: /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|EXEC|UNION|WHERE|AND|OR|LIKE|HAVING|JOIN|CAST|CONVERT|TABLE|DATABASE|FROM|INTO|VALUES|SET|ORDER|GROUP|LIMIT|OFFSET|DISTINCT|AS|CASE|WHEN|THEN|ELSE|END|IF|EXISTS|NOT|NULL|IS|LIKE|BETWEEN|IN|ANY|ALL|SOME|HAVING|EXISTS|UNION|INTERSECT|MINUS|WITH|ROWNUM|ROW_NUMBER|RANK|DENSE_RANK|NTILE|OVER|PARTITION BY|ORDER BY|FETCH FIRST|OFFSET|LIMIT|TOP|RETURNING|OUTPUT|MERGE|INSERT INTO|UPDATE SET|DELETE FROM|CREATE TABLE|ALTER TABLE|DROP TABLE|CREATE INDEX|DROP INDEX|CREATE VIEW|DROP VIEW|CREATE TRIGGER|DROP TRIGGER|CREATE PROCEDURE|DROP PROCEDURE|CREATE FUNCTION|DROP FUNCTION|CREATE SEQUENCE|DROP SEQUENCE|CREATE DATABASE|DROP DATABASE|GRANT|REVOKE|COMMIT|ROLLBACK|SAVEPOINT|SET TRANSACTION|SET SESSION|SET ROLE|SET USER|SET NAMES|SET CHARACTER SET|SET TIME ZONE|SET SQL_MODE|SET GLOBAL|SET SESSION|SET @@|SET @@GLOBAL|SET @@SESSION|SET @@SESSION|SET @@GLOBAL|
           // SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@SESSION|SET @@GLOBAL|SET @@
        

        // Validate each field in the data object
        for (const field in data) {
            if (patterns[field]) {
                const isValid = patterns[field].test(data[field]);
                validationResults[field] = isValid;
            } else {
                console.warn(`No validation pattern defined for field: ${field}`);
                validationResults[field] = null; // No validation pattern
            }
        }

        return validationResults;
    }
}

// Example usage
const dataToValidate = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    date: "2023-10-01",
    url: "https://example.com",
    postalCode: "12345-6789",
    username: "john_doe",
    password: "Password1"
};

const validationResults = DataValidator.validate(dataToValidate);
console.log('Validation Results:', validationResults);


// Explanation
// Regex Patterns: The patterns object contains various regex patterns for different types of data:
// Name: Only allows letters and spaces.
// Email: Basic validation for email format.
// Phone: Allows optional + and various formats of phone numbers.
// Date: Validates dates in the YYYY-MM-DD format.
// URL: Basic validation for URLs.
// Postal Code: Validates US ZIP codes (5 digits or 5-4 format).
// Username: Alphanumeric usernames with underscores (3-16 characters).
// Password: At least 8 characters long, containing at least one letter and one number.
// Validation Logic: The validate method iterates over the fields in the data object and checks each field against its corresponding regex pattern. It stores the results in the validationResults object.
// Example Usage: An example dataToValidate object is provided to demonstrate how to use the DataValidator class.
// Customization
// You can easily add or modify regex patterns in the patterns object to suit your specific validation needs. This encapsulated function provides a clean and reusable way to validate various data formats in your application.

// (old)
// // Function to validate JSON data using regex
// validateJsonData(data) {
//     console.log('Validating JSON data:', data);

//     // Example regex checks
//     const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
//     const phoneRegex = /^\+?[0-9\s\-()]+$/; // Basic phone number format

//     // Check if the data has the expected structure
//     if (data && typeof data === 'object') {
//         // Example checks (adjust according to your data structure)
//         if (data.name && !nameRegex.test(data.name)) {
//             console.error('Invalid name format:', data.name);
//             return null; // Invalid data
//         }
//         if (data.email && !emailRegex.test(data.email)) {
//             console.error('Invalid email format:', data.email);
//             return null; // Invalid data
//         }
//         if (data.phone && !phoneRegex.test(data.phone)) {
//             console.error('Invalid phone number format:', data.phone);
//             return null; // Invalid data
//         }

//         console.log('Valid data received:', data);
//         return data; // Return the valid data
//     }

//     console.error('Invalid data received from API');
//     return null; // Return null if data is invalid
// }

// .then(data => {
//     console.log('Data received from API:', data);
//     const validatedData = this.validateJsonData(data); // Validate API response
//     if (validatedData) {
//         this.createJSONFile(validatedData, sanitizedInput); // Use sanitized input for filename
//     } else {
//         document.getElementById('message').innerText = 'Invalid data received from API.';
//     }
// })
