<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullName = htmlspecialchars($_POST['full_name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $consent = isset($_POST['consent']) ? 'Ano' : 'Ne';

    $to = "tyna.proklidnekojeni@gmail.com";
    // $to = "daniel.hanak.89@gmail.com";
    $subject = "Nová zpráva z kontaktního formuláře";

    // HTML body
    $body = "
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>$subject</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333333;
                line-height: 1.5;
            }
            .container {
                background-color: #e7f1f3;
                padding: 20px;
                border-radius: 8px;
            }
            h1 {
                color: #074450;
                font-weight: 500;
            }
            p {
                margin: 10px 0;
            }
            .name {
                font-weight: 700;
            }
            .label {
                font-weight: 600;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <h1><span class='name'>$fullName</span> potřebuje pomoci</h1>
            <p><span class='label'>Zpráva:</span><br>" . nl2br($message) . "</p>
            <p><span class='label'>Souhlas se zpracováním dat:</span> $consent</p>
        </div>
    </body>
    </html>";

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8\r\n";
    $headers .= "From: info@lptyna.cz\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers, "-f $to")) {
        $status = "success";
        $message = urlencode("Zpráva byla úspěšně odeslána.");
    } else {
        $status = "error";
        $message = urlencode("Odeslání zprávy se nezdařilo. Zkuste to prosím znovu.");
    }

    header("Location: /index.html?status=$status&message=$message");
    exit;
} else {
    echo "Formulář nebyl správně odeslán.";
}
