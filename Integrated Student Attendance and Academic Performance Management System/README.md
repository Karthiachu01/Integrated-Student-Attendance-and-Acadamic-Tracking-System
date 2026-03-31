# Integrated Student Attendance and Academic Performance Management System

A web-based system for managing student attendance and academic performance at Arunachala Hi-Tech Engineering College.

## Features

- **Institution Staff Login**: Secure access for staff to manage attendance and marks
- **Parent Login**: Parents can view their child's attendance and academic performance
- **Attendance Management**: Mark daily attendance for students
- **SMS Notifications**: Automatic SMS alerts to parents when students are marked absent
- **Marks Management**: Upload and manage internal exam and class test marks
- **Real-time Updates**: View attendance history and academic summaries
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript, Three.js (for background animations)
- **Backend**: PHP
- **Database**: MySQL
- **Server**: Apache (via XAMPP)

## Setup Instructions

### Prerequisites

1. **XAMPP**: Download and install XAMPP from [https://www.apachefriends.org/](https://www.apachefriends.org/)
2. **Web Browser**: Modern browser like Chrome, Firefox, or Safari

### Installation Steps

1. **Clone or Download the Project**:
   - Place the project folder in `C:\xampp\htdocs\` (Windows) or `/Applications/XAMPP/htdocs/` (macOS)

2. **Start XAMPP**:
   - Open XAMPP Control Panel
   - Start Apache and MySQL services

3. **Create Database**:
   - Open phpMyAdmin at `http://localhost/phpmyadmin`
   - Create a new database named `attendance_system`
   - Import the `database.sql` file from the project root

4. **Configure Database Connection**:
   - Open `config/db.php`
   - Update database credentials if needed (default XAMPP settings should work)

5. **Setup SMS Notifications (Optional)**:
   - Sign up for a Twilio account at [https://www.twilio.com/](https://www.twilio.com/)
   - Get your Account SID, Auth Token, and a Twilio phone number
   - Open `config/sms.php` and replace the placeholder values:
     ```php
     $twilio_sid = 'YOUR_TWILIO_SID';
     $twilio_token = 'YOUR_TWILIO_TOKEN';
     $twilio_number = 'YOUR_TWILIO_PHONE_NUMBER';
     $testing_mode = false; // Set to false to send real SMS
     ```
   - For Indian phone numbers, ensure they are in international format (+91XXXXXXXXXX)
   - **Note**: By default, testing mode is enabled (logs SMS to error log instead of sending)

6. **Access the Application**:
   - Open your browser and go to `http://localhost/[project-folder-name]/index.php`

### Default Login Credentials

**Staff Login**:

- Institution ID: `admin`
- Password: `password`

**Parent Login**:

- Use any student's register number and date of birth from the database

## Usage

### For Staff:

1. Login with institution credentials
2. Select department and year
3. Mark daily attendance for students (SMS alerts sent automatically for absent students)
4. Upload/manage academic marks

### For Parents:

1. Login with child's register number and date of birth
2. View attendance percentage and history
3. Check academic performance and marks

## Database Schema

The system uses the following tables:

- `students`: Student information
- `attendance`: Daily attendance records
- `subjects`: Subject information by department and year
- `marks`: Student marks for different exams

## File Structure

```
/
├── index.php              # Main entry point
├── style.css              # Stylesheet
├── script.js              # JavaScript for UI interactions
├── database.sql           # Database schema and sample data
├── config/
│   └── db.php            # Database configuration
└── pages/
    ├── home.php          # Home page with login options
    ├── staff_login.php   # Staff login form
    ├── parent_login.php  # Parent login form
    ├── department.php    # Department and year selection
    ├── students.php      # Attendance management
    ├── marks_upload.php  # Marks management
    └── parent_view.php   # Parent dashboard
```

## Usage

### For Staff:

1. Login with institution credentials
2. Select department and year
3. Mark daily attendance for students
4. Upload/manage academic marks

### For Parents:

1. Login with child's register number and date of birth
2. View attendance percentage and history
3. Check academic performance and marks

## Security Features

- Session-based authentication
- CAPTCHA for staff login
- Input validation and sanitization
- SQL injection prevention using prepared statements

## Development

To modify or extend the system:

1. Edit PHP files in the `pages/` directory for backend logic
2. Modify `style.css` for styling changes
3. Update `script.js` for client-side interactions
4. Alter `database.sql` for database schema changes

## Troubleshooting

**Common Issues:**

1. **Database Connection Error**: Check XAMPP services are running and database credentials in `config/db.php`
2. **Page Not Loading**: Ensure Apache is started and files are in the correct htdocs directory
3. **Login Issues**: Verify database has sample data and credentials match

**Error Logs:**

- Check Apache error logs in XAMPP control panel
- PHP errors are displayed if `display_errors` is enabled in php.ini

## License

This project is for educational purposes. Please respect copyright and academic integrity guidelines.
