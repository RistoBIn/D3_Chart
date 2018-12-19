<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	   	<title>Form Login</title>
	   	<link rel="stylesheet" type="text/css" href="./css/bootstrap.min.css">
    	<link rel="stylesheet" type="text/css" href="./css/style.css">
	</head>

	<body>
		<div class="col-sm-12" style="text-align: center">
			<h4>Enter your Username and Email Address to continue</h4> 
		</div>
		<form class="form-horizontal col-sm-offset-4 col-sm-4 col-sm-offset-4" name="main" method="post" action="product.php" > 
			<div class="formgroup" style="padding-bottom: 40px; padding-top: 40px"> 
				<label class="col-sm-4">Username:</label> 
				<input class="col-sm-8" name="username" type="text" size="50" required> 
			</div>
			<div class="formgroup" style="padding-bottom: 40px"> 
				<label class="col-sm-4">Email Address:</label>
				<input class="col-sm-8" name="emailadd" type="email" size="50" required> 
			</div>
			<div class="formgroup" style="padding-bottom: 40px"> 
				<label class="col-sm-4" >Password:</label> 
				<input class="col-sm-8" name="emailadd" type="text" size="50" required> 
			</div> 
			<div class="formgroup" style="padding-bottom: 40px; text-align: center;"> 
				<td colspan="2" align="center"><input name="btnsubmit" type="submit" value="Login"> 
			</div>
		</form>	
	</body>
</html> 
