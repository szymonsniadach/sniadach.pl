<?php

$mail;
$mailCopy;

if (($_POST['name'] != '') && ($_POST['email'] != '') && ($_POST['message'] != '')) {

    $header  = 'MIME-Version: 1.0' . "\r\n";
    $header .= "Content-type: text/html; charset=UTF-8" . "\r\n";
    $header .= 'FROM: '.$_POST['name']." <".$_POST['email'].">\r\n";

    $msg = "<html>
            <body style=\"font-family: Arial\">
                <h4>Wiadomość ze strony sniadach.pl</h4>
                Telefon: {$_POST['phone']} <br>
                {$_POST['name']} w formularzu kontaktowym napisał następującą wiadomość:<br>
                <pre style=\"color:#228CE8\">{$_POST['message']}</pre>
            </body>
            </html>";

    $mail = mail("sz.sniadach@wp.pl", "Wiadomość ze strony sniadach.pl", $msg, $header);


    $header  = 'MIME-Version: 1.0' . "\r\n";
    $header .= "Content-type: text/html; charset=UTF-8" . "\r\n";
    $header .= 'FROM: Szymon Śniadach <sz.sniadach@wp.pl>' . "\r\n";
        
    $date = date("d.m.Y");
        
    $msg = "<html>
            <body style=\"font-family: Arial\">
                <h4>Twoja wiadomość została wysłana!</h4>
                W dniu {$date} została wysłana wiadomość do sz.sniadach@wp.pl <br>
                Poniżej treść Twojej wiadomości:<br>
                <pre style=\"color:#228CE8\">{$_POST['message']}</pre>
            </body>
            </html>";
        
    $mailCopy = mail($_POST['email'], "Kopia wiadomości ze strony sniadach.pl", $msg, $header);

}

if ($mail && $mailCopy) {
    echo "success";
}else{
    echo "invalid";
}

?>