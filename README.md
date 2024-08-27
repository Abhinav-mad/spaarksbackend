Restaurant API
This is a RESTful API for managing restaurants, allowing users to perform CRUD operations and geospatial queries. The API is built using Node.js, Express, and MongoDB.


Clone the repository:

bash
Copy code
git clone https://github.com/Abhinav-mad/spaarksbackend.git
cd spaarksbackend
Install dependencies:

Using npm:

bash
Copy code
npm install
Or using yarn:

bash
Copy code
yarn install
Running the Application Locally
Set up MongoDB:

If you're using a local MongoDB installation, ensure that MongoDB is running on your machine.
If you're using MongoDB Atlas, ensure you have the connection URI.
Set up Environment Variables:

Create a .env file in the root directory of the project and add the following environment variables:

plaintext
Copy code
PORT=5000
mongodb :provided in the repository
Run the Application:

Using npm:

bash
Copy code
npm start
Or using yarn:

bash
Copy code
yarn start


Environment Variables
The following environment variables are required to run the application:

PORT: The port number on which the server will run (default is 3000).
MONGODB_URI: The MongoDB connection string.
API Endpoints
Here's a list of the main API endpoints available in the application:

User Authentication:

POST /api/auth/register: Register a new user.
POST /api/auth/login: Log in an existing user.
Restaurant Operations:

POST /api/restaurent/create: Create a new restaurant.
PUT /api/restaurent/:id: Update an existing restaurant.
GET /api/restaurent/radius: Get restaurants by radius.
GET /api/restaurent/range: Get restaurants by rang
