function chackAnySession(){
	$.ajax({
		url: "chackAnySession",
		type: "POST",
		dataType: 'json',
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login != undefined && data.login){
				index();
			}else{
				loginPage();
			}
		},
		error: function(){
			//chackAnySession();
		}
	});

}
chackAnySession();



//*****************Login Pages start ************
function loginPage(){
	$('#sideBar').html('');
	$('#naveBar').html('');
	$('#mainContent').html(`
		<div class="row justify-content-center">

		  <div class="col-xl-10 col-lg-12 col-md-9">

			<div class="card o-hidden border-0 shadow-lg my-5">
			  <div class="card-body p-0">
				<!-- Nested Row within Card Body -->
				<div class="row">
				  <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
				  <div class="col-lg-6">
					<div class="p-5">
					  <div class="text-center">
						<h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
					  </div>
					  <form class="user" onsubmit="event.preventDefault(); login(this)">
						<div class="form-group">
						  <input type="text" name='userId' class="form-control form-control-user" id="uderId" aria-describedby="emailHelp" placeholder="Enter user Id">
						</div>
						<div class="form-group">
						  <input type="password" name='password' class="form-control form-control-user" id="password" placeholder="Password">
						</div>
						<button type='submit' class="btn btn-primary btn-user btn-block">
						  Login
						</button>
					  </form>
					</div>
				  </div>
				</div>
			  </div>
			</div>

		  </div>

		</div>
		`);
}

function login(data){
	$.ajax({
		url: "login",
		type: "POST",
		dataType: 'json',
		data: new FormData(data),
		contentType: false,
		processData: false,
		success: function(data){
			if(data.warning != undefined)
				customTost(data.warning, 'warning', 5000, '');
			else if(data.error != undefined)
				customTost(data.error, 'error', 5000, '');
			else{
				customTost(data.success, 'success', 5000, '');
				index();
			}

		},
		error: function(){
			//login();
		}
	});
}

