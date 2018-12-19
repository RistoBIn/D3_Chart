<!-- HTML Forms with Post Submit
 Date: Jan 01, XXXX
 Author: Dr. Robertson
 Title: post_Submit.php
 description: Demo how to retrieve Form data
 -->
<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <title>Get Form Echo</title>
</head>

<body> 

<?php
	// Retrieve Data using Post method
	$fname = $_POST["fname"];	
	$lname = $_POST["lname"];
        $mypassword = $_POST["mypass"];

        // Display in a table      
       echo "<h3> Form Data </h3>";
       echo "<table border='1'>";
       echo "<tr>
             <th>Firstname</th>
             <th>Lastname</th>
             <th>Password</th>
             </tr>";
       echo "<tr>
             <td>$fname</td>
             <td>$lname</td>
            <td>$mypassword</td>
             </tr>";
       echo "</table>";        
	
?>
</body>
</html>