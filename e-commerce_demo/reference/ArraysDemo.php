<!-- PHP and Arrays
 Date: Jan 01, XXXX
 Author: Dr. Robertson
 Title: ArraysDemo.php
 description: Demo how to use Arrays in PHP
 -->
 <!DOCTYPE html>
<html>
<head>
  <title>Arrays Demo</title>
</head>
<body>
<h1>PHP Arrays Demo </h1>
<?php
// Create a simple array of numbers
$numbers = array( 11,43,4,5,7,10);

echo "<h3> Current Numbers </h3>";
// Create a table and display the numbers

echo "<table border='1'>";
 foreach ( $numbers as $val ) {
    echo "<tr>";
    echo "<td>$val</td>";
    echo "</tr>";    
  }
echo "</table>";

// Sort the array
sort($numbers);

echo "<h3> Sorted Numbers </h3>";
// Create a table and display the numbers

echo "<table border='1'>";
 foreach ( $numbers as $val ) {
    echo "<tr>";
    echo "<td>$val</td>";
    echo "</tr>";    
  }
echo "</table>";

// Create an Associate array
// Multi-dimensional array
$gpa=array(
       array(
         "student"=>"Joe Smith",
          "grade" =>"A"
       ),
       array(
         "student"=>"Mary Jones",
          "grade" =>"A"
       ),
        array(
         "student"=>"John Perry",
          "grade" =>"C"
       ),
     );


// Display the Student Data
echo "<h3> Student data </h3>";
echo "<table border='1'>";
echo "<tr>
        <td>Student Name </td>
        <td> Current Grade </td>
      </tr>";
// Loop through each dimension of the array
foreach ( $gpa as $g ) {
    
    echo "<tr>";
    foreach ( $g as $value ) {
      echo "<td>$value</td>";
    }

    echo "</tr>";
  }
echo "</tr>";  
echo "</table>";

// Sort the Associative Array
sort($gpa);

// Display the Sorted Student Data
echo "<h3> Sorted Student data </h3>";
echo "<table border='1'>";
echo "<tr>
        <td>Student Name </td>
        <td> Current Grade </td>
      </tr>";
// Loop through each dimension of the array
foreach ( $gpa as $g ) {
    
    echo "<tr>";
    foreach ( $g as $value ) {
      echo "<td>$value</td>";
    }

    echo "</tr>";
  }
echo "</tr>";  
echo "</table>";

?>

</body>
</html>