//*****************index pages Start ********
function index(){
	sideBar();
	naveBar();
	$('#mainContent').html('');
	$.getScript("/static/js/sb-admin-2.min.js");
	$.ajax({
		url: "",
		type: 'POST',
		dataType: 'JSON',
		contentType: false,
		processData: false,
		success: function(data){
		  rL();
			if(data.login){
			  var html = `
				<div class="row">
				  <div class="col-xl-3 col-lg-6">
					<div class="card card-inverse border-primary">
						<div class="card-header text-light bg-animeted1">
							<div class="row">
								<div class="col-3 text-sm-right">
									<i class="fas fa-file fa-4x"></i>
								</div>
								<div class="col-9 text-md-right">
									<div class="h2">`+data.noi+`</div>
									<div class="h4">Item</div>
								</div>
							</div>
						</div>
						<div class="card-footer bg-default">
							<button onclick="item()" class="row btn">
								<span class="text-md-left  text-primary col">View All</span>
								<span class="text-md-right  text-primary col"><i class="fa fa-arrow-circle-right"></i></span>
								<div class="clearfix"></div>
							</button>
						</div>
					</div>
				  </div>
  
				  <div class="col-xl-3 col-lg-6">
					<div class="card card-inverse border-secondary">
						<div class="card-header text-light bg-animeted2">
							<div class="row">
								<div class="col-3 text-sm-right">
									<i class="fas fa-user fa-4x"></i>
								</div>
								<div class="col-9 text-md-right">
									<div class="h2">`+data.nomi+`</div>
									<div class="h4">My Item</div>
								</div>
							</div>
						</div>
						<div class="card-footer bg-default">
							<button onclick="myItem()" class="row btn">
								<span class="text-md-left text-secondary col">View All</span>
								<span class="text-md-right text-secondary col"><i class="fa fa-arrow-circle-right"></i></span>
								<div class="clearfix"></div>
							</button>
						</div>
					</div>
				  </div>
  
				  <div class="col-xl-3 col-lg-6">
					<div class="card card-inverse border-warning">
						<div class="card-header text-light bg-animeted3">
							<div class="row">
								<div class="col-3 text-sm-right">
									<i class="fas fa-key fa-4x"></i>
								</div>
								<div class="col-9 text-md-right">
									<div class="h2">`+data.nopc+`</div>
									<div class="h4">Requested Pending Pascode</div>
								</div>
							</div>
						</div>
						<div class="card-footer bg-default">
							<button onclick="requestPascode()" class="row btn">
								<span class="text-md-left text-warning col">View All</span>
								<span class="text-md-right text-warning col"><i class="fa fa-arrow-circle-right"></i></span>
								<div class="clearfix"></div>
							</button>
						</div>
					</div>
				  </div>
  
				  <div class="col-xl-3 col-lg-6">
					<div class="card card-inverse border-info">
						<div class="card-header text-light bg-animeted4">
							<div class="row">
								<div class="col-3 text-sm-right">
									<i class="fas fa-tag fa-4x"></i>
								</div>
								<div class="col-9 text-md-right">
									<div class="h2">`+data.nopr+`</div>
									<div class="h4">Requestting Pascode</div>
								</div>
							</div>
						</div>
						<div class="card-footer bg-default">
							<button onclick="pascode()" class="row btn">
								<span class="text-md-left col text-info">View Details</span>
								<span class="text-md-right col text-info"><i class="fa fa-arrow-circle-right"></i></span>
								<div class="clearfix"></div>
							</button>
						</div>
					</div>
				  </div>
			    </div>
  
			<div class="row mt-2">
				<div class="col-lg-6">
				  <div class="card border-success mb-3">
					<div class="card-header bg-ani-green">New Item</div>
					<div class="card-body">
					  `+
						CreateTableFromJSON({
							data: data.itemTable,
							heading: {
							  "Id": '[[id]]',
							  "Item Name": '[[name]]',
							  "Upload By": '[[user]]',
							  "Option": `
								<div class="dropdown no-arrow">
									<button class="btn btn-sm btn-light dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
									</button>
									<div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
									<button class="dropdown-item" onclick="itemViewDetels([[id]])">View Details</button>
									<div class="dropdown-divider"></div>
									<div class="dropdown-header">Advance:</div>
									<button onclick="passcodeRecuest([[id]])" class="dropdown-item">Request Pass Code</button>
									<button onclick="downloadModel([[id]])" class="dropdown-item">Downlod</button>
									</div>
								</div>
							  `,
							},
							tableAttribute : {
								class: "table table-striped",
								id: "itemTable",
							}
							
						}).outerHTML
					  +`
					</div>
				  </div>
				</div>
				<div class="col-lg-6">
				  <div class="card border-info mb-3">
					<div class="card-header bg-ani-yellow">New My Item</div>
					<div class="card-body">
					  `+
					  CreateTableFromJSON({
						data: data.myItemTable,
						heading: {
						  "Id": '[[id]]',
						  "Item Name": '[[name]]',
						  "Upload By": '[[user]]',
						  "Option": `
							<div class="dropdown no-arrow">
								<button class="btn btn-sm btn-light dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
								</button>
								<div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
								<button class="dropdown-item" onclick="itemViewDetels([[id]])">View Details</button>
								<div class="dropdown-divider"></div>
								<div class="dropdown-header">Advance:</div>
								<button onclick="requestPassCod([[id]])" class="dropdown-item">Pas Code</button>
								<button onclick="downloadModel([[id]])" class="dropdown-item">Hide</button>
								<button onclick="downloadModel([[id]])" class="dropdown-item">Show</button>
								</div>
							</div>
						  `,
						},
						tableAttribute : {
							class: "table table-striped",
							id: "itemTable",
						}
						
					}).outerHTML
					+`
					</div>
				  </div>
				</div>
				<div class="col-lg-6">
				  <div class="card border-secondary mb-3">
					<div class="card-header bg-ani-pink">New Requested Pascode</div>
					<div class="card-body">
					  `+
					  CreateTableFromJSON({
						data: data.PascodeTable,
						heading: {
						  "Item Id": '[[itemId]]',
						  "Item Name": '[[name]]',
						  "User Id": '[[userId]]',
						  "Request By": '[[user]]',
						  "Option": `
							<div class="dropdown no-arrow">
								<button class="btn btn-sm btn-light dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
								</button>
								<div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
								<button class="dropdown-item" onclick="itemViewDetels([[id]])">View Details</button>
								<div class="dropdown-divider"></div>
								<div class="dropdown-header">Advance:</div>
								<button onclick="pascodeAccepted([[id]])" class="dropdown-item">Accepted</button>
								<button onclick="pascodeRegected([[id]])" class="dropdown-item">regected</button>
								</div>
							</div>
						  `,
						},
						tableAttribute : {
							class: "table table-striped",
							id: "itemTable",
						}
						
					}).outerHTML
					+`
					</div>
				  </div>
				</div>
				<div class="col-lg-6">
				  <div class="card border-success mb-3">
					<div class="card-header bg-ani-orange">New Request Pascode</div>
					<div class="card-body">
					  `+
					  CreateTableFromJSON({
						data: data.pascodeRequestTable,
						heading: {
						  "Id": '[[id]]',
						  "Item Name": '[[name]]',
						  "Upload By": '[[user]]',
						  "View": `<button onclick="pascodeView([[id]])" class="btn btn-success"><span class="fa fa-eye"></span></button>`,
						},
						tableAttribute : {
							class: "table table-striped",
							id: "itemTable",
						}
						
					}).outerHTML
					+`
					</div>
				  </div>
				</div>
				
			</div>
  
			  `;
			  $('#mainContent').html(html);
			}else{
				login();
			}
		}
	});
}

