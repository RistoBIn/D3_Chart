<!-- PHP and Cookies
 Date: Jan 01, XXXX
 Author: Dr. Robertson
 Title: Demo_Cookies.php
 description: Demo how to use Cookies with PHP
 -->
 <!DOCTYPE html>
<html>
	<head>
	  <title>Cookies Demo </title>
	</head>
	<body>
		<h1>PHP Cookies Demo </h1>
		<?php
		$cookie_name = "UMUCGamer";
		$cookie_value = "CMSC325";
		// Set cookie for 7 days
		setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); 
		// Check for cookie
		if(!isset($_COOKIE[$cookie_name])) {
		    echo $cookie_name . "," . $cookie_value . "' is not set!";
		} else {
		    echo "Welcome back" . $cookie_name . "-" . $_COOKIE[$cookie_name];
		    
		}

		?>
		</br>
	
		<!-- Form to expire cookie -->
		<form action="expireCookie.php" method="post">
		    <input type="submit" value="Expire Cookie">
		</form> 


	</body>
</html> 