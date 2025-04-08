# Subresource Integrity (SRI)

The process of checking the integrity of a file in an HTML `<script>` or `<link>` tag is typically done using the `integrity` attribute. This attribute is part of the Subresource Integrity (SRI) specification, which allows browsers to verify that files they fetch (like scripts or stylesheets) are delivered without unexpected manipulation.

### Checking for OpenSSL Installation

To check if OpenSSL is installed, run the following command:

```bash
openssl --version
```

If OpenSSL is installed, you can generate a SHA-384 hash for your file using:

```bash
openssl dgst -sha384 -binary "path/to/your/file" | openssl base64 -A
```

This command will output a base64 hash from the SHA-384 algorithm, which you can then attach to your `<link>` or `<script>` tag's `integrity` attribute.

### Example Usage

Below are examples of how to use the `integrity` attribute for various files:

#### Encapsulated Script

```html
<script defer src="<the-path-to-INCAP-file>"
    integrity="sha384-<base64-hashfile>"
    crossorigin="anonymous"></script>
```

If SHA-384 does not work, you can use SHA-256 instead.

#### Stylesheet with Integrity

```html
<link rel="stylesheet" href="style.css"
    integrity="sha384-OLBgp1GsljhM2TJ+sbHjaiH9txEUvgdDTAzHv2P24donTt6/529l+9Ua0vFImLlb"
    crossorigin="anonymous">
```

### Image with Integrity
```html
<img src="../../INCAP/assets/feather.png"
    integrity="sha256-TV/TmOnV6kDWn8Xwys1IXn8CUWopVuMK2Wh0AKEkByw="
    crossorigin="anonymous"
    alt="Feather" class="feather" id="feather">
```

#### Main Script with Integrity

```html
<script type="module" defer src="../../INCAP/js/main.js"
    integrity="sha384-tDs80SQi6UNBlNc5IApHAZgXeghOcWh7U16VftO9Z9TdtZZWaNy41dwj5nuy/C6B"
    crossorigin="anonymous"></script>
```

#### Additional Scripts with Integrity

```html
<script defer src="../../INCAP/js/pinfeather.js"
    integrity="sha384-MDEhNQBhgRal1rRKO0aVQdkT0Kx0MBMNIOZk9+y7vHp3i/4AjpjMfvCsI1cnSVF6"
    crossorigin="anonymous"></script>

<script defer src="../../INCAP/js/err2catch.js"
    integrity="sha256-tbz9+GoUH8J30KV8jdVmhVx78LTXbs5UbRqmqDycdrY="
    crossorigin="anonymous"></script>

<script defer src="../../INCAP/js/toggleContent.js"
    integrity="sha256-sx4mVjjTq3U0qFQoda7e5vLWaM4jV5Rsdvxl+UwTr68="
    crossorigin="anonymous"></script>
```

### Alternative Method for Generating SHA-384 Hash on Windows

You can create a base64 hash from a SHA-384 hash using the Windows command line:

```cmd
CertUtil -hashfile "your-file-here" SHA384
```

The output will be a long string of hexadecimal characters, such as:

```
a4dc0a52603dce0147b05e875036abd1eac66b2d017a3f5c5d8b91fa56c489e6dd5745ad63cee29433e78ff2f4945176
```

To convert this hash into base64 using Bash, you can use:

```bash
echo "your-sha384-here" | xxd -r -p | base64
```

Finally, prepend `sha384-` to your new base64 hash:

```
sha384-<the-base64-hashfile>
```

### Loading Raw Content from Websites or APIs

Here’s an example of how to load a script with integrity from a local server:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error Logger</title>
    <script src="http://127.0.0.1:3000/INCAP/js/err2catch.js" integrity="sha384-<YOUR_GENERATED_HASH>" crossorigin="anonymous"></script>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a sample page.</p>
</body>
Certainly! Here’s the continuation and conclusion of the document, maintaining the same formatting and clarity:

```html
</html>
```

### Summary

Using Subresource Integrity (SRI) is an effective way to enhance the security of your web applications by ensuring that the resources you load have not been tampered with. By following the steps outlined above, you can generate the necessary hashes and implement them in your HTML files.

### Key Points to Remember

- **Integrity Attribute**: Always include the `integrity` attribute in your `<script>` and `<link>` tags when using external resources.
- **Hash Generation**: Use tools like OpenSSL or Windows Command Line to generate the appropriate SHA-384 or SHA-256 hashes.
- **Testing**: If you encounter issues with loading scripts, consider temporarily removing the `integrity` attribute to troubleshoot.
- **Security Best Practices**: Always validate the integrity of your resources, especially in production environments, to protect against potential attacks.

By adhering to these practices, you can ensure that your web applications remain secure and function as intended.

---

Feel free to modify any sections or add additional information as needed! This structured format should help in understanding and implementing Subresource Integrity effectively.