function sideBar(){
	$("#sideBar").html(`
		<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" >

	  <!-- Sidebar - Brand -->
	  <button class="btn sidebar-brand d-flex align-items-center justify-content-center" onclick="index()">
		<div class="sidebar-brand-icon">
		  <img src='/static/img/icon.png' width='30%'>
		</div>
		
	  </button>

	  <!-- Divider -->
	  <hr class="sidebar-divider my-0">

	  <!-- Nav Item - Dashboard -->
	  <li class="nav-item">
			<button class="nav-link btn" onclick="index()">
				<i class="fas fa-fw fa-tachometer-alt"></i>
				<span>Dashboard</span>
			</button>
	  </li>

	  <!-- Divider -->
	  <hr class="sidebar-divider">

		
	  <div id="roomList">
	  
	  </div>
	  <!-- this page made by chaku  Attendance-->
      <li class="nav-item">
		<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePresent"
			aria-expanded="true" aria-controls="collapseTwo">
			<i class="fas fa-fw fa-clipboard"></i>
			<span>My Item</span>
		</a>
		<div id="collapsePresent" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
			<div class="bg-white py-2 collapse-inner rounded">
			<button class="collapse-item btn" onclick="myItem()"><i class="fas fa-fw fa-table"></i>Table View</button>
			<button class="collapse-item btn" onclick="addItemPage()"><i class="fa fa-fw fa-edit"></i>Add</button>
			</div>
	   </div>
	  </li>
	  <li class="nav-item">
		<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePresent1"
			aria-expanded="true" aria-controls="collapseTwo">
			<i class="fas fa-fw fa-clipboard"></i>
			<span>Pascode Request</span>
		</a>
		<div id="collapsePresent1" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
			<div class="bg-white py-2 collapse-inner rounded">
			<button class="collapse-item btn" onclick="requestPascode()"><i class="fas fa-fw fa-pause"></i>Request</button>
			<button class="collapse-item btn" onclick="requestPascodeAccepeted()"><i class="fa fa-fw fa-play"></i>Accepted</button>
			<button class="collapse-item btn" onclick="requestPascodeRegected()"><i class="fa fa-fw fa-stop"></i>regected</button>
			</div>
	   </div>
	  </li>
	  

	  <li class="nav-item">
		<button class="nav-link btn" onclick="item()">
		  <i class="fas fa-fw fa-chart-area"></i>
		  <span>Item</span></button>
	  </li>

	  <li class="nav-item">
		<button class="nav-link btn" onclick="pascode()">
		  <i class="fas fa-fw fa-chart-area"></i>
		  <span>Pascode</span></button>
	  </li>
	  
	  <!-- Divider -->
	  <hr class="sidebar-divider d-none d-md-block">

	  <!-- Sidebar Toggler (Sidebar) -->
	  <div class="text-center d-none d-md-inline">
		<button class="rounded-circle border-0" id="sidebarToggle"></button>
	  </div>

	</ul>
	`);
	$.ajax({
		url: "roomList",
		type: "POST",
		dataType: 'json',
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				var html="";
				if(data.admin){
					html+=`
						<li class="nav-item">
							<button class="nav-link btn" onclick="dataLicakge()">
							  <i class="fas fa-fw fa-chart-area"></i>
							  <span>Data Lickage</span></button>
						  </li>
					`;
				}
				$('#roomList').html(html);
			}else{
				login();
			}
			
		},
		error: function(){
			login();
		}
	});
}
function naveBar(){
	$('#naveBar').html(`
		<nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

		  <!-- Sidebar Toggle (Topbar) -->
		  <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
			<i class="fa fa-bars"></i>
		  </button>

		 

		  <!-- Topbar Navbar -->
		  <ul class="navbar-nav ml-auto">

			<!-- Nav Item - Search Dropdown (Visible Only XS) -->
			<li class="nav-item dropdown no-arrow d-sm-none">
			  <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				<i class="fas fa-search fa-fw"></i>
			  </a>
			  <!-- Dropdown - Messages -->
			  <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
				<form class="form-inline mr-auto w-100 navbar-search">
				  <div class="input-group">
					<input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
					<div class="input-group-append">
					  <button class="btn btn-primary" type="button">
						<i class="fas fa-search fa-sm"></i>
					  </button>
					</div>
				  </div>
				</form>
			  </div>
			</li>

			

			<div class="topbar-divider d-none d-sm-block"></div>

			<!-- Nav Item - User Information -->
			<li class="nav-item dropdown no-arrow">
			  <a id="profileData" class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				<span class=" d-lg-inline text-gray-600 small"></span>
				<img class="img-profile rounded-circle" src="/media/images/user.svg">
			  </a>
			  <!-- Dropdown - User Information -->
			  <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
				<button class="dropdown-item" onclick='profilePage()'>
				  <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
				  Profile
				</button>
				<button class="dropdown-item" onclick='changePasswordModel()'>
				  <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
				  Password Change
				</button>
				<button class="dropdown-item" onclick=''>
				  <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
				  Activity Log
				</button>
				<div class="dropdown-divider"></div>
				<a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
				  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
				  Logout
				</a>
			  </div>
			</li>

		  </ul>

		</nav>
	`);
	$.ajax({
		url: "getUserInformation",
		type: "POST",
		dataType: 'json',
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				$('#profileData img').attr('src', data.img);
				$('#profileData span').html(data.firstName+' ');
			}else{
				loginPage();
			}
			
		},
		error: function(){
			login();
		}
	});
}

