<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Your email address
    $to = "ashwin2187@gmail.com"; // Replace with your email address
    $subject = "New Contact Form Submission from $name";
    
    // Create the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";
    
    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send the email
    if (mail($to, $subject, $email_content, $headers)) {
        // Success
        echo "<script>alert('Your message has been sent successfully!'); window.location.href = 'contact.html';</script>";
    } else {
        // Error
        echo "<script>alert('Sorry, something went wrong. Please try again later.'); window.location.href = 'contact.html';</script>";
    }
} else {
    // Redirect back to the form if the request method is not POST
    header("Location: contact.html");
    exit;
}
?>
