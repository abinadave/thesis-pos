<!DOCTYPE html>
<html lang="en">
<head>
<title>PharmaSJP</title>
<meta charset="UTF-8" />
<meta id="token" value="{{ csrf_token() }}">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="assets/matrix/HTML/css/bootstrap.min.css" />
<link rel="stylesheet" href="assets/matrix/HTML/css/bootstrap-responsive.min.css" />
<link rel="stylesheet" href="assets/matrix/HTML/css/matrix-style.css" />
<link rel="stylesheet" href="assets/matrix/HTML/css/matrix-media.css" />
<link href="assets/matrix/HTML/font-awesome/css/font-awesome.css" rel="stylesheet" />
<link href='assets/matrix/HTML/css/open-sans.css'>
</head>
<body id="app">

<!--Header-part-->
<div id="header">
  <h1></h1>
</div>
<!--close-Header-part--> 

<!--top-Header-menu-->
<div id="user-nav" class="navbar navbar-inverse">
  <ul class="nav">
    <li  class="dropdown" id="profile-messages" ><a title="" href="#" data-toggle="dropdown" data-target="#profile-messages" class="dropdown-toggle"><i class="icon icon-user"></i>  <span class="text">Welcome {{ Auth::user()->name }}</span><b class="caret"></b></a>
    </li>
    <!-- <li class="dropdown" id="menu-messages"><a href="#" data-toggle="dropdown" data-target="#menu-messages" class="dropdown-toggle"><i class="icon icon-envelope"></i> <span class="text">Messages</span> <span class="label label-important">5</span> <b class="caret"></b></a>
      <ul class="dropdown-menu">
        <li><a class="sAdd" title="" href="#"><i class="icon-plus"></i> new message</a></li>
        <li class="divider"></li>
        <li><a class="sInbox" title="" href="#"><i class="icon-envelope"></i> inbox</a></li>
        <li class="divider"></li>
        <li><a class="sOutbox" title="" href="#"><i class="icon-arrow-up"></i> outbox</a></li>
        <li class="divider"></li>
        <li><a class="sTrash" title="" href="#"><i class="icon-trash"></i> trash</a></li>
      </ul>
    </li>  -->
    
    <li class=""><a title="" href="{{ url('/logout') }}"><i class="icon icon-share-alt"></i> <span class="text">Logout</span></a></li>
  </ul>
</div>

<div id="sidebar"><a href="#" class="visible-phone"><i class="icon icon-file"></i> Addons/a>
  <ul>
    <li class="submenu"> <a style="cursor: pointer"><i class="icon icon-home"></i> <span>Items</span> <span class="label label-important">2</span></a>
        <ul>
          <li><a v-link="{ name: 'list-of-items'   }">All Items</a></li>
        </ul>
    </li>
    <li class="submenu"> <a style="cursor: pointer"><i class="icon icon-home"></i> <span>Categories</span> <span class="label label-important">2</span></a>
        <ul>
          <li><a v-link="{ name: 'category-list'  }">All Categories</a></li>
        </ul>
    </li>
    <li><a v-link="{ name: 'purchases'  }"><i class="icon icon-th"></i> <span>Purchases</span></a></li>
  </ul>
</div>
<!--sidebar-menu-->

<div id="content">
  <div id="content-header">
    <div id="breadcrumb"> <a href="#" title="Go to Home" class="tip-bottom"><i class="icon-home"></i> Home</a> <a href="#" class="current">@{{ $route.name }}</a> 
    <label class="pull-right label label-info" style="margin-top: -30px;">
       {{ $branch_name }} Branch
    </label>
    </div>    
  </div>
  <div class="container-fluid">

    <div class="row-fluid">
        <router-view :user="{{ Auth::user() }}"></router-view>
    </div>
    
  </div>
</div>
.
<!--Footer-part-->
<div class="row-fluid">
  <div id="footer" class="span12"> 2016 &copy; PHARMA SEAN JOE POINT OF SALE SYSTEM</div>
</div>
<!--end-Footer-part-->

<script data-main="js/main-staff" src="js/libs/require.js"></script>
<script src="assets/matrix/HTML/js/jquery.min.js"></script> 
<script src="assets/matrix/HTML/js/jquery.ui.custom.js"></script> 
<script src="assets/matrix/HTML/js/bootstrap.min.js"></script> 
<script src="assets/matrix/HTML/js/matrix.js"></script> 
</body>
</html>