//*********************** Item Add **************************

function addItemPage(){
	$('#mainContent').html(`
		<form class="user" onsubmit="event.preventDefault(); addItem(this)" enctype='multipart/form-data'>
			<div class="form-group">
				<input type="text" name="name" class="form-control form-control-user" id="name" aria-describedby="emailHelp" placeholder="Name">
			</div>
			<div class="form-group">
				<input type="text" name="discption" class="form-control form-control-user" id="discption" aria-describedby="emailHelp" placeholder="Discption (max 1000)">
			</div>
			<div class="form-group">
				<input type="file" name="path" class="form-control form-control-user" id="path" aria-describedby="emailHelp">
			</div>
			<button type="submit" class="btn btn-primary btn-user btn-block">
			Add Item
			</button>
		</form>
	`);
}

function addItem(v){
	$.ajax({
		url: "addItem",
		type: "POST",
		dataType: 'json',
		data: new FormData(v),
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				customEWS(data);
				if(data.update){
					v.reset();
				}
			}else{
				loginPage();
			}
			
		},
		error: function(){
			customTost('Symthing is rong try agen later', 'warning', 5000);
		}
	});
}

//********************** Items **********************
function item(){
	$.ajax({
		url: "item",
		type: "POST",
		dataType: 'json',
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				customEWS(data);
				$('#mainContent').html(CreateTableFromJSON({
					data: data.table,
					heading: {
					  "Id": '[[id]]',
					  "Item Name": '[[name]]',
					  "Upload By": '[[user]]',
					  "Option": `
						<div class="dropdown no-arrow">
							<button class="btn btn-sm btn-light dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
							</button>
							<div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
							<button class="dropdown-item" onclick="itemViewDetels([[id]])">View Details</button>
							<div class="dropdown-divider"></div>
							<div class="dropdown-header">Advance:</div>
							<button onclick="passcodeRecuest([[id]])" class="dropdown-item">Request Pass Code</button>
							<button onclick="downloadModel([[id]])" class="dropdown-item">Downlod</button>
							</div>
						</div>
					  `,
					},
					tableAttribute : {
						class: "table table-striped",
						id: "itemTable",
					}
					
				}));
				$("#itemTable").DataTable();
			}else{
				loginPage();
			}
			
		},
		error: function(){
			customTost('Symthing is rong try agen later', 'warning', 5000);
		}
	});
}

//*************** Pascode Request ************* */

function passcodeRecuest(id){
	fd = new FormData();
	fd.append('id', id);
	$.ajax({
		url: "passcodeRecuest",
		type: "POST",
		dataType: 'json',
		data: fd,
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				customEWS(data);
			}else{
				loginPage();
			}
			
		},
		error: function(){
			customTost('Symthing is rong try agen later', 'warning', 5000);
		}
	});
}

