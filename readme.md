# fav_book Records API

This is an express API which provides endpoints to manage book records. It allows users to perform CRUD (Create, Read, Update, Delete) operations on book records stored in a database.

## Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager) installed
- MongoDB installed and running locally or a connection to a MongoDB instance

## Getting Started

1. Clone this repository to your local machine:

> ```npm clone https://github.com/Aamin887/fav_book.git```

2. Navigate to the project directory:

> `cd fav_book`

3. Install dependencies:

> `npm install`

4. Set up your environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables and adjust their values according to your setup:`PORT`, `MONGO_URI`, `NODE_ENV`
     > PORT: the port on which the port is to run

> MONGO_URI: should be the connection link for mongodb

> NODE_ENV: should have a value of either: development or production. This tells the app the environment its running on; if development then the error handler middleware will return the whole error stack for proper debugging, otherwise you just see a null.

5. Start the server:

The server should now be running on `http://localhost:3501` or the PORT declared in the .env file.

## Endpoints

### 1. GET /books

- Description: Retrieve all book records.
- Response: A JSON array containing all book records.

```json
{
  "status": "OK",
  "books": [
    {
      "_id": "661663bbf34650b1ebed0c5c",
      "title": "The mantle of the Man",
      "author": "Amin",
      "dateOfPublication": "2020-01-01T00:00:00.000Z",
      "genre": "fiction",
      "__v": 0,
      "description": "The best book in fiction genre. 👍 "
    },
    {
      "_id": "661663bbf34650b1ebed0c5c",
      "title": "The mantle ",
      "author": "Me",
      "dateOfPublication": "2020-01-01T00:00:00.000Z",
      "genre": "non-fiction",
      "__v": 0,
      "description": "Will change your life😊  "
    }
  ]
}
```

### 2. GET /books/:id

- Description: Retrieve a specific book record by its ID.
- Parameters:
  - `id`: The ID of the book record to retrieve.
- Response: A JSON object representing the book record.

```json
{
  "status": "ok",
  "book": {
    "_id": "661663bbf34650b1ebed0c5c",
    "title": "The mantle of the Man",
    "author": "Henry ",
    "dateOfPublication": "2020-01-01T00:00:00.000Z",
    "genre": "fiction >>>",
    "__v": 0,
    "description": "Cool book"
  }
}
```

### 3. POST /books

- Description: Create a new book record.
- Body: A JSON object containing the book details ( title, author, dateOfPublication, genre, description).

```json
{
  "title": "The mantle of the Man",
  "author": "Henry ",
  "dateOfPublication": "2020-01-01T00:00:00.000Z",
  "genre": "fiction",
  "description": "Cool book"
}
```

- Response: A JSON object representing the newly created book record.

```json
{
  "_id": "661663bbf34650b1ebed0c5c",
  "title": "The mantle of the Man",
  "author": "Henry ",
  "dateOfPublication": "2020-01-01T00:00:00.000Z",
  "genre": "fiction",
  "__v": 0,
  "description": "Cool book"
}
```

### 4. PUT /books/:id

- Description:
  - Update an existing book record.
  - > `DELETE http://localhost:3501/${id}`
- Parameters:
  - `id`: The ID of the book record to update `661663bbf34650b1ebed0c5c`.
- Body:

  - A JSON object containing the updated book details. Could just include only fields to be updated. Value are optional:

  ```json
  {
    "title": "The mantle of the Man",
    "author": "Henry ",
    "dateOfPublication": "2020-01-01T00:00:00.000Z",
    "genre": "fiction",
    "description": "Cool book"
  }
  ```

- Response: A JSON object representing the updated book record.

```json
{
  "status": "ok",
  "book": {
    "_id": "661663bbf34650b1ebed0c5c",
    "title": "The mantle of the Man",
    "author": "Henry ",
    "dateOfPublication": "2020-01-01T00:00:00.000Z",
    "genre": "fiction",
    "__v": 0,
    "description": "Cool book"
  }
}
```

### 5. DELETE /books/:id

- Description:
  - Delete a book record.
  - > `DELETE http://localhost:3501/${id}`
- Parameters:
  - `id`: The ID of the book record to delete `661663bbf34650b1ebed0c5c`.
- Response:
  - return a status code of `204` indicating record was successfully removed.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues if you encounter any problems or have suggestions for improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
