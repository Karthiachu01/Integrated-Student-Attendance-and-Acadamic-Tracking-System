<?php
session_start();
include '../config/db.php';

$message = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $instId = $_POST['instId'];
    $password = $_POST['password'];
    $captchaInput = $_POST['captchaInput'];
    $captchaCode = $_POST['captchaCode'];

    if ($captchaInput !== $captchaCode) {
        $message = 'Invalid CAPTCHA';
    } else {
        // Simple authentication - in production, hash passwords
        if ($instId == 'admin' && $password == 'password') {
            $_SESSION['user_type'] = 'staff';
            $_SESSION['instId'] = $instId;
            header('Location: index.php');
            exit;
        } else {
            $message = 'Invalid credentials';
        }
    }
}

// Generate CAPTCHA
$captcha = substr(md5(rand()), 0, 5);
$_SESSION['captcha'] = $captcha;
?>

<div class="glass-card w-full max-w-xl fadeUp">
    <div style="text-align:center;">
        <h2 class="neon-text" style="font-size:24px;margin-bottom:8px;font-weight:700;">Institution Login</h2>
        <p style="color:var(--text-secondary);margin-bottom:16px;font-size:0.95rem;">Secure portal for authorised staff</p>
    </div>

    <?php if ($message): ?>
        <div style="color:red;text-align:center;margin-bottom:16px;"><?php echo $message; ?></div>
    <?php endif; ?>

    <form method="POST" style="display:grid;gap:14px;">
        <input name="instId" placeholder="Institution ID" required style="padding:14px;border-radius:12px;border:1px solid rgba(226,232,240,0.8);background:rgba(255,255,255,0.9);color:var(--text-primary);font-size:0.95rem;transition:border-color 0.2s ease,box-shadow 0.2s ease;" onfocus="this.style.borderColor='var(--accent-primary)';this.style.boxShadow='0 0 0 3px rgba(37,99,235,0.1)'" onblur="this.style.borderColor='rgba(226,232,240,0.8)';this.style.boxShadow='none'" />
        <input name="password" type="password" placeholder="Password" required style="padding:14px;border-radius:12px;border:1px solid rgba(226,232,240,0.8);background:rgba(255,255,255,0.9);color:var(--text-primary);font-size:0.95rem;transition:border-color 0.2s ease,box-shadow 0.2s ease;" onfocus="this.style.borderColor='var(--accent-primary)';this.style.boxShadow='0 0 0 3px rgba(37,99,235,0.1)'" onblur="this.style.borderColor='rgba(226,232,240,0.8)';this.style.boxShadow='none'" />
        <div style="display:flex;gap:10px;align-items:center;">
            <div style="flex:1;display:flex;align-items:center;justify-content:space-between;padding:12px;border-radius:12px;border:1px solid rgba(226,232,240,0.8);background:rgba(255,255,255,0.9);">
                <span class="mono-captcha"><?php echo $captcha; ?></span>
                <button type="button" onclick="location.reload()" class="btn" style="padding:.4rem .7rem;font-weight:600;font-size:0.9rem;">↻</button>
            </div>
            <input name="captchaInput" placeholder="Enter Captcha" required style="flex:0.9;padding:14px;border-radius:12px;border:1px solid rgba(226,232,240,0.8);background:rgba(255,255,255,0.9);color:var(--text-primary);font-size:0.95rem;transition:border-color 0.2s ease,box-shadow 0.2s ease;" onfocus="this.style.borderColor='var(--accent-primary)';this.style.boxShadow='0 0 0 3px rgba(37,99,235,0.1)'" onblur="this.style.borderColor='rgba(226,232,240,0.8)';this.style.boxShadow='none'" />
        </div>
        <input type="hidden" name="captchaCode" value="<?php echo $captcha; ?>">

        <button type="submit" class="btn" style="width:100%;">Login</button>
        <a href="index.php" class="btn-ghost" style="width:100%;text-decoration:none;display:inline-block;text-align:center;">Back to Home</a>
    </form>
</div>