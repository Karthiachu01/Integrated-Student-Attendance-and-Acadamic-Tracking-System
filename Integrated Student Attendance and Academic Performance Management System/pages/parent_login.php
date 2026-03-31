<?php
session_start();
include '../config/db.php';

$message = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $regNo = $_POST['regNo'];
    $dob = $_POST['dob'];

    // Check if student exists with matching DOB
    $stmt = $pdo->prepare("SELECT * FROM students WHERE reg_no = ? AND dob = ?");
    $stmt->execute([$regNo, $dob]);
    $student = $stmt->fetch();

    if ($student) {
        $_SESSION['user_type'] = 'parent';
        $_SESSION['student'] = $student;
        header('Location: index.php');
        exit;
    } else {
        $message = 'Invalid register number or date of birth';
    }
}
?>

<div class="glass-card w-full max-w-xl fadeUp">
    <div style="text-align:center;">
        <h2 class="neon-text" style="font-size:24px;margin-bottom:8px;font-weight:700;">Parents Login</h2>
        <p style="color:var(--text-secondary);margin-bottom:16px;font-size:0.95rem;">Enter your child's details to view attendance and marks</p>
    </div>

    <?php if ($message): ?>
        <div style="color:red;text-align:center;margin-bottom:16px;"><?php echo $message; ?></div>
    <?php endif; ?>

    <form method="POST" style="display:grid;gap:14px;">
        <input name="regNo" placeholder="Student Register Number" required style="padding:14px;border-radius:12px;border:1px solid rgba(226,232,240,0.8);background:rgba(255,255,255,0.9);color:var(--text-primary);font-size:0.95rem;transition:border-color 0.2s ease,box-shadow 0.2s ease;" onfocus="this.style.borderColor='#10b981';this.style.boxShadow='0 0 0 3px rgba(16,185,129,0.1)'" onblur="this.style.borderColor='rgba(226,232,240,0.8)';this.style.boxShadow='none'" />
        <input name="dob" type="date" placeholder="Date of Birth" required style="padding:14px;border-radius:12px;border:1px solid rgba(226,232,240,0.8);background:rgba(255,255,255,0.9);color:var(--text-primary);font-size:0.95rem;transition:border-color 0.2s ease,box-shadow 0.2s ease;" onfocus="this.style.borderColor='#10b981';this.style.boxShadow='0 0 0 3px rgba(16,185,129,0.1)'" onblur="this.style.borderColor='rgba(226,232,240,0.8)';this.style.boxShadow='none'" />

        <button type="submit" class="btn" style="width:100%;background:linear-gradient(135deg,#10b981,#34d399);box-shadow:0 4px 16px rgba(16,185,129,0.25);" onmouseover="this.style.background='linear-gradient(135deg,#34d399,#10b981)';this.style.boxShadow='0 6px 20px rgba(16,185,129,0.35)'" onmouseout="this.style.background='linear-gradient(135deg,#10b981,#34d399)';this.style.boxShadow='0 4px 16px rgba(16,185,129,0.25)'">Login</button>
        <a href="index.php" class="btn-ghost" style="width:100%;text-decoration:none;display:inline-block;text-align:center;">Back to Home</a>
    </form>
</div>