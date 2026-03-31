<?php
// Start session for login management
session_start();

// Include database connection
include '../config/db.php';

// Check if user is logged in
if (isset($_SESSION['user_type'])) {
    if ($_SESSION['user_type'] == 'staff') {
        header('Location: index.php?page=department');
        exit;
    } elseif ($_SESSION['user_type'] == 'parent') {
        header('Location: index.php?page=parent_view');
        exit;
    }
}
?>

<div class="w-full max-w-4xl fadeUp">
    <div style="text-align:center;margin-bottom:2rem;">
        <h1 class="neon-text" style="font-size:32px;margin-bottom:12px;font-weight:700;">Welcome</h1>
        <p style="color:var(--text-secondary);font-size:1.05rem;">Arunachala Hi-Tech Engineering College</p>
    </div>

    <div class="login-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
        <!-- Institution Login Card -->
        <div class="glass-card" style="cursor:pointer;transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 20px 56px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)'">
            <div style="text-align:center;">
                <div style="width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,var(--accent-primary),var(--accent-primary-2));display:flex;align-items:center;justify-content:center;margin:0 auto 16px;box-shadow:0 4px 16px rgba(37,99,235,0.3);">
                    <svg xmlns="http://www.w3.org/2000/svg" style="width:32px;height:32px;color:white;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <h2 class="neon-text" style="font-size:22px;margin-bottom:8px;font-weight:700;">Institution Login</h2>
                <p style="color:var(--text-secondary);margin-bottom:20px;font-size:0.95rem;">Secure portal for authorised staff</p>
                <a href="?page=staff_login" class="btn" style="width:100%;text-decoration:none;display:inline-block;text-align:center;">Login as Staff</a>
            </div>
        </div>

        <!-- Parents Login Card -->
        <div class="glass-card" style="cursor:pointer;transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 20px 56px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)'">
            <div style="text-align:center;">
                <div style="width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,#10b981,#34d399);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;box-shadow:0 4px 16px rgba(16,185,129,0.3);">
                    <svg xmlns="http://www.w3.org/2000/svg" style="width:32px;height:32px;color:white;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h2 class="neon-text" style="font-size:22px;margin-bottom:8px;font-weight:700;">Parents Login</h2>
                <p style="color:var(--text-secondary);margin-bottom:20px;font-size:0.95rem;">View your child's attendance & marks</p>
                <a href="?page=parent_login" class="btn" style="width:100%;background:linear-gradient(135deg,#10b981,#34d399);box-shadow:0 4px 16px rgba(16,185,129,0.25);text-decoration:none;display:inline-block;text-align:center;" onmouseover="this.style.background='linear-gradient(135deg,#34d399,#10b981)';this.style.boxShadow='0 6px 20px rgba(16,185,129,0.35)'" onmouseout="this.style.background='linear-gradient(135deg,#10b981,#34d399)';this.style.boxShadow='0 4px 16px rgba(16,185,129,0.25)'">Login as Parent</a>
            </div>
        </div>
    </div>
</div>

<div class="w-full max-w-4xl fadeUp">
    <div style="text-align:center;margin-bottom:2rem;">
        <h1 class="neon-text" style="font-size:32px;margin-bottom:12px;font-weight:700;">Welcome</h1>
        <p style="color:var(--text-secondary);font-size:1.05rem;">Arunachala Hi-Tech Engineering College</p>
    </div>

    <div class="login-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
        <!-- Institution Login Card -->
        <div class="glass-card" style="cursor:pointer;transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 20px 56px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)'">
            <div style="text-align:center;">
                <div style="width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,var(--accent-primary),var(--accent-primary-2));display:flex;align-items:center;justify-content:center;margin:0 auto 16px;box-shadow:0 4px 16px rgba(37,99,235,0.3);">
                    <svg xmlns="http://www.w3.org/2000/svg" style="width:32px;height:32px;color:white;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <h2 class="neon-text" style="font-size:22px;margin-bottom:8px;font-weight:700;">Institution Login</h2>
                <p style="color:var(--text-secondary);margin-bottom:20px;font-size:0.95rem;">Secure portal for authorised staff</p>
                <a href="?page=staff_login" class="btn" style="width:100%;text-decoration:none;display:inline-block;text-align:center;">Login as Staff</a>
            </div>
        </div>

        <!-- Parents Login Card -->
        <div class="glass-card" style="cursor:pointer;transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 20px 56px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)'">
            <div style="text-align:center;">
                <div style="width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,#10b981,#34d399);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;box-shadow:0 4px 16px rgba(16,185,129,0.3);">
                    <svg xmlns="http://www.w3.org/2000/svg" style="width:32px;height:32px;color:white;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h2 class="neon-text" style="font-size:22px;margin-bottom:8px;font-weight:700;">Parents Login</h2>
                <p style="color:var(--text-secondary);margin-bottom:20px;font-size:0.95rem;">View your child's attendance & marks</p>
                <a href="?page=parent_login" class="btn" style="width:100%;background:linear-gradient(135deg,#10b981,#34d399);box-shadow:0 4px 16px rgba(16,185,129,0.25);text-decoration:none;display:inline-block;text-align:center;" onmouseover="this.style.background='linear-gradient(135deg,#34d399,#10b981)';this.style.boxShadow='0 6px 20px rgba(16,185,129,0.35)'" onmouseout="this.style.background='linear-gradient(135deg,#10b981,#34d399)';this.style.boxShadow='0 4px 16px rgba(16,185,129,0.25)'">Login as Parent</a>
            </div>
        </div>
    </div>
</div>