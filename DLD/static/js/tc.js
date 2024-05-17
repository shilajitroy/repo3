$("document").ready(function(){
  rL();
});
 function customAlart(string, type, id){
    if($("#"+id).length){
        $("#"+id).remove();
    }
    $("body").prepend(`
        <!--alartr-->
        <div id="`+id+`" class="alert alert-`+type+` alert-dismissible fade show" role="alert">
            `+string+`
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
      `);
}
 function customTost(string, type, delay){
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-bottom-center",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": delay,
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "slideDown",
      "hideMethod": "slideUp"
    };

    if (type == 'danger') {
      type = 'error';
    }
    Command: toastr[type](string, "<img src='/static/img/logo.png' width='12%'> DLD");
}
    
 function navTabs(item,idString){
  var html =`
      <div class="">
          <div class="container-fluid">
            <div class="card mb-3">
              <div class="card-header bg-animeted4 text-light">
                <ul class="nav nav-tabs">`;
                for(var i = 0; i<item.length; i++){
                    var temp = item[i].replace(/ /g,'');
                    temp = idString + temp;
                      html+=`<li class="nav-item"><a class="nav-link `;
                       html+= (i==0)? "active" : "";
                      html+=`" href="#" id="`+temp+`"><i class="fa fa-table"></i> `+ item[i] +`</a></li>`;
                }
                html+=`</ul>
                </div>
                <div class="card-body table-responsive">
                  <div class="">

                  </div>
                </div>
              </div>
            </div>
        </div>`;

  $("#mainContent").html(html);
 }   
    
    
//Inport from tc fremwork model.js

//demo colling 
/*html = "test model";
customModal({
 data: html,
 showModel: true,
 id: 'demoModal',
 header: 'Demo MOdal',
 headerId: '',
 bodyId: '',
 footer: '',
 footerId: '',
 show: function(){
   alert('show');
 },
 hidden: function(){
   alert('hiden');
 }
});*/
function customModal(data){
  if(data.id == undefined && data.id =='')
    data.id = 'modelId';
  if(data.data == undefined)
    data.data='';
  if(data.showModel == undefined)
    data.showModel = true;
  if(data.html == undefined)
    data.html='';
  if(data.header == undefined)
    data.header='';
  if(data.headerId == undefined)
    data.headerId='';
  if(data.bodyId == undefined)
    data.bodyId='';
  if(data.footer == undefined)
    data.footer='';
  if(data.footerId == undefined)
    data.footerId='';
  if($("#"+data.id).length){
      $("#"+data.id).remove();
  }
  html=`
      <!-- Modal -->
      <div class="modal fade" id="`+data.id+`" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header" id='`+data.headerId+`'>
              <h5 class="modal-title" id="">`+data.header+`</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" id="`+data.bodyId+`">
              `+data.data+`
            </div>
            <div class="modal-footer" id="`+data.footerId+`">
              `+data.footer+`
            </div>
          </div>
        </div>
      </div>
    `;
  $("body").append(html);
  
  if(data.show != undefined && (typeof data.show == 'function'))
    $('#'+data.id).on('show.bs.modal',  function (e) {
      data.show();
    });
  if(data.hidden != undefined && (typeof data.show == 'function'))
    $('#'+data.id).on('hidden.bs.modal',  function (e) {
      data.hidden();
    });
  if(data.showModel){
    $('#'+data.id).modal('show');
  }

}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }
});

/*var tab = CreateTableFromJSON({
data: d,
heading: {
  "Yoga Name": '[[Yoga Name]]',
  "Yooga Id": '[[Yoga Id]]',
  "Edit": '<a href="#" class="btn btn-danger">[[yoga Name]]</a>',
  "delete": '<a href="#" class="btn btn-danger">[[id]]</a>'
},
tableAttribute : {
    class: "table table-striped",
    border: '1',
    cellspacing: '0',
    cellpadding: '5'
  }

});


var divContainer = document.getElementById("tc");
divContainer.innerHTML = "";
divContainer.appendChild(tab);*/

function setElementAttribut(name, attribute){
if(attribute != undefined){
  for(var atb in attribute){
    name.setAttribute(atb, attribute[atb]);
  }
}
}