//********************** My Items **********************
function myItem(){
	$.ajax({
		url: "myItem",
		type: "POST",
		dataType: 'json',
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				customEWS(data);
				$('#mainContent').html(CreateTableFromJSON({
					data: data.table,
					heading: {
					  "Id": '[[id]]',
					  "Item Name": '[[name]]',
					  "Upload By": '[[user]]',
					  "Option": `
						<div class="dropdown no-arrow">
							<button class="btn btn-sm btn-light dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
							</button>
							<div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
							<button class="dropdown-item" onclick="itemViewDetels([[id]])">View Details</button>
							<div class="dropdown-divider"></div>
							<div class="dropdown-header">Advance:</div>
							<button onclick="requestPassCod([[id]])" class="dropdown-item">Pas Code</button>
							<button onclick="downloadModel([[id]])" class="dropdown-item">Hide</button>
							<button onclick="downloadModel([[id]])" class="dropdown-item">Show</button>
							</div>
						</div>
					  `,
					},
					tableAttribute : {
						class: "table table-striped",
						id: "itemTable",
					}
					
				}));
				$("#itemTable").DataTable();
			}else{
				loginPage();
			}
			
		},
		error: function(){
			customTost('Symthing is rong try agen later', 'warning', 5000);
		}
	});
}
//********************** dataLicakge **********************
function dataLicakge(){
	$.ajax({
		url: "dataLicakge",
		type: "POST",
		dataType: 'json',
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				customEWS(data);
				$('#mainContent').html(CreateTableFromJSON({
					data: data.table,
					heading: {
					  "Id": '[[id]]',
					  "Item Id": '[[itemId]]',
					  "Item Name": '[[itemName]]',
					  "User Id": '[[userId]]',
					  "User Name": '[[userName]]',
					  "Date Time": '[[time]]',
					  
					  "Option": `
						<div class="dropdown no-arrow">
							<button class="btn btn-sm btn-light dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
							</button>
							<div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
							<button class="dropdown-item" onclick="itemViewDetels([[id]])">View Details</button>
							</div>
						</div>
					  `,
					},
					tableAttribute : {
						class: "table table-striped",
						id: "itemTable",
					}
					
				}));
				$("#itemTable").DataTable();
			}else{
				loginPage();
			}
			
		},
		error: function(){
			customTost('Symthing is rong try agen later', 'warning', 5000);
		}
	});
}


//*********************** Request Pascode */

function requestPascode(){
	$.ajax({
		url: "requestPascode",
		type: "POST",
		dataType: 'json',
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				customEWS(data);
				$('#mainContent').html(CreateTableFromJSON({
					data: data.table,
					heading: {
					  "Item Id": '[[itemId]]',
					  "Item Name": '[[name]]',
					  "User Id": '[[userId]]',
					  "Request By": '[[user]]',
					  "Option": `
						<div class="dropdown no-arrow">
							<button class="btn btn-sm btn-light dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
							</button>
							<div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
							<button class="dropdown-item" onclick="itemViewDetels([[id]])">View Details</button>
							<div class="dropdown-divider"></div>
							<div class="dropdown-header">Advance:</div>
							<button onclick="pascodeAccepted([[id]])" class="dropdown-item">Accepted</button>
							<button onclick="pascodeRegected([[id]])" class="dropdown-item">regected</button>
							</div>
						</div>
					  `,
					},
					tableAttribute : {
						class: "table table-striped",
						id: "itemTable",
					}
					
				}));
				$("#itemTable").DataTable();
			}else{
				loginPage();
			}
			
		},
		error: function(){
			customTost('Symthing is rong try agen later', 'warning', 5000);
		}
	});
}
//*********************** requestPascodeRegected */

function requestPascodeRegected(){
	$.ajax({
		url: "requestPascodeRegected",
		type: "POST",
		dataType: 'json',
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				customEWS(data);
				$('#mainContent').html(CreateTableFromJSON({
					data: data.table,
					heading: {
					  "Item Id": '[[itemId]]',
					  "Item Name": '[[name]]',
					  "User Id": '[[userId]]',
					  "Request By": '[[user]]',
					  "Option": `
						<div class="dropdown no-arrow">
							<button class="btn btn-sm btn-light dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
							</button>
							<div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
							<button class="dropdown-item" onclick="itemViewDetels([[id]])">View Details</button>
							<div class="dropdown-divider"></div>
							<div class="dropdown-header">Advance:</div>
							<button onclick="pascodeAccepted([[id]])" class="dropdown-item">Accepted</button>
							</div>
						</div>
					  `,
					},
					tableAttribute : {
						class: "table table-striped",
						id: "itemTable",
					}
					
				}));
				$("#itemTable").DataTable();
			}else{
				loginPage();
			}
			
		},
		error: function(){
			customTost('Symthing is rong try agen later', 'warning', 5000);
		}
	});
}
//*********************** requestPascodeAccepeted */

function requestPascodeAccepeted(){
	$.ajax({
		url: "requestPascodeAccepeted",
		type: "POST",
		dataType: 'json',
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				customEWS(data);
				$('#mainContent').html(CreateTableFromJSON({
					data: data.table,
					heading: {
					  "Item Id": '[[itemId]]',
					  "Item Name": '[[name]]',
					  "User Id": '[[userId]]',
					  "Request By": '[[user]]',
					  "Option": `
						<div class="dropdown no-arrow">
							<button class="btn btn-sm btn-light dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
							</button>
							<div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
							<button class="dropdown-item" onclick="itemViewDetels([[id]])">View Details</button>
							<div class="dropdown-divider"></div>
							<div class="dropdown-header">Advance:</div>
							<button onclick="pascodeRegected([[id]])" class="dropdown-item">regected</button>
							</div>
						</div>
					  `,
					},
					tableAttribute : {
						class: "table table-striped",
						id: "itemTable",
					}
					
				}));
				$("#itemTable").DataTable();
			}else{
				loginPage();
			}
			
		},
		error: function(){
			customTost('Symthing is rong try agen later', 'warning', 5000);
		}
	});
}

