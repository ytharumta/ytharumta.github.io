document.addEventListener("DOMContentLoaded",function(){
  //active sidebar nav
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status != 200) return;
     
          // Muat daftar tautan menu
          document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
            elm.innerHTML = xhttp.responseText;
          });
     
          // Daftarkan event listener untuk setiap tautan menu
          document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
            elm.addEventListener("click", function(event) {
              // Tutup sidenav
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();
     
              // Muat konten halaman yang dipanggil
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
        }
      };
      xhttp.open("GET", "nav.html", true);
      xhttp.send();
    }

  //load page content
  var page = window.location.hash.substr(1);
  if(page =="") page = "home";
  loadPage(page);

  function loadPage(page){
      // var xhttp = new XMLHttpRequest();
      // xhttp.onreadystatechange = function(){
      //     if (this.readyState == 4){
      //         var content = document.querySelector("#body-content");
      //         if(this.status == 200){
      //             content.innerHTML = xhttp.responseText;
      //         }else if (this.status == 404){
      //             content.innerHTML = "<p>Halaman tidak ditemukan</p>";
      //         }else{
      //             content.innerHTML = "<p>Ups.. Halaman tidak dapat diakses.</p>";
      //         }
      //     }
      // };
      // xhttp.open("GET", "pages/"+page+".html",true);
      // xhttp.send();
      if (page == "home"){
        getKlasemen();
      }else if (page == "matches"){
        getMatches();
      }else if(page == "teams"){
        getTeams();
      }else if(page == "favorites"){
        getFavorites();
      }
  }
});