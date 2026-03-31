<?php
session_start();
if (!isset($_SESSION['user_type']) || $_SESSION['user_type'] != 'parent') {
    header('Location: index.php');
    exit;
}

include '../config/db.php';

$student = $_SESSION['student'];

// Get attendance summary
$stmt = $pdo->prepare("
    SELECT
        COUNT(CASE WHEN status = 'present' THEN 1 END) as present_count,
        COUNT(*) as total_count
    FROM attendance
    WHERE student_id = ?
");
$stmt->execute([$student['id']]);
$attendance_summary = $stmt->fetch();

$attendance_percentage = $attendance_summary['total_count'] > 0 ?
    round(($attendance_summary['present_count'] / $attendance_summary['total_count']) * 100, 2) : 0;

// Get marks summary
$stmt = $pdo->prepare("
    SELECT
        SUM(CASE WHEN exam_type = 'internal1' THEN marks END) as internal1,
        SUM(CASE WHEN exam_type = 'internal2' THEN marks END) as internal2,
        SUM(CASE WHEN exam_type = 'classTest1' THEN marks END) as classTest1,
        SUM(CASE WHEN exam_type = 'classTest2' THEN marks END) as classTest2,
        COUNT(DISTINCT subject_id) as subject_count
    FROM marks
    WHERE student_id = ?
");
$stmt->execute([$student['id']]);
$marks_summary = $stmt->fetch();

// Calculate averages
$marks_avg = [
    'internal1' => $marks_summary['subject_count'] > 0 ? round($marks_summary['internal1'] / $marks_summary['subject_count'], 2) : 0,
    'internal2' => $marks_summary['subject_count'] > 0 ? round($marks_summary['internal2'] / $marks_summary['subject_count'], 2) : 0,
    'classTest1' => $marks_summary['subject_count'] > 0 ? round($marks_summary['classTest1'] / $marks_summary['subject_count'], 2) : 0,
    'classTest2' => $marks_summary['subject_count'] > 0 ? round($marks_summary['classTest2'] / $marks_summary['subject_count'], 2) : 0,
];

// Get detailed marks
$stmt = $pdo->prepare("
    SELECT s.subject_name, m.exam_type, m.marks, m.max_marks
    FROM marks m
    JOIN subjects s ON m.subject_id = s.id
    WHERE m.student_id = ?
    ORDER BY s.subject_name, m.exam_type
");
$stmt->execute([$student['id']]);
$detailed_marks = $stmt->fetchAll();

// Get attendance history
$stmt = $pdo->prepare("
    SELECT date, status
    FROM attendance
    WHERE student_id = ?
    ORDER BY date DESC
");
$stmt->execute([$student['id']]);
$attendance_history = $stmt->fetchAll();
?>

<div class="w-full max-w-6xl fadeUp flex flex-col gap-6">
    <!-- Student Info Card -->
    <div class="glass-card">
        <div style="text-align:center;margin-bottom:20px;">
            <h2 class="neon-text" style="font-size:24px;margin-bottom:8px;">Student Information</h2>
            <p style="color:var(--text-secondary);">Welcome, Parent of <?php echo htmlspecialchars($student['name']); ?></p>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
            <div style="text-align:center;">
                <div style="font-weight:700;color:var(--text-primary);"><?php echo htmlspecialchars($student['name']); ?></div>
                <div style="color:var(--text-secondary);font-size:0.9rem;">Name</div>
            </div>
            <div style="text-align:center;">
                <div style="font-weight:700;color:var(--text-primary);"><?php echo htmlspecialchars($student['reg_no']); ?></div>
                <div style="color:var(--text-secondary);font-size:0.9rem;">Register Number</div>
            </div>
            <div style="text-align:center;">
                <div style="font-weight:700;color:var(--text-primary);"><?php echo htmlspecialchars($student['department']); ?> - Year <?php echo $student['year']; ?></div>
                <div style="color:var(--text-secondary);font-size:0.9rem;">Department & Year</div>
            </div>
            <div style="text-align:center;">
                <div style="font-weight:700;color:var(--text-primary);"><?php echo htmlspecialchars($student['phone']); ?></div>
                <div style="color:var(--text-secondary);font-size:0.9rem;">Phone</div>
            </div>
        </div>
    </div>

    <!-- Attendance Summary Card -->
    <div class="glass-card">
        <h3 style="font-size:20px;font-weight:700;margin-bottom:16px;color:var(--text-primary);">Attendance Summary</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;text-align:center;">
            <div>
                <div style="font-size:32px;font-weight:700;color:#10b981;"><?php echo $attendance_percentage; ?>%</div>
                <div style="color:var(--text-secondary);">Attendance Rate</div>
            </div>
            <div>
                <div style="font-size:32px;font-weight:700;color:var(--accent-primary);"><?php echo $attendance_summary['present_count']; ?></div>
                <div style="color:var(--text-secondary);">Days Present</div>
            </div>
            <div>
                <div style="font-size:32px;font-weight:700;color:#ef4444;"><?php echo $attendance_summary['total_count'] - $attendance_summary['present_count']; ?></div>
                <div style="color:var(--text-secondary);">Days Absent</div>
            </div>
        </div>
    </div>

    <!-- Marks Summary Card -->
    <div class="glass-card">
        <h3 style="font-size:20px;font-weight:700;margin-bottom:16px;color:var(--text-primary);">Academic Performance Summary</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:16px;text-align:center;">
            <div>
                <div style="font-size:24px;font-weight:700;color:var(--accent-primary);"><?php echo $marks_avg['internal1']; ?>/60</div>
                <div style="color:var(--text-secondary);font-size:0.9rem;">Internal 1 Avg</div>
            </div>
            <div>
                <div style="font-size:24px;font-weight:700;color:var(--accent-primary);"><?php echo $marks_avg['internal2']; ?>/60</div>
                <div style="color:var(--text-secondary);font-size:0.9rem;">Internal 2 Avg</div>
            </div>
            <div>
                <div style="font-size:24px;font-weight:700;color:#10b981;"><?php echo $marks_avg['classTest1']; ?>/20</div>
                <div style="color:var(--text-secondary);font-size:0.9rem;">Class Test 1 Avg</div>
            </div>
            <div>
                <div style="font-size:24px;font-weight:700;color:#10b981;"><?php echo $marks_avg['classTest2']; ?>/20</div>
                <div style="color:var(--text-secondary);font-size:0.9rem;">Class Test 2 Avg</div>
            </div>
        </div>
    </div>

    <!-- Detailed Marks Card -->
    <div class="glass-card">
        <h3 style="font-size:20px;font-weight:700;margin-bottom:16px;color:var(--text-primary);">Detailed Marks</h3>
        <div style="overflow:auto;border-radius:10px;">
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Internal 1</th>
                        <th>Internal 2</th>
                        <th>Class Test 1</th>
                        <th>Class Test 2</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $subjects = [];
                    foreach ($detailed_marks as $mark) {
                        $subjects[$mark['subject_name']][$mark['exam_type']] = $mark['marks'] . '/' . $mark['max_marks'];
                    }
                    foreach ($subjects as $subject => $exams): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($subject); ?></td>
                            <td><?php echo $exams['internal1'] ?? '-'; ?></td>
                            <td><?php echo $exams['internal2'] ?? '-'; ?></td>
                            <td><?php echo $exams['classTest1'] ?? '-'; ?></td>
                            <td><?php echo $exams['classTest2'] ?? '-'; ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Attendance History Card -->
    <div class="glass-card">
        <h3 style="font-size:20px;font-weight:700;margin-bottom:16px;color:var(--text-primary);">Attendance History</h3>
        <div style="overflow:auto;border-radius:10px;">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($attendance_history as $record): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($record['date']); ?></td>
                            <td><?php echo htmlspecialchars($record['status']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

    <div style="text-align:center;">
        <a href="?logout=1" class="btn-ghost">Logout</a>
    </div>
</div>