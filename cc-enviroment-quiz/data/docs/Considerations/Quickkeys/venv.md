To start env:
```bash
source venv/Scripts/activate
```

To install packages:
```bash
pip install package_name
```

To stop env:
```bash
deactivate
```

Add a `.gitignore` File
To avoid committing the virtual environment to your Git repository, 
create a `.gitignore` file in your project directory and add the following line:
```plaintext
venv/
```


To uninstall a Python virtual environment (venv), you don't actually "uninstall" it in the traditional sense. Instead, you simply delete the directory that contains the virtual environment. Here’s how you can do it:

1. **Locate the virtual environment directory**: This is the folder where you created the virtual environment. It typically contains a `bin` (or `Scripts` on Windows) directory, along with other files.

2. **Delete the virtual environment directory**:
   - **On Windows**:
     - Open Command Prompt or PowerShell.
     - Navigate to the directory containing your virtual environment using the `cd` command.
     - Use the following command to delete the virtual environment folder (replace `venv` with the name of your virtual environment):
       ```bash
       rmdir /s /q venv
       ```
   - **On macOS/Linux**:
     - Open a terminal.
     - Navigate to the directory containing your virtual environment using the `cd` command.
     - Use the following command to delete the virtual environment folder (replace `venv` with the name of your virtual environment):
       ```bash
       rm -rf venv
       ```

After executing these commands, the virtual environment will be removed from your system. If you need to create a new virtual environment later, you can do so using the `python -m venv venv` command (or similar, depending on your setup).


To uninstall a package using `pip`, you can use the following command in your terminal or command prompt:

```bash
pip uninstall package_name
```

Replace `package_name` with the name of the package you want to uninstall. For example, if you want to uninstall a package called `requests`, you would run:

```bash
pip uninstall requests
```

### Steps to Uninstall a Package:

1. **Activate your virtual environment** (if you're using one):
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

2. **Run the uninstall command**:
   ```bash
   pip uninstall package_name
   ```

3. **Confirm the uninstallation**: After running the command, `pip` will ask for confirmation. Type `y` (yes) to proceed with the uninstallation.

### Uninstalling Multiple Packages

If you want to uninstall multiple packages at once, you can list them all in the command:

```bash
pip uninstall package_name1 package_name2 package_name3
```

### Additional Options

- To uninstall a package without confirmation prompts, you can use the `-y` flag:
  ```bash
  pip uninstall -y package_name
  ```

- To see a list of all installed packages, you can run:
  ```bash
  pip list
  ```

This will help you identify the exact names of the packages you want to uninstall.