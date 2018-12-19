<html>
<head><title>Expire the cookies </title>
</head>
<body>

<?php
// Expire the cookie
$cookie_name = "UMUCGamer";
if(isset($_COOKIE[$cookie_name])) {
 setcookie( $cookie_name, "", time() - 3600, "/" );
 echo "Expiring the cookie: " . $cookie_name;
}
else {
 echo "Cookie not found to expire ";
}


?>
<h2> Thanks for playing with PHP cookies </h2>
</body>
</html>