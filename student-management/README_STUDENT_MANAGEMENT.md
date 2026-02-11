# Student Management System

A comprehensive Laravel-based student management system for managing students, courses, and enrollments.

## Features

- **Student Management**: Add, view, edit, and delete student records with detailed information including enrollment numbers, contact details, and personal information.
- **Course Management**: Manage courses with course codes, credits, and descriptions.
- **Enrollment Management**: Track student enrollments in courses with enrollment dates and grades.
- **Relationships**: View enrolled students for each course and enrolled courses for each student.
- **Clean UI**: Modern, responsive interface with easy navigation.

## Installation

1. Navigate to the student-management directory:
   ```bash
   cd student-management
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Set up environment file (already configured with SQLite):
   ```bash
   cp .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Run migrations:
   ```bash
   php artisan migrate
   ```

## Running the Application

Start the Laravel development server:
```bash
php artisan serve
```

The application will be available at `http://localhost:8000`

## Database Schema

### Students Table
- `id`: Primary key
- `name`: Student name
- `email`: Unique email address
- `phone`: Contact phone number
- `date_of_birth`: Date of birth
- `address`: Physical address
- `enrollment_number`: Unique enrollment number
- `timestamps`: Created and updated timestamps

### Courses Table
- `id`: Primary key
- `name`: Course name
- `code`: Unique course code
- `description`: Course description
- `credits`: Number of credits (1-6)
- `timestamps`: Created and updated timestamps

### Enrollments Table
- `id`: Primary key
- `student_id`: Foreign key to students
- `course_id`: Foreign key to courses
- `enrollment_date`: Date of enrollment
- `grade`: Course grade (optional)
- `timestamps`: Created and updated timestamps

## Usage

### Managing Students
- **List Students**: Navigate to the homepage or click "Students" in the navigation
- **Add Student**: Click "Add New Student" and fill in the form
- **View Student**: Click "View" to see student details and enrolled courses
- **Edit Student**: Click "Edit" to modify student information
- **Delete Student**: Click "Delete" to remove a student (with confirmation)

### Managing Courses
- **List Courses**: Click "Courses" in the navigation
- **Add Course**: Click "Add New Course" and fill in the form
- **View Course**: Click "View" to see course details and enrolled students
- **Edit Course**: Click "Edit" to modify course information
- **Delete Course**: Click "Delete" to remove a course (with confirmation)

### Managing Enrollments
- **List Enrollments**: Click "Enrollments" in the navigation
- **Create Enrollment**: Click "Create New Enrollment" and select a student and course
- **View Enrollment**: Click "View" to see enrollment details
- **Edit Enrollment**: Click "Edit" to modify enrollment information (including grades)
- **Delete Enrollment**: Click "Delete" to remove an enrollment (with confirmation)

## Technology Stack

- **Framework**: Laravel 11
- **Database**: SQLite (for easy setup and portability)
- **Frontend**: Blade templates with custom CSS
- **PHP Version**: 8.3+

## Models and Relationships

- **Student Model**: Has many enrollments, belongs to many courses through enrollments
- **Course Model**: Has many enrollments, belongs to many students through enrollments
- **Enrollment Model**: Belongs to student, belongs to course

## API Routes

All routes follow RESTful conventions:
- `GET /students` - List all students
- `GET /students/create` - Show create student form
- `POST /students` - Store new student
- `GET /students/{id}` - Show student details
- `GET /students/{id}/edit` - Show edit student form
- `PUT /students/{id}` - Update student
- `DELETE /students/{id}` - Delete student

Similar routes exist for `/courses` and `/enrollments`.

## Screenshots

### Students List
![Students List](https://github.com/user-attachments/assets/cfa0c65a-8048-4fe9-a1f9-6c5b60a55730)

### Courses List
![Courses List](https://github.com/user-attachments/assets/728b7a8c-ee30-4f68-8b5b-8c0cd9955126)

### Enrollments List
![Enrollments List](https://github.com/user-attachments/assets/c3e8cf9f-4689-4930-85bc-202dd40d3925)

### Enrollment Details
![Enrollment Details](https://github.com/user-attachments/assets/387d3c56-d33c-4fcd-a466-36ab0c33a5f0)

### Create Student Form
![Create Student Form](https://github.com/user-attachments/assets/c9682491-96dd-49ff-89d8-d5d0a55cade9)

## License

This project is open-source software.
