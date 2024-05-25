# To-Do Application API

This is a RESTful API for a To-Do application that supports user authentication, CRUD operations on to-do items, and search functionality. The API uses JWT for authentication and stores data in MongoDB.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Generate RSA key pair for JWT authentication:

   ```bash
   openssl genpkey -algorithm RSA -out keys/private.key -aes256
   openssl rsa -pubout -in keys/private.key -out keys/public.key
   ```

4. Create a `.env` file and add your MongoDB URI:

   ```
   MONGO_URI=your_mongo_uri
   ```

5. Start the server:
   ```bash
   npm start
   ```

## POSTMAN COLLECTION

```
https://www.postman.com/payload-participant-73085538/workspace/my-workspace/overview

```