function CreateTableFromJSON(data) {
// CREATE DYNAMIC TABLE.
var table = document.createElement("table");
if(data.tableAttribute != undefined)
  setElementAttribut(table, data.tableAttribute);

// CREATE TABLE HEAD .
var tHead = document.createElement("thead");
if(data.theadAttribute != undefined)
  setElementAttribut(tHead, data.theadAttribute);

// CREATE ROW FOR TABLE HEAD .
var hRow = document.createElement("tr");
if(data.theadTrAttribute != undefined)
  setElementAttribut(hRow, data.theadTrAttribute);

// ADD COLUMN HEADER TO ROW OF TABLE HEAD.
if(data.heading != undefined){
  for(var h in data.heading){
    var th = document.createElement("th");
    if(data.theadTrThAttribute != undefined)
      setElementAttribut(th, data.theadTrThAttribute);
    th.innerHTML = h;
    hRow.appendChild(th);
  }
}
tHead.appendChild(hRow);
table.appendChild(tHead);

// CREATE TABLE BODY .
var tBody = document.createElement("tbody");  
if(data.tBodyAttribute != undefined)
  setElementAttribut(tBody, data.tBodyAttribute);

// ADD COLUMN HEADER TO ROW OF TABLE HEAD.
for(var d in data.data) {

        var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .
        if(data.tBodyTrAttribute != undefined)
          setElementAttribut(bRow, {"id" : data.tBodyTrAttribute.id.replace(/\[\[([\w\s]+)\]\]/g, function (match, g1) { return data.data[d][g1] })});
          //alert(data.tBodyTrAttribute.id.replace(/\[\[([\w\s]+)\]\]/g, function (match, g1) { return data.data[d][g1] }));
        for(var h in data.heading){
            var td = document.createElement("td");
            td.innerHTML = data.heading[h].replace(/\[\[([\w\s]+)\]\]/g, function (match, g1) { return data.data[d][g1] });
            bRow.appendChild(td);
        }
        tBody.appendChild(bRow)

}
table.appendChild(tBody);
return table;
}


    function relodJs(src){
        $('script[src="' + src + '"]').remove();
        $.getScript(src);
    }
    
    function printDiv(divID) {
            //Get the HTML of div
            var divElements = document.getElementById(divID).innerHTML;
            //Get the HTML of whole page
            var oldPage = document.body.innerHTML;
            //Reset the page's HTML with div's HTML only
            document.body.innerHTML = 
              "<html><head><title></title></head><body>" + 
              divElements + "</body>";
            //Print Page
            window.print();
            //Restore orignal HTML
            document.body.innerHTML = oldPage;
        }

      function printDivLandscape(divID) {
            //Get the HTML of div
            var divElements = document.getElementById(divID).innerHTML;
            //Get the HTML of whole page
            var oldPage = document.body.innerHTML;
            //Reset the page's HTML with div's HTML only
            document.body.innerHTML = 
              "<html><head><title></title></head><body>" + 
              divElements + "</body>";

              var css = '@page { size: landscape; }',
                head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');

              style.type = 'text/css';
              style.media = 'print';

              if (style.styleSheet){
                style.styleSheet.cssText = css;
              } else {
                style.appendChild(document.createTextNode(css));
              }

            head.appendChild(style);

            //Print Page
            window.print();
            //Restore orignal HTML
            document.body.innerHTML = oldPage;
        }
      
    function customResult(){
        $("body").html(`<div id="mainHtml"></div>`);
        
        $("body #mainHtml").html(`
            <div class ="table-responsive">
                <style>
                    body {
                        background: #fff;
                    }

                    page {
                        background: white;
                        display: block;
                        margin: 0 auto;
                        margin-bottom: 0.5cm;
                        box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
                    }

                    page[size="A4"] {
                        width: 21cm;
                        height: 29.7cm;
                    }

                    page[size="A4"][layout="portrait"] {
                        width: 29.7cm;
                        height: 21cm;
                    }

                    page[size="A3"] {
                        width: 29.7cm;
                        height: 42cm;
                    }

                    page[size="A3"][layout="portrait"] {
                        width: 42cm;
                        height: 29.7cm;
                    }

                    page[size="A5"] {
                        width: 14.8cm;
                        height: 21cm;
                    }

                    page[size="A5"][layout="portrait"] {
                        width: 21cm;
                        height: 14.8cm;
                    }

                    @media print {

                        body,
                        page {
                            margin: 0;
                            box-shadow: 0;
                        }
                    }
                </style>
                <div size="A4" id="tc" class ="bg-light table-responsive">


                </div>
                <div id="tcBtn">


                </div>
                

            </div>
        `);
    }
    
    function customNave(data){
        if($("#customNave").length){
              $("#customNave").remove();
        }
        document.getElementById()
            var html = `<div id="customNave"><nav id="mainNav" class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                        <div class="sidebar-brand d-flex">
                        <div class="sidebar-brand-icon rotate-n-15">
                          <img src="img/logo_PNG.png" alt="" width='8%'> <font color='#fff' size='3'>DLD</font>
                        </div>
                      </div>
                <div class="navbar-brand"><h4 id="h4PageName"> </h4></div>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                  <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">`;
                  $.each(data, function(index, value){
                        html +=`<li class="nav-item" data-toggle="tooltip" data-placement="right" title="`+value.pageName+`">
                          <a class="nav-link" onclick="`+value.functionName+`()" href="#">
                            <i class="fas fa-`+value.icon+` fa-2x"></i>
                            <span class="nav-link-text">`+value.pageName+`</span>
                          </a>
                        </li>`;
                    });



                  html += `</ul>
                  <ul class="navbar-nav sidenav-toggler">
                    <li class="nav-item">
                      <a class="nav-link text-center" id="sidenavToggler">
                        <i class="fa fa-fw fa-angle-left"></i>
                      </a>
                    </li>
                  </ul>
                  <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                      <a class="nav-link" data-toggle="modal" data-target="#exampleModal">
                        <i class="fas fa-sign-out-alt"></i>Logout</a>
                    </li>
                  </ul>
                </div>
              </nav>
              <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                      <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <a class="btn btn-primary" href="#" onclick="logout()">Logout</a>
                      </div>
                    </div>
                  </div>
                </div>
                <br><br><br><br>
              
            </div>

        `;
        $("#heder").append(html);
        $('.navbar a').on('click', function(){
                if ($(window).width() < 992) {
                    $('.navbar-toggler').click();
                }
            });
        
    }
    
      

    function logout(){
      $.ajax({
              url: "Logout",
              type: "POST",
              dataType: 'json',
              contentType: false,
              processData: false,
              success: function(data){
                  window.location = ".";
              }
          });
    }








