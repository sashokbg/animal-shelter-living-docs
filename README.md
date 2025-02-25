# Animal Shelter Living Docs

A project that highlights the usage of Gherkin Markdown + Mkdocs + Cucumber JS using a custom plugin I wrote: https://github.com/sashokbg/mkdocs-gherkin-plugin

Most of the code was written with Cursor to try out some AI features.

## Running the Project

- Start the docker compose with ```docker compose up```

- Execute the tests
    ```shell
    animal-shelter-living-docs/tests_e2e
    npm run tests:docker
    ```

- Create and activate your conda environment for the Mkdocs

- Install dependencies and run docs
    ```shell
    cd animal-shelter-living-docs
    pip install -r requirements.txt

    make dev
    ```
- Check your doc at http://localhost:8000/features/add_animal/

