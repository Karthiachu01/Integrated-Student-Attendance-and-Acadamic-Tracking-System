<?php
// SMS Configuration using Twilio
// Sign up at https://www.twilio.com/ for API credentials

$twilio_sid = 'YOUR_TWILIO_SID'; // Replace with your Twilio SID
$twilio_token = 'YOUR_TWILIO_TOKEN'; // Replace with your Twilio Auth Token
$twilio_number = 'YOUR_TWILIO_PHONE_NUMBER'; // Replace with your Twilio phone number

// Set to true for testing (logs SMS instead of sending)
$testing_mode = true;

function sendSmsToParent($phone, $message)
{
    global $twilio_sid, $twilio_token, $twilio_number, $testing_mode;

    // Check if phone number is valid
    if (empty($phone) || !preg_match('/^\+?[0-9]{10,15}$/', $phone)) {
        error_log("Invalid phone number: $phone");
        return false;
    }

    if ($testing_mode) {
        // Testing mode: log the SMS instead of sending
        error_log("TEST SMS to $phone: $message");
        return true;
    }

    // For development/testing, you can use a service like ngrok to expose localhost
    // For production, ensure this is secure

    $url = "https://api.twilio.com/2010-04-01/Accounts/$twilio_sid/Messages.json";

    $data = [
        'From' => $twilio_number,
        'To' => $phone,
        'Body' => $message
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_USERPWD, $twilio_sid . ':' . $twilio_token);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // For development only

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (curl_errno($ch)) {
        error_log('SMS sending failed: ' . curl_error($ch));
        curl_close($ch);
        return false;
    }

    curl_close($ch);

    if ($http_code == 201) {
        return true;
    } else {
        error_log('SMS sending failed with HTTP code: ' . $http_code . ' Response: ' . $response);
        return false;
    }
}

// Alternative: Use a local SMS gateway or email-to-SMS
// Uncomment and modify the function below if you prefer email-to-SMS

/*
function sendSmsToParent($phone, $message) {
    // Convert phone to email (example for US carriers)
    // You'll need to check your carrier's email-to-SMS format
    $carrier_domains = [
        'verizon' => 'vtext.com',
        'att' => 'txt.att.net',
        'tmobile' => 'tmomail.net',
        // Add more carriers as needed
    ];

    // For this example, assuming Indian numbers, you might need a different approach
    // You can use services like SMS Gateway or integrate with local providers

    // For testing, just log the message
    error_log("SMS to $phone: $message");

    // Return true for testing
    return true;
}
*/
