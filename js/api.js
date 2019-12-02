const KEY = 'da549c40c8854d4792bb3867290acc69';
const ID = 2001;
var base_url = "https://api.football-data.org/v2/"
var klasemenU = `${base_url}competitions/${ID}/standings`;
var matchesU = `${base_url}competitions/${ID}/matches?status=SCHEDULED`;
var teamsU = `${base_url}competitions/${ID}/teams`;

//Public Data match & team
var dataMatch;
var dataTeam;

function status(response){
  if(response.status !== 200){
    console.log("Error : " + response.status);
    //mehtod reject() akan membuat block catch terpanggil 
    return Promise.reject(new Error(response.statusText));
  }else{
    // mengubah suatu objek menjadi promise agar bisa di-then-kan
    return Promise.resolve(response);
  }
}

//block code untuk memparsing json menjadi array js
function json(response){
  return response.json();
}

//block kode untuk menghandle kesalahan di block catch
function error(error){
  //parameter error berasal dari promise.reject()
  console.log("Error : " + error);
}

//block kode untuk melakukan reques data json
function getKlasemen(){
  if('caches' in window){
    caches.match(klasemenU)
    .then(function(response){
      if(response){
        response.json().then(function(data){
          console.log('sudah offline');
          console.log(data);
          //membuat body standings
          var klasemenHTML = '';
          data.standings.forEach(function(standing){
            var detailKlasemen = '';
            standing.table.forEach(function(res){
              detailKlasemen += `
                <tr>
                  <td>${res.position}</td>
                  <td><img class="responsive-img" height="20" width="20" src="${res.team.crestUrl || 'img/empty_badge.svg'}">${res.team.name}</td>
                  <td>${res.playedGames}</td>
                  <td>${res.won}</td>
                  <td>${res.draw}</td>
                  <td>${res.lost}</td>
                  <td>${res.goalsFor}</td>
                  <td>${res.goalsAgainst}</td>
                  <td>${res.goalDifference}</td>
                  <td>${res.points}</td>
                <tr>
              `;
            })

            klasemenHTML += `
              <div class="col s12 m12">
              <div class="card">
              <div class="card-content">
              <h3>${standing.group} ${standing.type}</h3>
              <table class = "responsive-table striped">
              <thead>
                <tr>
                  <th>Posisi</th>
                  <th>Tim</th>
                  <th>Bertanding</th>
                  <th>Menang</th>
                  <th>Seri</th>
                  <th>Kalah</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th>Poin</th>
                </tr>
              </thead>

              <tbody>` + detailKlasemen + `</tbody>
              </table>
              </div>
              </div>
              </div>
            `;
          });
          var htmlFix = `<h2>STANDINGS</h2>` + klasemenHTML;
          document.getElementById("body-content").innerHTML = htmlFix;
        })
      }
    })
  }



  fetch(klasemenU, {
    headers:{
      'X-Auth-Token':KEY
    }
  })
  .then(status)
  .then(json)
  .then(function(data){
    console.log(data);

    //membuat body standings
    var klasemenHTML = '';
    data.standings.forEach(function(standing){
      var detailKlasemen = '';
      standing.table.forEach(function(res){
        detailKlasemen += `
          <tr>
            <td>${res.position}</td>
            <td><img class="responsive-img" height="20" width="20" src="${res.team.crestUrl || 'img/empty_badge.svg'}">${res.team.name}</td>
            <td>${res.playedGames}</td>
            <td>${res.won}</td>
            <td>${res.draw}</td>
            <td>${res.lost}</td>
            <td>${res.goalsFor}</td>
            <td>${res.goalsAgainst}</td>
            <td>${res.goalDifference}</td>
            <td>${res.points}</td>
          <tr>
        `;
      })

      klasemenHTML += `
        <div class="col s12 m12">
        <div class="card">
        <div class="card-content">
        <h3>${standing.group} ${standing.type}</h3>
        <table class = "responsive-table striped">
        <thead>
          <tr>
            <th>Posisi</th>
            <th>Tim</th>
            <th>Bertanding</th>
            <th>Menang</th>
            <th>Seri</th>
            <th>Kalah</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Poin</th>
          </tr>
        </thead>

        <tbody>` + detailKlasemen + `</tbody>
        </table>
        </div>
        </div>
        </div>
      `;
    });
    var htmlFix = `<h2>STANDINGS</h2>` + klasemenHTML;
    document.getElementById("body-content").innerHTML = htmlFix;
  })
  .catch(error);
}

