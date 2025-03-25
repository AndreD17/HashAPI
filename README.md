# Hashtable API

## Overview
This is a simple **Hashtable API** built using **Node.js and Express.js**. It allows users to register usernames, check if a username exists, remove usernames, and retrieve all registered usernames using a custom **SimpleHashSet** class.

## Features
- Registers a new username
- Check if a username exists
- Remove a username
- Retrieve all usernames

## Technologies Used
- **Node.js**
- **Express.js**
- **CORS**
- **Mocha & Chai (for testing)**
- **ES Modules (ECMAScript)**

---

## Installation

### Prerequisites
Make sure you have **Node.js** installed. You can download it from [Node.js Official Website](https://nodejs.org/).

### Steps to Run Locally
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/Andred17/hashapi.git
   cd hashapi
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
3. **Start the Server:**
   ```sh
   npm start
   ```
4. **API is now running on:** `http://localhost:3000`

---

## API Endpoints

### 1. Register a Username
**Endpoint:** `POST /api/register`

#### **Request Body:**
```json
{
  "username": "john_doe"
}
```
#### **Response:**
```json
{
  "message": "Username registered successfully"
}
```

---

### 2. Check if a Username Exists
**Endpoint:** `GET /api/exists/:username`

#### **Example Request:**
```
GET /api/exists/john_doe
```
#### **Response:**
```json
{
  "exists": true
}
```

---

### 3. Remove a Username
**Endpoint:** `DELETE /api/remove/:username`

#### **Example Request:**
```
DELETE /api/remove/john_doe
```
#### **Response:**
```json
{
  "message": "Username removed successfully"
}
```

---

### 4. Get All Usernames
**Endpoint:** `GET /api/usernames`

#### **Response:**
```json
{
  "usernames": ["alice", "bob", "charlie"]
}
```

---

## Running Tests with Mocha & Chai
This project includes **Mocha & Chai** for unit testing.

### Install Mocha & Chai:
```sh
npm install --save-dev mocha chai supertest
```

### Run Tests:
```sh
npm test
```

### Example Test (Located in `/test/hashapi.test.js`):
```js
import request from "supertest";
import app from "../server.js";
import { expect } from "chai";

describe("Usernames API", function () {
    it("should register a new username", function (done) {
        request(app)
            .post("/api/register")
            .send({ username: "testuser" })
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property("message", "Username registered successfully");
                done();
            });
    });
});
```

---

## Folder Structure
```
/hashapi
│── src
│   ├── routes.js  # API routes
│   ├── hashset.js # SimpleHashSet class implementation
│── server.js      # Express server setup
│── test
│   ├── hashapi.test.js # Mocha & Chai test cases
│── package.json   # Project metadata and dependencies
│── README.md      # Documentation
```

---

## License
This project is **MIT Licensed**.

---

## Author
[Damilare](https://github.com/ANDRED17)