//******************* Pascode ********** */
function pascode(){
	$.ajax({
		url: "pascode",
		type: "POST",
		dataType: 'json',
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				customEWS(data);
				$('#mainContent').html(CreateTableFromJSON({
					data: data.table,
					heading: {
					  "Id": '[[id]]',
					  "Item Name": '[[name]]',
					  "Upload By": '[[user]]',
					  "View": `<button onclick="pascodeView([[id]])" class="btn btn-success"><span class="fa fa-eye"></span></button>`,
					},
					tableAttribute : {
						class: "table table-striped",
						id: "itemTable",
					}
					
				}));
				$("#itemTable").DataTable();
			}else{
				loginPage();
			}
			
		},
		error: function(){
			customTost('Symthing is rong try agen later', 'warning', 5000);
		}
	});
}

function pascodeView(id){
	fd = new FormData();
	fd.append('id', id);
	$.ajax({
		url: "pascodeView",
		type: "POST",
		dataType: 'json',
		data: fd,
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				customEWS(data);
				if(data.error == undefined){
					customModal({
						data: data.data,
						showModel: true,
						id: 'pascodeView',
						header: 'Pascode',
					});
				}
				
			}else{
				loginPage();
			}
			
		},
		error: function(){
			customTost('Symthing is rong try agen later', 'warning', 5000);
		}
	});
}

//*************** pascodeAccepted ************* */

function pascodeAccepted(id){
	fd = new FormData();
	fd.append('id', id);
	$.ajax({
		url: "pascodeAccepted",
		type: "POST",
		dataType: 'json',
		data: fd,
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				customEWS(data);
			}else{
				loginPage();
			}
			
		},
		error: function(){
			customTost('Symthing is rong try agen later', 'warning', 5000);
		}
	});
}

//*************** pascodeRegected ************* */

function pascodeRegected(id){
	fd = new FormData();
	fd.append('id', id);
	$.ajax({
		url: "pascodeRegected",
		type: "POST",
		dataType: 'json',
		data: fd,
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				customEWS(data);
			}else{
				loginPage();
			}
			
		},
		error: function(){
			customTost('Symthing is rong try agen later', 'warning', 5000);
		}
	});
}

//******************* Password Change *************************
function changePasswordModel(){
	var html = `
		<form class="user" onsubmit="event.preventDefault(); changePassword(this)">
			<div class="form-group">
				<input type="password" name="oldPassword" class="form-control form-control-user" id="oldPassword" aria-describedby="emailHelp" placeholder="Old Password">
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<input type="password" name="password" class="form-control form-control-user" id="password" placeholder="New Password">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input type="password" name="rePassword" class="form-control form-control-user" id="rePassword" placeholder="Ree Password">
					</div>
				</div>
			</div>
			
			<button type="submit" class="btn btn-primary btn-user btn-block">
			Change Password
			</button>
	</form>
	`;
	customModal({
		data: html,
		showModel: true,
		id: 'passwordChangeModel',
		header: 'Password Change',
   	});
}

function changePassword(v){
	$.ajax({
		url: "changePassword",
		type: "POST",
		dataType: 'json',
		data: new FormData(v),
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				customEWS(data);
				if(data.update){
					$('#passwordChangeModel').modal('hide');
				}
			}else{
				loginPage();
			}
			
		},
		error: function(){
			customTost('Symthing is rong try agen later', 'warning', 5000);
		}
	});
}

//********************* Download Item */
function downloadModel(id){
	var html = `
		<form class="user" onsubmit="event.preventDefault(); download(this)">
			<div class="form-group">
				<input type="hidden" value = "`+id+`" name = "itemId">
				<input type="password" name="pascode" class="form-control form-control-user" id="oldPassword" aria-describedby="emailHelp" placeholder="Pascode">
			</div>
			<button type="submit" class="btn btn-primary btn-user btn-block">
			<span class="fa fa-download"></span>
			</button>
	</form>
	`;
	customModal({
		data: html,
		showModel: true,
		id: 'downloadModel',
		header: 'Download Item',
   	});
}