function getMatches(){
  if('caches' in window){
    caches.match(matchesU)
    .then(function(response){
      if(response){
        response.json().then(function(data){
          console.log('sudah offline dari matches');
          console.log(data);
          dataMatch = data;

          var matchesHTML = '';
          var iteration = 0;
          var detailMatches = '';

          data.matches.forEach(function( matches){
            detailMatches += `
              <tr>
                <td>${iteration+=1}</td>
                <td>${matches.awayTeam.name}</td>
                <td>${matches.homeTeam.name}</td>
                <td>${matches.group}</td>
                <td>${dmy(new Date(matches.utcDate))}</td>
                <td>
                  <div class="card-action right-align">
                    <a class="waves-effect waves-light btn-small blue" onClick='insertMatches(${matches.id})'>Watch Later</a>
                  </div>
                </td>
              </tr>
            `;
          })

          matchesHTML += `
            <div class="col s12 m12">
            <div class="card">
            <div class="card-content">
            <h3>Matches</h3>
            <table class = "responsive-table striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Away</th>
                <th>Home</th>
                <th>Group</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>

            <tbody>` + detailMatches + `</tbody>
            </table>
            </div>
            </div>
            </div>
            `;

            document.getElementById("body-content").innerHTML = matchesHTML;
        })
      }
    })
  }


  clearDisplay();
  fetch(matchesU, {
    headers:{
      'X-Auth-Token':KEY
    }
  })
  .then(status)
  .then(json)
  .then(function(data){
    dataMatch = data;
    console.log(data);

    var matchesHTML = '';
    var iteration = 0;
    var detailMatches = '';

    data.matches.forEach(function( matches){
      detailMatches += `
        <tr>
          <td>${iteration+=1}</td>
          <td>${matches.awayTeam.name}</td>
          <td>${matches.homeTeam.name}</td>
          <td>${matches.group}</td>
          <td>${dmy(new Date(matches.utcDate))}</td>
          <td>
            <div class="card-action right-align">
              <a class="waves-effect waves-light btn-small blue" onClick='insertMatches(${matches.id})'>Watch Later</a>
            </div>
          </td>
        </tr>
      `;
    })

    matchesHTML += `
      <div class="col s12 m12">
      <div class="card">
      <div class="card-content">
      <h3>Matches</h3>
      <table class = "responsive-table striped">
      <thead>
        <tr>
          <th>No</th>
          <th>Away</th>
          <th>Home</th>
          <th>Group</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>

      <tbody>` + detailMatches + `</tbody>
      </table>
      </div>
      </div>
      </div>
      `;

      document.getElementById("body-content").innerHTML = matchesHTML;
  })
  .catch(error);
}

function getTeams(){
  if('caches' in window){
    caches.match(teamsU)
    .then(function(response){
      if(response){
        response.json().then(function(data){
          console.log('sudah offline dari teams');
          console.log(data)
          dataTeam = data;
          
          dataTeam = data;
          console.log(data);
          
          var teamHTML = '';
          var i = 0;
          var htmlFix ='';

          data.teams.forEach(function(teams){
            teamHTML += `
              <tr>
                <td>${i+=1}</td>
                <td><img width='20' height='20' class='responsive-img' src='${teams.crestUrl}'/></td>
                <td>${teams.name}</td>
                <td><a href='${teams.website}'>VISIT</a></td>
                <td>
                  <div class="card-action right-align">
                    <a class="waves-effect waves-light btn-small blue" onClick='insertTeam(${teams.id})'>Favorite</a>
                  </div>
                </td>
              </tr>
            `;
          })
          htmlFix = `
            <div class="col s12 m12">
              <div class="card">
              <div class="card-content">
              <h3>Teams</h3>
              <table class = "responsive-table striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Website</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>` + teamHTML + `</tbody>
              </table>
              </div>
              </div>
              </div>
          `;
          document.getElementById("body-content").innerHTML = htmlFix;
        })
      }
    })
  }
  
  clearDisplay();
  fetch(teamsU, {
    headers:{
      'X-Auth-Token':KEY
    }
  })
  .then(status)
  .then(json)
  .then(function(data){
    dataTeam = data;
    console.log(data);
    
    var teamHTML = '';
    var i = 0;
    var htmlFix ='';

    data.teams.forEach(function(teams){
      teamHTML += `
        <tr>
          <td>${i+=1}</td>
          <td><img width='20' height='20' class='responsive-img' src='${teams.crestUrl}'/></td>
          <td>${teams.name}</td>
          <td><a href='${teams.website}'>VISIT</a></td>
          <td>
            <div class="card-action right-align">
              <a class="waves-effect waves-light btn-small blue" onClick='insertTeam(${teams.id})'>Favorite</a>
            </div>
          </td>
        </tr>
      `;
    })
    htmlFix = `
      <div class="col s12 m12">
        <div class="card">
        <div class="card-content">
        <h3>Teams</h3>
        <table class = "responsive-table striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Website</th>
            <th></th>
          </tr>
        </thead>

        <tbody>` + teamHTML + `</tbody>
        </table>
        </div>
        </div>
        </div>
    `;
    document.getElementById("body-content").innerHTML = htmlFix;
  })
  .catch(error);
}

