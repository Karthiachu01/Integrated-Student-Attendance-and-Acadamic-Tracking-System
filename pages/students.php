<?php
session_start();
if (!isset($_SESSION['user_type']) || $_SESSION['user_type'] != 'staff') {
    header('Location: index.php');
    exit;
}

include '../config/db.php';
include '../config/sms.php';

$dept = $_SESSION['dept'];
$year = $_SESSION['year'];

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['attendance'])) {
    $date = date('Y-m-d');
    $sms_sent_count = 0;
    foreach ($_POST['attendance'] as $student_id => $status) {
        $stmt = $pdo->prepare("INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE status = ?");
        $stmt->execute([$student_id, $date, $status, $status]);

        // Send SMS if student is marked absent
        if ($status == 'absent') {
            $stmt_student = $pdo->prepare("SELECT name, phone FROM students WHERE id = ?");
            $stmt_student->execute([$student_id]);
            $student = $stmt_student->fetch();

            if ($student && !empty($student['phone'])) {
                $message = $student['name'] . " is absent on " . date('d-m-Y');
                if (sendSmsToParent($student['phone'], $message)) {
                    $sms_sent_count++;
                }
            }
        }
    }
    $message = 'Attendance updated successfully. SMS sent to ' . $sms_sent_count . ' parents for absent students.';
}

// Get students
$stmt = $pdo->prepare("SELECT * FROM students WHERE department = ? AND year = ?");
$stmt->execute([$dept, $year]);
$students = $stmt->fetchAll();

// Get today's attendance
$today = date('Y-m-d');
$attendance = [];
$stmt = $pdo->prepare("SELECT student_id, status FROM attendance WHERE date = ?");
$stmt->execute([$today]);
foreach ($stmt->fetchAll() as $row) {
    $attendance[$row['student_id']] = $row['status'];
}
?>

<div class="w-full max-w-6xl fadeUp flex flex-col gap-6">
    <!-- Student list card -->
    <div class="glass-card">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
            <h3 style="font-size:20px;font-weight:700;color:var(--text-primary);">Student Attendance — <?php echo $dept; ?> (<?php echo $year; ?>)</h3>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <a href="?page=department" class="btn-ghost">Back to Department</a>
                <a href="?logout=1" class="btn-ghost">Logout</a>
            </div>
        </div>

        <?php if (isset($message)): ?>
            <div style="color:green;text-align:center;margin:12px 0;"><?php echo $message; ?></div>
        <?php endif; ?>

        <form method="POST" style="margin-top:12px;">
            <div style="overflow:auto;border-radius:10px;">
                <table class="min-w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Register No.</th>
                            <th>DOB</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Present</th>
                            <th>Absent</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($students as $student): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($student['name']); ?></td>
                                <td><?php echo htmlspecialchars($student['reg_no']); ?></td>
                                <td><?php echo htmlspecialchars($student['dob']); ?></td>
                                <td><?php echo htmlspecialchars($student['address']); ?></td>
                                <td><?php echo htmlspecialchars($student['phone']); ?></td>
                                <td><input type="radio" name="attendance[<?php echo $student['id']; ?>]" value="present" <?php echo (isset($attendance[$student['id']]) && $attendance[$student['id']] == 'present') ? 'checked' : ''; ?>></td>
                                <td><input type="radio" name="attendance[<?php echo $student['id']; ?>]" value="absent" <?php echo (isset($attendance[$student['id']]) && $attendance[$student['id']] == 'absent') ? 'checked' : ''; ?>></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
            <div style="text-align:center;margin-top:16px;">
                <button type="submit" class="btn">Update Attendance</button>
            </div>
        </form>
    </div>

    <!-- History card -->
    <div class="glass-card">
        <div style="text-align:center;">
            <h4 style="font-size:18px;font-weight:700;margin-bottom:12px;color:var(--text-primary);">Attendance History</h4>
        </div>
        <div style="overflow:auto;border-radius:10px;">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $stmt = $pdo->prepare("
            SELECT s.name, a.date, a.status
            FROM attendance a
            JOIN students s ON a.student_id = s.id
            WHERE s.department = ? AND s.year = ?
            ORDER BY a.date DESC, s.name
          ");
                    $stmt->execute([$dept, $year]);
                    foreach ($stmt->fetchAll() as $record): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($record['name']); ?></td>
                            <td><?php echo htmlspecialchars($record['date']); ?></td>
                            <td><?php echo htmlspecialchars($record['status']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>