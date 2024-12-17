# interview-2

## Project Setup

### Prerequisites
- Node.js
- npm
- PostgreSQL

### Installation
1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd interview-2
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory of the project and add the following environment variables:
    ```sh
    DATABASE=interview-two
    DB_USERNAME=admin
    PASSWORD=password
    PG_PORT=5432
    HOST=localhost
    PORT=5550
    JWT_SECRET=secret@1234!!9992407
    PASSWORD_EMAIL=your_email_password
    EMAIL=your_email@example.com
    ```
    Replace `your_email_password` and `your_email@example.com` with your actual email credentials.

4. Build the project:
    ```sh
    npm run build
    ```

5. Running the project:
    ```sh
    npm run dev # for development
    npm run start # for production
    ```

6. Database setup:
    - Create a database named `interview-two` in PostgreSQL.
    - Run the following command to create the tables:
      ```sh
      npm run migration:run
      ```

7. Generating Migration:
    - Run the following command to generate a new migration:
      ```sh
      NAME=your_migration_name npm run migration:generate
      ```

8. Seeding the admin Database:
    - To seed the admin database, run the following command:
      ```sh
      npm run seed:admin
      ```

9. Documentation:
    - The API documentation can be found at `http://localhost:5550/api/docs/user` and `http://localhost:5550/api/docs/admin` after running the project.