# Jupyterlab SQL Extension


An updated version of the [jupyterlab-sql](https://github.com/pbugnion/jupyterlab-sql) plugin, that works with the latest version of JupyterLab 3.x.


## Requirements

- JupyterLab >= 3.0


## Local Setup

1. ### Install conda using miniconda
   Start by installing miniconda, following [Conda’s installation documentation](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html).

2. ### Install NodeJS, JupyterLab, etc. in a conda environment**

    Next create a conda environment that includes:
    - the latest release of JupyterLab
    - cookiecutter, the tool you’ll use to bootstrap your extension project structure (this is a Python tool which we’ll install using conda below).
    - NodeJS, the JavaScript runtime you’ll use to compile the web assets (e.g., TypeScript, CSS) for your extension
    - git, a version control system you’ll use to take snapshots of your work as you progress through this tutorial


    ```bash
    conda create -n ENV_NAME --override-channels --strict-channel-priority -c conda-forge -c nodefaults jupyterlab=3 cookiecutter nodejs jupyter-packaging git
    ```

    Now activate the new environment so that all further commands you run work out of that environment.

    ```bash
    conda activate ENV_NAME
    ```

## Development Installation

1. ### Download
    Clone this repository into local system and change the directory.

    ```bash
    git clone https://github.com/yogeshiitm/jupyterlab-sql-extension.git
    cd jupyterlab-sql-extension/
    ```

2. ### Install

    Note: You will need NodeJS to build the extension package.

    The `jlpm` command is JupyterLab's pinned version of
    [yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
    `yarn` or `npm` in lieu of `jlpm` below.

    ```bash
    # Clone the repo to your local environment
    # Change directory to the jupyterlab_sql_extension directory
    # Install package in development mode
    pip install -e .
    # Link your development version of the extension with JupyterLab
    jupyter labextension develop . --overwrite
    # Server extension must be manually installed in develop mode
    jupyter server extension enable jupyterlab_sql_extension
    # Rebuild extension Typescript source after making changes
    jlpm build
    ```

    You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

    ```bash
    # Watch the source directory in one terminal, automatically rebuilding when needed
    jlpm watch
    # Run JupyterLab in another terminal
    jupyter lab
    ```

    With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser.


3. ### Uninstall

    ```bash
    # Server extension must be manually disabled in develop mode
    jupyter server extension disable jupyterlab_sql_extension
    pip uninstall jupyterlab_sql_extension
    ```

    In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
    command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
    folder is located. Then you can remove the symlink named `jupyterlab-sql-extension` within that folder.