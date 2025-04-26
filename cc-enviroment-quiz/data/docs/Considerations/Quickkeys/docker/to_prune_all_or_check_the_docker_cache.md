================
```bash
docker system prune
docker system prune -a
docker container prune
docker volume prune
```

```bash
docker buildx du
```

================



To check the Docker cache, you typically want to look at the layers that Docker uses to build images. Docker uses a caching mechanism to speed up the build process by reusing layers that haven't changed. Here are a few commands and methods to check the cache:

1. **Check Build Cache**:
   You can use the `docker build` command with the `--no-cache` option to see if the cache is being used. If you run a build without the cache, it will rebuild all layers:

   ```bash
   docker build --no-cache -t your-image-name .
   ```

2. **Inspecting Image Layers**:
   You can inspect a specific image to see its layers and understand how caching is applied:

   ```bash
   docker history your-image-name
   ```

   This command will show you the layers of the specified image, including the commands that created each layer.

3. **Prune Unused Cache**:
   If you want to clean up unused cache and layers, you can use the following command:

   ```bash
   docker builder prune
   ```

   This will remove all unused build cache. You can also add the `-a` flag to remove all cache, not just the unused ones.

4. **View Build Cache**:
   If you want to see the build cache specifically, you can use:

   ```bash
   docker buildx du
   ```

   This command will show you the disk usage of the build cache.

If you have a specific aspect of the Docker cache you want to check or manage, please let me know!

To clear the Docker cache, you can use several commands depending on what you want to remove. Here are the most common methods:

1. **Remove Unused Images, Containers, and Networks**:
   You can use the `docker system prune` command to remove all stopped containers, unused networks, and dangling images (images that are not tagged and not referenced by any container):

   ```bash
   docker system prune
   ```

   If you want to remove all unused images (not just dangling ones), you can add the `-a` flag:

   ```bash
   docker system prune -a
   ```

   This command will prompt you for confirmation before proceeding.

2. **Remove Build Cache**:
   If you specifically want to clear the build cache, you can use the following command:

   ```bash
   docker builder prune
   ```

   This will remove all unused build cache. If you want to remove all build cache, including the ones that are still in use, you can use:

   ```bash
   docker builder prune -a
   ```

3. **Remove Specific Images**:
   If you want to remove specific images, you can use the `docker rmi` command followed by the image ID or name:

   ```bash
   docker rmi image_name_or_id
   ```

4. **Remove Stopped Containers**:
   To remove all stopped containers, you can use:

   ```bash
   docker container prune
   ```

5. **Remove Unused Volumes**:
   If you want to clear unused volumes, you can use:

   ```bash
   docker volume prune
   ```

### Important Note:
Be cautious when using these commands, especially with the `-a` flag, as they will permanently delete images, containers, and cache that are not currently in use. Always ensure that you do not need the data before clearing it.

If you have any specific requirements or need further assistance, feel free to ask!


