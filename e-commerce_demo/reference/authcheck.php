<html>
	<head>
	   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	    <title>User Authenticate </title>
	</head>
	<body> 

	<?php

		// Retrieve Post Data
		$username = $_POST["username"];
		$email = $_POST["emailadd"];
		 // Set the session information
		session_start();  
		$_SESSION['appusername'] = $username; 
		$_SESSION['appemail'] = $email;
			 
	 	// Display the Session information
	 	echo "<h3> Session Data  </h3>";
		echo "<table border='1'>";
		echo "<tr>
		        <td>Username </td>
		        <td> Email </td>
		      </tr>";
		echo "<tr>
		        <td>" . $_SESSION['appusername'] . "</td>";
		echo  "<td>" . $_SESSION['appemail']. "</td>";
		echo   "</tr>";     
		echo "</table>";      
				           
		// Provide a button to logout

		echo "<form name='logout' method='post' action='logout.php'> 
		<input name='btnsubmit' type='submit' value='Logout'> 
		</form>";	  
		
	?>
	</body>
</html>