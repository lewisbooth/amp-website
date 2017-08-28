<?php
// Redirect GET requests to root
if ( $_SERVER['REQUEST_METHOD'] !== 'POST' ) {
    header('location: /');
} else {
    function slack($name, $email, $message) {
        $data = "payload=" . json_encode(array(
            "channel"       =>  "#enquiries",
            "color"         =>  "#3400ac",
            "text"          =>  $message,
            "pretext"       =>  "New enquiry from {$name} ({$email})",
            "icon_emoji"    =>  ":amp_logo:"
            ));
        
        // You can get your webhook endpoint from your Slack settings
        $ch = curl_init("https://hooks.slack.com/services/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");
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        curl_close($ch);
        
        return $result;
    }
    // Handle post data
    $errors = array();
    $response = array();
    if (empty($_POST['name']))
        $errors['name'] = 'Name is required';
    if (empty($_POST['email']))
    {
        $errors['email'] = 'Email is required';
    }
    if (empty($_POST['message']))
        $errors['message'] = 'A message is required';
    $name = htmlspecialchars($_POST['name']);
    $email = $_POST['email'];
    $message = htmlspecialchars($_POST['message']);
    
    if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL))
    {
        $errors['email_valid'] = 'Invalid email address';
    }
    if (empty($errors)) 
    {
        slack($name, $email, $message);
        $response['success'] = true;
        $response['success_text'] = 'Form submitted';
    } else {
        $response['success'] = false;
        $response['errors'] = $errors;
    }
    echo json_encode($response);
}
?>