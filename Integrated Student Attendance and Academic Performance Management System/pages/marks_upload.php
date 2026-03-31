<?php
session_start();
if (!isset($_SESSION['user_type']) || $_SESSION['user_type'] != 'staff') {
    header('Location: index.php');
    exit;
}

include '../config/db.php';

$message = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['save_marks'])) {
        foreach ($_POST['marks'] as $student_id => $student_marks) {
            foreach ($student_marks as $exam_type => $mark) {
                if ($mark !== '') {
                    $subject_id = $_POST['subject_id'];
                    $max_marks = ($exam_type == 'internal1' || $exam_type == 'internal2') ? 60 : 20;

                    $stmt = $pdo->prepare("
                        INSERT INTO marks (student_id, subject_id, exam_type, marks, max_marks, status)
                        VALUES (?, ?, ?, ?, ?, 'draft')
                        ON DUPLICATE KEY UPDATE marks = ?, status = 'draft'
                    ");
                    $stmt->execute([$student_id, $subject_id, $exam_type, $mark, $max_marks, $mark]);
                }
            }
        }
        $message = 'Marks saved as draft successfully';
    } elseif (isset($_POST['finalize_marks'])) {
        $subject_id = $_POST['subject_id'];
        $stmt = $pdo->prepare("UPDATE marks SET status = 'final' WHERE subject_id = ?");
        $stmt->execute([$subject_id]);
        $message = 'Marks finalized successfully';
    }
}

// Get form data
$dept = $_POST['dept'] ?? '';
$year = $_POST['year'] ?? '';
$semester = $_POST['semester'] ?? '';
$subject_id = $_POST['subject_id'] ?? '';

$students = [];
$subject_name = '';
$existing_marks = [];

if ($subject_id) {
    // Get subject name
    $stmt = $pdo->prepare("SELECT subject_name FROM subjects WHERE id = ?");
    $stmt->execute([$subject_id]);
    $subject_name = $stmt->fetch()['subject_name'];

    // Get students
    $stmt = $pdo->prepare("SELECT * FROM students WHERE department = ? AND year = ?");
    $stmt->execute([$dept, $year]);
    $students = $stmt->fetchAll();

    // Get existing marks
    $stmt = $pdo->prepare("SELECT student_id, exam_type, marks FROM marks WHERE subject_id = ?");
    $stmt->execute([$subject_id]);
    foreach ($stmt->fetchAll() as $mark) {
        $existing_marks[$mark['student_id']][$mark['exam_type']] = $mark['marks'];
    }
}
?>