function download(v){
	$.ajax({
		url: "download",
		type: "POST",
		dataType: 'json',
		data: new FormData(v),
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				customEWS(data);
				if(data.file != undefined){
					$('#downloadModel').modal('hide');
					fetch(window.location.origin + '/media/'+ data.file)
					.then(resp => resp.blob())
					.then(blob => {
						const url = window.URL.createObjectURL(blob);
						const a = document.createElement('a');
						a.style.display = 'none';
						a.href = url;
						
						a.download = data.file;
						document.body.appendChild(a);
						a.click();
						window.URL.revokeObjectURL(url);
					})
					.catch(() => customTost('sumthing is wring try agen later', 'warning', 5000));
				}
			}else{
				loginPage();
			}
			
		},
		error: function(){
			customTost('Symthing is rong try agen later', 'warning', 5000);
		}
	});
}

//************** Profile Picture ****************
function profilePage(){
	$.ajax({
		url: "getUserInformation",
		type: "POST",
		dataType: 'json',
		contentType: false,
		processData: false,
		success: function(data){
			if(data.login){
				html=`
					<style>
				    .label {
				      cursor: pointer;
				    }

				    .progress {
				      display: none;
				      margin-bottom: 1rem;
				    }

				    .alert {
				      display: none;
				    }

				    .img-container img {
				      max-width: 100%;
				    }
				    
				    .container {
				      margin: 20px auto;
				      max-width: 640px;
				    }

				    img {
				      max-width: 200px;
				    }

				    .cropper-view-box,
				    .cropper-face {
				      border-radius: 50%;
				    }
				  </style>


			  <div class="container">
    			<label class="label" data-toggle="tooltip" title="Change your avatar">
    				<center><img class="img-profile rounded-circle" style="height: 100%; width: 100%" id="avatar" src="`+data.img+`" alt="avatar"></center>
			      <input type="file" class="sr-only" id="input" name="image" accept="image/*">
			    </label>
			    <h1>`+data.firstName+` `+data.lastName+`</h1>
			    <div class="progress">
			      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
			    </div>
			    <div class="alert" role="alert"></div>
			    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
			      <div class="modal-dialog" role="document">
			        <div class="modal-content">
			          <div class="modal-header">
			            <h5 class="modal-title" id="modalLabel">Crop the image</h5>
			            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			              <span aria-hidden="true">&times;</span>
			            </button>
			          </div>
			          <div class="modal-body">
			            <div class="img-container">
			              <img style="max-height: 50%; width: auto" id="image" src="">
			            </div>
			          </div>
			          
			          <div class="modal-footer">
			            <div class="row" id="actions">
			              <div class="col-md-9 docs-buttons">
			                <!-- <h3>Toolbar:</h3> -->
			                <div class="btn-group">
			                  <button type="button" class="btn btn-primary" data-method="rotate" data-option="-45" title="Rotate Left">
			                    <span class="docs-tooltip" data-toggle="tooltip" title="cropper.rotate(-45)">
			                      <span class="fa fa-undo-alt"></span>
			                    </span>
			                  </button>
			                  <button type="button" class="btn btn-primary" data-method="rotate" data-option="45" title="Rotate Right">
			                    <span class="docs-tooltip" data-toggle="tooltip" title="cropper.rotate(45)">
			                      <span class="fa fa-redo-alt"></span>
			                    </span>
			                  </button>
			                </div>

			                <div class="btn-group">
			                  <button type="button" class="btn btn-primary" data-method="scaleX" data-option="-1" title="Flip Horizontal">
			                    <span class="docs-tooltip" data-toggle="tooltip" title="cropper.scaleX(-1)">
			                      <span class="fa fa-arrows-alt-h"></span>
			                    </span>
			                  </button>
			                  <button type="button" class="btn btn-primary" data-method="scaleY" data-option="-1" title="Flip Vertical">
			                    <span class="docs-tooltip" data-toggle="tooltip" title="cropper.scaleY(-1)">
			                      <span class="fa fa-arrows-alt-v"></span>
			                    </span>
			                  </button>
			                </div>
			              </div>
			            </div>
			            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
			            <button type="button" class="btn btn-primary" id="crop">Crop</button>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
				`;
		
				$('#mainContent').html(html);
				profilePicUplod();
			}else{
				login();
			}
			
		},
		error: function(){
			login();
		}
	});
}