function getFavorites(){
  var htmlFixMatch ='';
  var htmlMatch =''
  var iMatch = 0;
  clearDisplay();

  var matchesDb = dbPromise.then(function(db){
    var tx = db.transaction('matchesFav','readonly');
    var store = tx.objectStore('matchesFav');
    return store.getAll();
  });

  matchesDb.then(function(data){
     data.forEach(function(match){

      htmlMatch += `
        <tr>
        <td>${iMatch+=1}</td>
        <td>${match.awayTeam.name}</td>
        <td>${match.homeTeam.name}</td>
        <td>${match.group}</td>
        <td>${dmy(new Date(match.utcDate))}</td>
        <td>
          <div class="card-action right-align">
            <a class="waves-effect waves-light btn-small blue" onClick='deleteMatches(${match.id})'>Delete</a>
          </div>
        </td>
      </tr>
      `;
     })
     htmlFixMatch =`
        <div class="col s12 m12">
        <div class="card">
        <div class="card-content">
        <h3>Watch List</h3>
        <table class = "responsive-table striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Away</th>
            <th>Home</th>
            <th>Group</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>

        <tbody>` + htmlMatch + `</tbody>
        </table>
        </div>
        </div>
        </div>
        `;

        document.getElementById("body-content").innerHTML = htmlFixMatch;
  });

  //mengambil team

  var htmlFixTeam ='';
  var htmlTeam =''
  var iTeam = 0;

  var teamsDb = dbPromise.then(function(db){
    var tx = db.transaction('teamsFav','readonly');
    var store = tx.objectStore('teamsFav');
    return store.getAll();
  });

  teamsDb.then(function(data){
    data.forEach(function(team){
      htmlTeam +=`
        <tr>
          <td>${iTeam+=1}</td>
          <td><img width='20' height='20' class='responsive-img' src='${team.crestUrl}'/></td>
          <td>${team.name}</td>
          <td><a href='${team.website}'>VISIT</a></td>
          <td>
            <div class="card-action right-align">
              <a class="waves-effect waves-light btn-small blue" onClick='deleteTeam(${team.id})'>Delete</a>
            </div>
          </td>
        </tr>
      `;
    })

    htmlFixTeam = `
      <div class="col s12 m12">
        <div class="card">
        <div class="card-content">
        <h3>Team Favorite</h3>
        <table class = "responsive-table striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Website</th>
            <th></th>
          </tr>
        </thead>

        <tbody>` + htmlTeam + `</tbody>
        </table>
        </div>
        </div>
        </div>
    `;

    document.getElementById("body-content").innerHTML += htmlFixTeam;
  });
}

//DB connection
var dbPromise = idb.open("bola",1,function(upgradeDb){
  if(!upgradeDb.objectStoreNames.contains("matchesFav")){
    upgradeDb.createObjectStore('matchesFav',{'keyPath':'id'});
  }
  if(!upgradeDb.objectStoreNames.contains("teamsFav")){
    upgradeDb.createObjectStore('teamsFav',{'keyPath':'id'});
  }
});

function insertMatches(matchP){
  var match = dataMatch.matches.filter(el => el.id == matchP)[0];

  dbPromise.then(function(db){
    var tx = db.transaction('matchesFav','readwrite');
    var store = tx.objectStore('matchesFav');
    match.createdAt = new Date().getTime();
    store.put(match);
    return tx.complete;
  }).then(function(){
    M.toast({html: `match berhasil disimpan!`});
    console.log('Match Berhasil Disimpan');
  }).catch(function(err){
    console.error('pertandingan gagal disimpan',err);
  });
}

function deleteMatches(matchP){
  var confirmation = confirm("Hapus Match ini?");
  if(confirmation==true){
    dbPromise.then(function(db){
      var tx = db.transaction('matchesFav','readwrite');
      var store = tx.objectStore('matchesFav');
      store.delete(matchP);
      return tx.complete;
    }).then(function(){
      M.toast({html:'match telah di hapus!'});
      getFavorites();
    }).catch(function(err){
      console.error(err);
    })
  }
}

function insertTeam(teamP){
  var team = dataTeam.teams.filter(el => el.id == teamP)[0];

  dbPromise.then(function(db){
    var tx = db.transaction('teamsFav','readwrite');
    var store = tx.objectStore('teamsFav');
    team.createdAt = new Date().getTime();
    store.put(team);
    return tx.complete;
  }).then(function(){
    M.toast({html: `team berhasil disimpan!`});
    console.log('team Berhasil Disimpan');
  }).catch(function(err){
    console.error('team gagal disimpan',err);
  });
}

function deleteTeam(teamP){
  var confirmation = confirm("Hapus Tim ini?");
  if(confirmation==true){
    dbPromise.then(function(db){
      var tx = db.transaction('teamsFav','readwrite');
      var store = tx.objectStore('teamsFav');
      store.delete(teamP);
      return tx.complete;
    }).then(function(){
      M.toast({html:'Tim telah di hapus!'});
      getFavorites();
    }).catch(function(err){
      console.error(err);
    })
  }
}

function clearDisplay(){
  document.getElementById("body-content").innerHTML = '';
}

function dmy (date){
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}