<div class="w-full max-w-6xl fadeUp flex flex-col gap-6">
    <div class="glass-card">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
            <div>
                <h3 style="font-size:20px;font-weight:700;color:var(--text-primary);">Mark Upload Module</h3>
                <p style="font-size:0.9rem;color:var(--text-secondary);margin-top:4px;">
                    Enter and manage internal and class test marks for students.
                </p>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <a href="?page=department" class="btn-ghost">Back to Department</a>
                <a href="?logout=1" class="btn-ghost">Logout</a>
            </div>
        </div>
    </div>

    <div class="glass-card">
        <form method="POST" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:20px;">
            <select name="dept" required onchange="this.form.submit()" style="padding:14px;border-radius:12px;background:rgba(255,255,255,0.9);color:var(--text-primary);border:1px solid rgba(226,232,240,0.8);font-size:0.95rem;">
                <option value="">Select Department</option>
                <option value="CSE" <?php echo $dept == 'CSE' ? 'selected' : ''; ?>>CSE</option>
                <option value="AIDS" <?php echo $dept == 'AIDS' ? 'selected' : ''; ?>>AIDS</option>
                <option value="IT" <?php echo $dept == 'IT' ? 'selected' : ''; ?>>IT</option>
                <option value="ECE" <?php echo $dept == 'ECE' ? 'selected' : ''; ?>>ECE</option>
                <option value="EEE" <?php echo $dept == 'EEE' ? 'selected' : ''; ?>>EEE</option>
            </select>

            <select name="year" required onchange="this.form.submit()" style="padding:14px;border-radius:12px;background:rgba(255,255,255,0.9);color:var(--text-primary);border:1px solid rgba(226,232,240,0.8);font-size:0.95rem;">
                <option value="">Select Year</option>
                <option value="2" <?php echo $year == '2' ? 'selected' : ''; ?>>2nd Year</option>
                <option value="3" <?php echo $year == '3' ? 'selected' : ''; ?>>3rd Year</option>
                <option value="4" <?php echo $year == '4' ? 'selected' : ''; ?>>4th Year</option>
            </select>

            <select name="semester" required onchange="this.form.submit()" style="padding:14px;border-radius:12px;background:rgba(255,255,255,0.9);color:var(--text-primary);border:1px solid rgba(226,232,240,0.8);font-size:0.95rem;">
                <option value="">Select Semester</option>
                <option value="3" <?php echo $semester == '3' ? 'selected' : ''; ?>>Semester 3</option>
                <option value="4" <?php echo $semester == '4' ? 'selected' : ''; ?>>Semester 4</option>
                <option value="5" <?php echo $semester == '5' ? 'selected' : ''; ?>>Semester 5</option>
                <option value="6" <?php echo $semester == '6' ? 'selected' : ''; ?>>Semester 6</option>
                <option value="7" <?php echo $semester == '7' ? 'selected' : ''; ?>>Semester 7</option>
                <option value="8" <?php echo $semester == '8' ? 'selected' : ''; ?>>Semester 8</option>
            </select>

            <?php if ($dept && $year && $semester): ?>
                <select name="subject_id" required onchange="this.form.submit()" style="padding:14px;border-radius:12px;background:rgba(255,255,255,0.9);color:var(--text-primary);border:1px solid rgba(226,232,240,0.8);font-size:0.95rem;">
                    <option value="">Select Subject</option>
                    <?php
                    $stmt = $pdo->prepare("SELECT * FROM subjects WHERE department = ? AND year = ? AND semester = ?");
                    $stmt->execute([$dept, $year, $semester]);
                    foreach ($stmt->fetchAll() as $subject): ?>
                        <option value="<?php echo $subject['id']; ?>" <?php echo $subject_id == $subject['id'] ? 'selected' : ''; ?>><?php echo htmlspecialchars($subject['subject_name']); ?></option>
                    <?php endforeach; ?>
                </select>
            <?php endif; ?>
        </form>

        <?php if ($subject_id && $students): ?>
            <?php if ($message): ?>
                <div style="color:green;text-align:center;margin:12px 0;"><?php echo $message; ?></div>
            <?php endif; ?>

            <form method="POST">
                <input type="hidden" name="subject_id" value="<?php echo $subject_id; ?>">
                <input type="hidden" name="dept" value="<?php echo $dept; ?>">
                <input type="hidden" name="year" value="<?php echo $year; ?>">
                <input type="hidden" name="semester" value="<?php echo $semester; ?>">

                <div style="overflow:auto;border-radius:10px;margin-bottom:16px;">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Register No.</th>
                                <th>Internal 1 (60)</th>
                                <th>Internal 2 (60)</th>
                                <th>Class Test 1 (20)</th>
                                <th>Class Test 2 (20)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($students as $student): ?>
                                <tr>
                                    <td><?php echo htmlspecialchars($student['name']); ?></td>
                                    <td><?php echo htmlspecialchars($student['reg_no']); ?></td>
                                    <td><input type="number" name="marks[<?php echo $student['id']; ?>][internal1]" min="0" max="60" value="<?php echo $existing_marks[$student['id']]['internal1'] ?? ''; ?>" style="width:80px;padding:4px;border-radius:6px;border:1px solid rgba(226,232,240,0.8);"></td>
                                    <td><input type="number" name="marks[<?php echo $student['id']; ?>][internal2]" min="0" max="60" value="<?php echo $existing_marks[$student['id']]['internal2'] ?? ''; ?>" style="width:80px;padding:4px;border-radius:6px;border:1px solid rgba(226,232,240,0.8);"></td>
                                    <td><input type="number" name="marks[<?php echo $student['id']; ?>][classTest1]" min="0" max="20" value="<?php echo $existing_marks[$student['id']]['classTest1'] ?? ''; ?>" style="width:80px;padding:4px;border-radius:6px;border:1px solid rgba(226,232,240,0.8);"></td>
                                    <td><input type="number" name="marks[<?php echo $student['id']; ?>][classTest2]" min="0" max="20" value="<?php echo $existing_marks[$student['id']]['classTest2'] ?? ''; ?>" style="width:80px;padding:4px;border-radius:6px;border:1px solid rgba(226,232,240,0.8);"></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>

                <div style="display:flex;gap:12px;justify-content:center;">
                    <button type="submit" name="save_marks" class="btn">Save as Draft</button>
                    <button type="submit" name="finalize_marks" class="btn" style="background:linear-gradient(135deg,#10b981,#34d399);" onclick="return confirm('Are you sure you want to finalize these marks?')">Finalize Marks</button>
                </div>
            </form>
        <?php endif; ?>
    </div>
</div>