var form = $("#eventRegistationMainFrom").show();
 


function aL(){
  if (!$(".loader").length) {
    $("body").prepend(`<div class="loader"><center><div class="cm-spinner"><img src="/static/img/logo_PNG.png" alt="" width="80%"></div></center></div>`);
  }
}
function  rL() {
  $(".loader").remove();
}

function blinkText() {
    $('.blink').fadeOut(500);
    $('.blink').fadeIn(500);
    setTimeout(function(){ blinkText(); }, 2000);
}

function customBreadcrumb(functionWithParamiter, name, elementNo){
    $('.breadcrumb-item button').slice(0).removeAttr('disabled');
    $('.breadcrumb').append(`<li class="breadcrumb-item"><button class="btn btn-link" onclick="`+functionWithParamiter+`" disabled>`+name+`</button></li>`);
    $('.breadcrumb-item').slice(elementNo, $(".breadcrumb-item").index($('.breadcrumb-item').last())+1).remove();
    $('.breadcrumb-item button').last().attr('disabled', 'disabled');
}

function customResultN(d=""){

        $(".card-body").html(`
            <div class ="table-responsive">
                <style>
                    body {background: #fff;}

                    page {
                        background: white;
                        display: block;
                        margin: 0 auto;
                        margin-bottom: 0.5cm;
                        box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
                    }

                    page[size="A4"] {
                        width: 21cm;
                        height: 29.7cm;
                    }

                    page[size="A4"][layout="portrait"] {
                        width: 29.7cm;
                        height: 21cm;
                    }

                    page[size="A3"] {
                        width: 29.7cm;
                        height: 42cm;
                    }

                    page[size="A3"][layout="portrait"] {
                        width: 42cm;
                        height: 29.7cm;
                    }

                    page[size="A5"] {
                        width: 14.8cm;
                        height: 21cm;
                    }

                    page[size="A5"][layout="portrait"] {
                        width: 21cm;
                        height: 14.8cm;
                    }

                    @media print {

                        body,
                        page {
                            margin: 0;
                            box-shadow: 0;
                        }
                    }
                </style>
                <div size="A4" id="tc" class ="bg-light table-responsive">


                </div>
                <div id="tcBtn">


                </div>


            </div>
        `);
    }

    function customEWS(data){
      if(data.warning != undefined){
        customTost(data.warning, 'warning', 10000);
      }else if(data.error != undefined){
        customTost(data.error, 'error', 10000);
      }else if(data.success != undefined){
        customTost(data.success, 'success', 10000);
      }
    }