function profilePicUplod() {
  var avatar = document.getElementById('avatar');
  var image = document.getElementById('image');
  var input = document.getElementById('input');
  var $progress = $('.progress');
  var $progressBar = $('.progress-bar');
  var $alert = $('.alert');
  var $modal = $('#modal');
  var cropper;
  input = $("#input");
  $('[data-toggle="tooltip"]').tooltip();

  input.change( function (e) {
    var files = e.target.files;
    var done = function (url) {
      input.value = '';
      image.src = url;
      $alert.hide();
      $modal.modal('show');
    };
    var reader;
    var file;
    var url;

    if (files && files.length > 0) {
      file = files[0];

      if (URL) {
        done(URL.createObjectURL(file));
      } else if (FileReader) {
        reader = new FileReader();
        reader.onload = function (e) {
          done(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
    
    
    
    var options = {
    aspectRatio: 1 / 1,
    viewMode: 2,
    preview: '.img-preview'
  };
    
    
    // Methods
    actions.querySelector('.docs-buttons').onclick = function (event) {
      var e = event || window.event;
      var target = e.target || e.srcElement;
      var cropped;
      var result;
      var input;
      var data;

      if (!cropper) {
        return;
      }

      while (target !== this) {
        if (target.getAttribute('data-method')) {
          break;
        }

        target = target.parentNode;
      }

      if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
        return;
      }

      data = {
        method: target.getAttribute('data-method'),
        target: target.getAttribute('data-target'),
        option: target.getAttribute('data-option') || undefined,
        secondOption: target.getAttribute('data-second-option') || undefined
      };

      cropped = cropper.cropped;

      if (data.method) {
        if (typeof data.target !== 'undefined') {
          input = document.querySelector(data.target);

          if (!target.hasAttribute('data-option') && data.target && input) {
            try {
              data.option = JSON.parse(input.value);
            } catch (e) {
              console.log(e.message);
            }
          }
        }

        switch (data.method) {
          case 'rotate':
            if (cropped && options.viewMode > 0) {
              cropper.clear();
            }

            break;

          case 'getCroppedCanvas':
            try {
              data.option = JSON.parse(data.option);
            } catch (e) {
              console.log(e.message);
            }

            if (uploadedImageType === 'image/jpeg') {
              if (!data.option) {
                data.option = {};
              }

              data.option.fillColor = '#fff';
            }

            break;
        }

        result = cropper[data.method](data.option, data.secondOption);

        switch (data.method) {
          case 'rotate':
            if (cropped && options.viewMode > 0) {
              cropper.crop();
            }

            break;

          case 'scaleX':
          case 'scaleY':
            target.setAttribute('data-option', -data.option);
            break;

          case 'destroy':
            cropper = null;

            if (uploadedImageURL) {
              URL.revokeObjectURL(uploadedImageURL);
              uploadedImageURL = '';
              image.src = originalImageURL;
            }

            break;
        }

        if (typeof result === 'object' && result !== cropper && input) {
          try {
            input.value = JSON.stringify(result);
          } catch (e) {
            console.log(e.message);
          }
        }
      }
    };
    
    
    
  });

  $modal.on('shown.bs.modal', function () {
    cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 3,
    });
  }).on('hidden.bs.modal', function () {
    cropper.destroy();
    cropper = null;
  });

  $('#crop').on('click', function () {
    var initialAvatarURL;
    var canvas;

    $modal.modal('hide');

    if (cropper) {
      canvas = cropper.getCroppedCanvas({
        width: 360,
        height: 360,
      });
      initialAvatarURL = avatar.src;
      avatar.src = canvas.toDataURL();
      $progress.show();
      $alert.removeClass('alert-success alert-warning');
      canvas.toBlob(function (blob) {
        var formData = new FormData();

        formData.append('pp', blob, 'pp.jpg');
         
        
       $.ajax('/profilePicUplod', {
          method: 'POST',
          data: formData,
          processData: false,
          contentType: false,

          xhr: function () {
            var xhr = new XMLHttpRequest();

            xhr.upload.onprogress = function (e) {
              var percent = '0';
              var percentage = '0%';

              if (e.lengthComputable) {
                percent = Math.round((e.loaded / e.total) * 100);
                percentage = percent + '%';
                $progressBar.width(percentage).attr('aria-valuenow', percent).text(percentage);
              }
            };

            return xhr;
          },

          success: function () {
            $alert.show().addClass('alert-success').text('Upload success');
            naveBar();
          },

          error: function () {
            avatar.src = initialAvatarURL;
            $alert.show().addClass('alert-warning').text('Upload error');
          },

          complete: function () {
            $progress.hide();
          },
        });
      });
    }
  });
}

//*************** logout ***********
function logout(){
	$.ajax({
		url: "logout",
		type: "POST",
		dataType: 'json',
		contentType: false,
		processData: false,
		success: function(data){
			if(data.warning != undefined)
				customTost(data.warning, 'warning', 5000, '');
			else{
				customTost(data.success, 'success', 5000, '');
				loginPage();
			}

		},
		error: function(){
			//login();
		}
	});
}

//***************** Room Page start **************
function customBulbBtn(data){
	
}

function roomPage(roomId){

}