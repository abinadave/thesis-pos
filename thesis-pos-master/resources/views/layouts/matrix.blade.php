<!DOCTYPE html>
<html lang="en">
    
<head>
	<title>Matrix Admin</title>
	<meta charset="UTF-8" />
	<meta id="token" value="{{ csrf_token() }}">
	<link rel="stylesheet" href="assets/matrix/HTML/css/bootstrap.min.css" />
	<link rel="stylesheet" href="assets/matrix/HTML/css/bootstrap-responsive.min.css" />
    <link rel="stylesheet" href="assets/matrix/HTML/css/matrix-login.css" />
    <link href="assets/matrix/HTML/font-awesome/css/font-awesome.css" rel="stylesheet" />
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,800' rel='stylesheet' type='text/css'>
</head>
<body>


@yield('content')

<script src="assets/matrix/HTML/js/jquery.min.js"></script> 
<script src="assets/matrix.login.js"></script> 
</body>
</html>
