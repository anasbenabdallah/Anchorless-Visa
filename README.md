## Structure de projet

/visa-project
├── /visa-api(Laravel)
├── /frontend (Remix)
└── README.md

## Setup Backend

- cd visa-api
- composer install
- php artisan migrate
- php artisan serve
  > > The API will be available at http://127.0.0.1:8000.

## Setup Frontend

- cd frontend
- npm install
- npm run dev
  > > The UI will be available at http://localhost:5173

## Features

- Upload file
- List grouped files
- Delete file

> > > > Test File Upload
> > > > Open the frontend in your browser
> > > > Select a file (PDF, PNG, or JPG, max 4MB)
> > > > Choose a category (e.g., passport, photo, other)
> > > > Click Upload
> > > > You should see a success message and the file appear in the list
> > > >
> > > > > Test File Listing
> > > > > Uploaded files are displayed on the page
> > > > > Files are grouped by category
> > > > > Test File Deletion
> > > > > Click the Delete button next to a file
> > > > > The file should be removed from:
> > > > > the UI
> > > > > the database
> > > > > the storage folder
> > > > > Validation Checks

Try uploading:

Unsupported file (e.g., .txt)
File larger than 4MB

> > > You should see an error message

## 🚀 Backend Setup (Laravel)

This project uses **SQLite** for data persistence to simplify installation and configuration.

### 🔧 Environment Configuration

Make sure your `.env` file contains the following lines:

```env
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
FILESYSTEM_DISK=public
```

---

### 🗄️ Database Setup

Create an empty SQLite database file inside the backend project:

- **Windows:**

```bash
New-Item database/database.sqlite
```

- **Mac/Linux:**

```bash
touch database/database.sqlite
```

---

### 📦 Run Migrations

Execute the following command to create the necessary database tables:

```bash
php artisan migrate
```

---

### 🔗 Storage Link

This step is required to make uploaded files accessible from the frontend:

```bash
php artisan storage:link
```

---

### ▶️ Start the Server

Run the Laravel development server:

```bash
php artisan serve
```
