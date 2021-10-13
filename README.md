## Using the REST API

You can access the REST API of the server using the following endpoints:

### `GET`

-   `/post/:id`: Fetch a single post by its `id`
-   `/user/:id/drafts`: Fetch user's drafts by their `id`
-   `/users`: Fetch all users

### `POST`

-   `/post`: Create a new post
    -   Body:
        -   `title: String` (required): The title of the post
        -   `content: String` (optional): The content of the post
        -   `authorEmail: String` (required): The email of the user that creates the post
-   `/signup`: Create a new user
    -   Body:
        -   `email: String` (required): The email address of the user
        -   `name: String` (optional): The name of the user

### `PUT`

-   `/publish/:id`: Toggle the publish value of a post by its `id`
-   `/post/:id/views`: Increases the `viewCount` of a `Post` by one `id`

### `DELETE`

-   `/post/:id`: Delete a post by its `id`

<pre>
.
├── <img src="./assets/icons/folder-resource.svg" style="display: inline-block; margin: 0; padding:0"  height="12"/> assets
│   └── /images
│   └── /images
├── /docs
│   └── /contributing
│       └── types-of-contributions.md
├── /scripts
│   └── copy-files.script.ts
├── /src
│   ├── /api
│   │   ├── /controllers
│   │   │   ├── post.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── /errors
│   │   │   ├── database.exception.ts
│   │   │   ├── http.exception.ts
│   │   │   └── validation.exception.ts
│   │   ├── /helpers
│   │   │   └── example.helper.ts
│   │   ├── /interfaces
│   │   │   ├── postData.interface.ts
│   │   │   └── route.interface.ts
│   │   ├── /middleware
│   │   │   ├── error.middleware.ts
│   │   │   └── express.middleware.ts
│   │   ├── /models
│   │   │   └── example.model.ts
│   │   ├── /routes
│   │   │   ├── api.route.ts
│   │   │   └── home.route.ts
│   │   ├── /services
│   │   │   ├── post.service.ts
│   │   │   └── user.service.ts
│   │   ├── /utils
│   │   │   ├── iohandler.util.ts
│   │   │   ├── logger.util.ts
│   │   │   └── secrets.util.ts
│   │   └── /validators
│   │       ├── post.validator.ts
│   │       └── user.validator.ts
│   ├── /app
│   │   └── index.ts
│   ├── /config
│   │   ├── helmet.config.ts
│   │   └── logger.config.ts
│   ├── /prisma
│   │   ├── /db
│   │   ├── db.seed.ts
│   │   └── schema.prisma
│   ├── /public
│   │   ├── /css
│   │   ├── /favicon.ico
│   │   ├── /fonts
│   │   ├── /img
│   │   └── /js
│   └── server.ts
├── /tests
│   ├── /e2e
│   ├── /fixtures
│   ├── /integration
│   └── /unit
│       └── api.test.ts
├── .env
├── .eslintignore
├── .eslintrc.js
├── .gitattributes
├── .gitignore
├── .prettierrc.js
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── jest.config.js
├── package-lock.json
├── package.json
├── README.md
├── SECURITY.md
└── tsconfig.json

</pre>

## License

[MIT](LICENSE)
