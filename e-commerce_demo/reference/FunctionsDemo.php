<!-- PHP and Functions
 Date: Jan 01, XXXX
 Author: Dr. Robertson
 Title: FunctionsDemo.php
 description: Demo how to use Functions in PHP
 -->
 <!DOCTYPE html>
<html>
<head>
  <title>Functions Demo </title>
</head>
<body>
<h1>PHP Functions Demo </h1>
<?php
// Create a simple array of Degrees
    $numbers = array( 15,30,45,75,90);

    echo "<h3> Example PHP Functions </h3>";
    // Create a table and display the numbers

    echo "<table border='1'>";
    echo "<tr>
            <th>Degree </th>
            <th> Sqrt(Degree) </th>
            <th> sin(Degree) </th>
            <th> cos(Degree) </th>
            <th> tan(Degree) </th>
            <th> cubeIt(Degree) </th>
          </tr>";
     foreach ( $numbers as $val ) {
        echo "<tr>";
        echo "<td>" . $val . "</td>";
        echo "<td>" . sqrt($val). "</td>";
        echo "<td>" . sin(deg2rad($val)). "</td>";
        echo "<td>" . cos(deg2rad($val)). "</td>";
        echo "<td>" . tan(deg2rad($val)). "</td>";
        echo "<td>" . cubeIt($val). "</td>";
        echo "</tr>";    
      }
    echo "</table>";

    // Simple Cube function
    // Return the cube of the input value
     function cubeIt($val) {     
         return $val*$val*$val;
        }

    ?>

</body>
</html>
