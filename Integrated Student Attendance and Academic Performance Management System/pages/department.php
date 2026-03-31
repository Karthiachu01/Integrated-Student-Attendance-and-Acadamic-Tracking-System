<?php
session_start();
if (!isset($_SESSION['user_type']) || $_SESSION['user_type'] != 'staff') {
    header('Location: index.php');
    exit;
}

include '../config/db.php';

$message = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $dept = $_POST['dept'];
    $year = $_POST['year'];
    $_SESSION['dept'] = $dept;
    $_SESSION['year'] = $year;
    header('Location: index.php?page=students');
    exit;
}
?>

<div class="glass-card w-full max-w-3xl fadeUp">
    <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--accent-primary),var(--accent-primary-2));display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(37,99,235,0.2);">
            <svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px;color:white;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-3.866 0-7 1.79-7 4v5h14v-5c0-2.21-3.134-4-7-4z" />
            </svg>
        </div>
        <h3 style="font-size:20px;font-weight:700;color:var(--text-primary);">Select Department & Year</h3>
    </div>

    <form method="POST" style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:16px;">
        <select name="dept" required style="padding:14px;border-radius:12px;background:rgba(255,255,255,0.9);color:var(--text-primary);border:1px solid rgba(226,232,240,0.8);font-size:0.95rem;cursor:pointer;transition:border-color 0.2s ease,box-shadow 0.2s ease;" onfocus="this.style.borderColor='var(--accent-primary)';this.style.boxShadow='0 0 0 3px rgba(37,99,235,0.1)'" onblur="this.style.borderColor='rgba(226,232,240,0.8)';this.style.boxShadow='none'">
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="AIDS">AIDS</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
        </select>

        <select name="year" required style="padding:14px;border-radius:12px;background:rgba(255,255,255,0.9);color:var(--text-primary);border:1px solid rgba(226,232,240,0.8);font-size:0.95rem;cursor:pointer;transition:border-color 0.2s ease,box-shadow 0.2s ease;" onfocus="this.style.borderColor='var(--accent-primary)';this.style.boxShadow='0 0 0 3px rgba(37,99,235,0.1)'" onblur="this.style.borderColor='rgba(226,232,240,0.8)';this.style.boxShadow='none'">
            <option value="">Select Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
        </select>
    </form>

    <div style="display:flex;gap:12px;justify-content:center;margin-top:14px;flex-wrap:wrap;">
        <button type="submit" form="deptForm" class="btn">Load Students</button>
        <a href="?page=marks_upload" class="btn-ghost">Open Mark Upload</a>
        <a href="?logout=1" class="btn-ghost">Logout</a>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.querySelector('form');
        form.id = 'deptForm';
    });
</script>