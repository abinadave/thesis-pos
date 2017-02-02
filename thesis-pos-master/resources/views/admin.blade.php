<!DOCTYPE html>
<html lang="en">
<head>
<title>Matrix Admin</title>
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
  <!-- <h1><a href="dashboard.html">Matrix Admin</a></h1> -->
  <h2 style="padding: 20px; color: yellow">PharmaS<span style="color: lightblue">JP</span></h2>
  <!-- <h2 style="padding: 20px; color: blue">JSP</h2> -->
</div>
<!--close-Header-part--> 

<!--top-Header-menu-->
<div id="user-nav" class="navbar navbar-inverse">
  <ul class="nav">
    <li  class="dropdown" id="profile-messages" ><a title="" href="#" data-toggle="dropdown" data-target="#profile-messages" class="dropdown-toggle"><i class="icon icon-user"></i>  <span class="text">Welcome {{ Auth::user()->name }}</span></a>
      <!-- <ul class="dropdown-menu"> -->
        <!-- <li><a href="#"><i class="icon-user"></i> My Profile</a></li> -->
        <!-- <li class="divider"></li> -->
        <!-- <li><a href="#"><i class="icon-check"></i> My Tasks</a></li> -->
        <!-- <li class="divider"></li> -->
        <!-- <li><a href="login.html"><i class="icon-key"></i> Log Out</a></li> -->
      <!-- </ul> -->
    </li>
    <!-- <li class=""><a title="" href="#"><i class="icon icon-cog"></i> <span class="text">Settings</span></a></li> -->
    <li class=""><a title="" href="{{ url('/logout') }}"><i class="icon icon-share-alt"></i> <span class="text">Logout</span></a></li>
  </ul>
</div>
<!-- <div id="search">
  <input type="text" placeholder="Search here..."/>
  <button type="submit" class="tip-bottom" title="Search"><i class="icon-search icon-white"></i></button>
</div> -->
<!--close-top-serch-->
<!--sidebar-menu-->
<div id="sidebar"><a href="#" class="visible-phone"><i class="icon icon-file"></i> Addons/a>
  <ul>
    <li class="submenu"> <a href="#"><i class="icon icon-home"></i> <span>Branches</span> <span class="label label-important">2</span></a>
      <ul>
        <li><a v-link="{ name: 'create-branch' }">Create branch</a></li>
        <li><a v-link="{ name: 'branch-list'   }">All branches</a></li>
      </ul>
    </li>
    <li class="submenu"> <a href="#"><i class="icon icon-user"></i> <span>Staff</span> <span class="label label-important">3</span></a>
      <ul>
        <li><a v-link="{ name: 'create-staff' }">Create staff</a></li>
        <li><a v-link="{ name: 'staff-list'   }">All staff</a></li>
        <li><a v-link="{ name: 'trashed-staff'   }">Trashed</a></li>
      </ul>
    </li>
    <li class="submenu"> <a href="#"><i class="icon icon-barcode"></i> <span>Inventory</span> <span class="label label-important">4</span></a>
      <ul>
        <li><a v-link="{ name: 'create-product'  }">Create item</a></li>
        <li><a v-link="{ name: 'list-of-products'    }">All item</a></li>
        <li><a v-link="{ name: 'expiration' }" >Expirations</a></li>
        <li><a v-link="{ name: 'trashed-products'}">Trashed</a></li>
      </ul>
    </li>
    <li>
      <a v-link="{ name: 'bg-type-generic'}"><i class="icon icon-tint"></i> 
        <span>
          Generic 
          (
             @{{ genericItemLength }}
          )
        </span>
      </a>
    </li>
    <li><a v-link="{ name: 'bg-type-branded'}"><i class="icon icon-tint"></i> <span>Branded
          (
             @{{ brandedItemLength }}
          )
    </span></a></li>
    <li class="submenu"> <a href="#"><i class="icon icon-bar-chart"></i> <span>Reports</span> <span class="label label-important">2</span></a>
      <ul>
        <li><a v-link="{ name: 'reports-receiving'  }"><i class="icon icon-plus"></i>&nbsp;&nbsp;&nbsp; Incomming</a></li>
        <li><a v-link="{ name: 'reports-outgoing'  }"><i class="icon icon-minus"></i>&nbsp;&nbsp;&nbsp; Outgoing</a></li>
      </ul>
    </li>
    <li class="submenu"> <a href="#"><i class="icon icon-barcode"></i> <span>Category</span> <span class="label label-important">2</span></a>
      <ul>
        <li><a v-link="{ name: 'create-category'  }">Create Category</a></li>
        <li><a v-link="{ name: 'category-list'    }">All Category</a></li>
      </ul>
    </li>
    <li>
      <a v-link="{ name: 'system-logs'}"><i class="icon icon-group"></i> 
          Userlogs
      </a>
    </li>
  </ul>
</div>
<!--sidebar-menu-->

<div id="content">
  <div id="content-header">
    <div id="breadcrumb"> <a href="#" title="Go to Home" class="tip-bottom"><i class="icon-home"></i> Home</a> <a href="#" class="current">@{{ $route.name }}</a> </div>    
  </div>
  <div class="container-fluid">

    <div class="row-fluid">
        <router-view
            :generic-item-length.sync="genericItemLength"
            :branded-item-length.sync="brandedItemLength"
        ></router-view>
    </div>
    
  </div>
</div>

<!--Footer-part-->
<div class="row-fluid">
  <div id="footer" class="span12"> 2016 &copy; PHARMA SEAN JOE POINT OF SALE SYSTEM</div>
</div>
<!--end-Footer-part-->

<script data-main="js/main-admin" src="js/libs/require.js"></script>
<script src="assets/matrix/HTML/js/jquery.min.js"></script> 
<script src="assets/matrix/HTML/js/jquery.ui.custom.js"></script> 
<script src="assets/matrix/HTML/js/bootstrap.min.js"></script> 
<script src="assets/matrix/HTML/js/matrix.js"></script> 
</body>
</html>
