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
```<img width="809" height="695" alt="visa" src="https://github.com/user-attachments/assets/03d8db62-43e0-4371-892b-e7e39efa7cd3" />
<img width="814" height="737" alt="visa2" src="https://github.com/user-attachments/assets/f7af4954-ee0b-4e4f-b7c6-8fcd963589bb" />
<img width="831" height="839" alt="visa3" src="https://github.com/user-attachments/assets/482c91ba-098c-4516-bdd7-45d91c10bd27" />
<img width="802" height="747" alt="visa4" src="https://github.com/user-attachments/assets/be044133-d3ff-44c8-a7ee-7202a251c65e" />
<img width="377" height="123" alt="visa5" src="https://github.com/user-attachments/assets/c490acfe-795f-4f08-b8ec-1a79495d6c7a" />



