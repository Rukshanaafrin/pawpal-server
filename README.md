# PawPal Server

Backend API for the PawPal Pet Adoption Platform.

## Features

- Add new pets
- Get all pets
- Get single pet details
- Update pet information
- Delete pets
- Create adoption requests
- View adoption requests
- Cancel adoption requests
- JWT Authentication
- MongoDB Database

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT
- Cookie Parser
- CORS
- Dotenv

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/pawpal-server.git
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DB_USER=your_db_user
DB_PASS=your_db_password
JWT_SECRET=your_secret_key
```

Run the server:

```bash
node index.js
```

Server will run on:

```bash
http://localhost:5000
```

## API Endpoints

### Pets

- GET `/pets`
- GET `/pets/:id`
- POST `/pets`
- PUT `/pets/:id`
- DELETE `/pets/:id`

### Requests

- GET `/requests`
- POST `/requests`
- DELETE `/requests/:id`

### Authentication

- POST `/jwt`
- POST `/logout`

## Environment Variables

```env
DB_USER=
DB_PASS=
JWT_SECRET=
```

## Live Server


## Author

Mst. Rukshana Afrin