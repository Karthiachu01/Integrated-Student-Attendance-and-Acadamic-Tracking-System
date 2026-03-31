-- Create database
CREATE DATABASE IF NOT EXISTS attendance_system;
USE attendance_system;
-- Students table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    reg_no VARCHAR(50) UNIQUE NOT NULL,
    dob DATE NOT NULL,
    address TEXT,
    phone VARCHAR(15),
    department VARCHAR(10) NOT NULL,
    year INT NOT NULL
);
-- Attendance table
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    date DATE NOT NULL,
    status ENUM('present', 'absent') NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id)
);
-- Subjects table
CREATE TABLE subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department VARCHAR(10) NOT NULL,
    year INT NOT NULL,
    semester INT NOT NULL,
    subject_name VARCHAR(100) NOT NULL
);
-- Marks table
CREATE TABLE marks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    exam_type VARCHAR(20) NOT NULL,
    -- internal1, internal2, classTest1, classTest2
    marks INT NOT NULL,
    max_marks INT NOT NULL,
    status ENUM('draft', 'final') DEFAULT 'draft',
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);
-- Insert sample data
INSERT INTO students (
        name,
        reg_no,
        dob,
        address,
        phone,
        department,
        year
    )
VALUES (
        'Alice',
        'AHEC2021CSE001',
        '2003-01-01',
        'City A',
        '+919876543210',
        'CSE',
        2
    ),
    (
        'Bob',
        'AHEC2021CSE002',
        '2003-02-02',
        'City B',
        '+919123456780',
        'CSE',
        2
    ),
    (
        'Evan',
        'AHEC2020CSE003',
        '2002-05-05',
        'City E',
        '+919898989898',
        'CSE',
        3
    ),
    (
        'George',
        'AHEC2019CSE004',
        '2001-07-07',
        'City G',
        '+919555544443',
        'CSE',
        4
    ),
    (
        'Kumar',
        'AHEC2021AIDS001',
        '2003-01-01',
        'City X',
        '+919999999999',
        'AIDS',
        2
    ),
    (
        'Latha',
        'AHEC2020AIDS002',
        '2002-02-02',
        'City Y',
        '+918888888888',
        'AIDS',
        3
    ),
    (
        'Mohan',
        'AHEC2019AIDS003',
        '2001-03-03',
        'City Z',
        '+917777777777',
        'AIDS',
        4
    ),
    (
        'John',
        'AHEC2021IT001',
        '2003-05-10',
        'City P',
        '+916666666666',
        'IT',
        2
    ),
    (
        'Rita',
        'AHEC2020IT002',
        '2002-06-15',
        'City Q',
        '+915555555555',
        'IT',
        3
    ),
    (
        'Sam',
        'AHEC2019IT003',
        '2001-07-20',
        'City R',
        '+914444444444',
        'IT',
        4
    ),
    (
        'Nisha',
        'AHEC2021ECE001',
        '2003-09-10',
        'City S',
        '+913333333333',
        'ECE',
        2
    ),
    (
        'Vikram',
        'AHEC2020ECE002',
        '2002-10-11',
        'City T',
        '+912222222222',
        'ECE',
        3
    ),
    (
        'Priya',
        'AHEC2019ECE003',
        '2001-12-12',
        'City U',
        '+911111111111',
        'ECE',
        4
    ),
    (
        'Deepa',
        'AHEC2021EEE001',
        '2003-04-04',
        'City M',
        '+911010101010',
        'EEE',
        2
    ),
    (
        'Raj',
        'AHEC2020EEE002',
        '2002-08-08',
        'City N',
        '+912020202020',
        'EEE',
        3
    ),
    (
        'Arun',
        'AHEC2019EEE003',
        '2001-11-11',
        'City O',
        '+913030303030',
        'EEE',
        4
    );
-- Insert subjects
INSERT INTO subjects (department, year, semester, subject_name)
VALUES ('CSE', 2, 3, 'Data Structures'),
    ('CSE', 2, 3, 'OOP'),
    ('CSE', 2, 3, 'Digital Logic'),
    ('CSE', 3, 5, 'DBMS'),
    ('CSE', 3, 5, 'Operating Systems'),
    ('CSE', 3, 5, 'Computer Networks'),
    ('CSE', 4, 7, 'Compiler Design'),
    ('CSE', 4, 7, 'Distributed Systems'),
    ('CSE', 4, 7, 'Machine Learning'),
    ('AIDS', 2, 3, 'Python Programming'),
    ('AIDS', 2, 3, 'Linear Algebra'),
    ('AIDS', 3, 5, 'Data Mining'),
    ('AIDS', 3, 5, 'Statistics for AI'),
    ('AIDS', 4, 7, 'Deep Learning'),
    ('AIDS', 4, 7, 'Big Data Analytics'),
    ('IT', 2, 3, 'Web Technology'),
    ('IT', 2, 3, 'Java Programming'),
    ('IT', 3, 5, 'Computer Networks'),
    ('IT', 3, 5, 'Software Engineering'),
    ('IT', 4, 7, 'Cloud Computing'),
    ('IT', 4, 7, 'Information Security'),
    ('ECE', 2, 3, 'Circuit Theory'),
    ('ECE', 2, 3, 'Signals & Systems'),
    ('ECE', 3, 5, 'Digital Communication'),
    ('ECE', 3, 5, 'Microprocessors'),
    ('ECE', 4, 7, 'VLSI Design'),
    ('ECE', 4, 7, 'Embedded Systems'),
    ('EEE', 2, 3, 'Electrical Machines'),
    ('EEE', 2, 3, 'Power Systems'),
    ('EEE', 3, 5, 'Control Systems'),
    ('EEE', 3, 5, 'Power Electronics'),
    ('EEE', 4, 7, 'High Voltage Engg.'),
    ('EEE', 4, 7, 'Smart Grid');
-- Insert sample marks
INSERT INTO marks (
        student_id,
        subject_id,
        exam_type,
        marks,
        max_marks
    )
VALUES (1, 1, 'internal1', 52, 60),
    (1, 1, 'internal2', 48, 60),
    (1, 1, 'classTest1', 18, 20),
    (1, 1, 'classTest2', 16, 20),
    -- Add more as needed...