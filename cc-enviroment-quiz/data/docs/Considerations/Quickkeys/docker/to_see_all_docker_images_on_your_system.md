To see all Docker images on your system, you can use the following command:
================
```bash
docker images
```
================
### Explanation of the Command:

- `docker images`: This command lists all the images that are currently stored on your local Docker host. It will display a table with the following columns:
  - **REPOSITORY**: The name of the image repository.
  - **TAG**: The tag associated with the image (often used to specify versions).
  - **IMAGE ID**: A unique identifier for the image.
  - **CREATED**: The date and time when the image was created.
  - **SIZE**: The size of the image.

### Additional Options

1. **List All Images (Including Intermediate Images)**:
   If you want to see all images, including intermediate images created during builds, you can use:
   ```bash
   docker images -a
   ```

2. **Filtering Images**:
   You can filter the images based on certain criteria. For example, to list images with a specific repository name:
   ```bash
   docker images <repository_name>
   ```

3. **Format Output**:
   You can format the output using the `--format` option. For example, to display only the image IDs:
   ```bash
   docker images --format "{{.ID}}"
   ```

These commands will help you manage and view the Docker images available on your system.