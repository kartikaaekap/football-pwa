var league_id = 2021;
var token = '34122c53c47d4dc39f7ca8cad6b6e149';
var base_url = "https://api.football-data.org/v2/";
var standing_url = `${base_url}competitions/${league_id}/standings`;
var team_url = `${base_url}teams/`;

var fetchApi = url => {
  return fetch(url, 
    { 
      mode : 'cors',
      headers: {'X-Auth-Token': token }
    });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getStandings() {
  if ('caches' in window) {
    caches.match(base_url + "standing_url").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var standingsHTML =  `
                    <table style="font-size:14px;" class="responsive-table">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Logo</th>
                          <th>CLUB</th>
                          <th>PG</th>
                          <th>W</th>
                          <th>D</th>
                          <th>L</th>
                          <th>GF</th>
                          <th>GA</th>
                          <th>GD</th>
                          <th>Pts</th>
                        </tr>
                      </thead>
                      <tbody>
                `;
            data.standings["0"].table.forEach(function(item) {
              standingsHTML += `
                      <tr>
                        <td>${item.position}</td>
                        <td><a href="./team.html?id=${item.team.id}"><img style="width:20px;" src="${item.team.crestUrl}"></a></td>
                        <td><a href="./team.html?id=${item.team.id}">${item.team.name}</a></td>
                        <td>${item.playedGames}</td>
                        <td>${item.won}</td>
                        <td>${item.draw}</td>
                        <td>${item.lost}</td>
                        <td>${item.goalsFor}</td>
                        <td>${item.goalsAgainst}</td>
                        <td>${item.goalDifference}</td>
                        <td>${item.points}</td>
                      </tr>
              `;
          });
          standingsHTML += `</tbody>
                  </table>`;
          document.getElementById("standings").innerHTML = standingsHTML;
        })
      }
    })
  }
  fetchApi(standing_url)
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      var standingsHTML =  `
              <table style="font-size:14px;" class="responsive-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Logo</th>
                    <th>CLUB</th>
                    <th>PG</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Pts</th>
                  </tr>
                </thead>
                <tbody>
          `;
        data.standings["0"].table.forEach(function(item) {
          standingsHTML += `
                  <tr>
                    <td>${item.position}</td>
                    <td><a href="./team.html?id=${item.team.id}"><img style="width:20px;" src="${item.team.crestUrl}"></a></td>
                    <td><a href="./team.html?id=${item.team.id}">${item.team.name}</a></td>
                    <td>${item.playedGames}</td>
                    <td>${item.won}</td>
                    <td>${item.draw}</td>
                    <td>${item.lost}</td>
                    <td>${item.goalsFor}</td>
                    <td>${item.goalsAgainst}</td>
                    <td>${item.goalDifference}</td>
                    <td>${item.points}</td>
                  </tr>
          `;
      });
      standingsHTML += `</tbody>
              </table>`;
      document.getElementById("standings").innerHTML = standingsHTML;
    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function(resolve, reject) {

  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  var team_id_url = `${base_url}teams/${idParam}`;

  if ('caches' in window) {
    caches.match(base_url + "team_id_url").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var teamHTML = `
      <div class="row">
        <h4 class="light center grey-text text-darken-3" style="font-size:40px; font-weight:bold;"><img style="width:90px;" src="${data.crestUrl}"> <br>${data.name}</h4>
              <p align="center">Nickname : ${data.shortName}<br>Address : ${data.address}<br>Founded : ${data.founded}<br>Club Colors : ${data.clubColors}<br>Venue : ${data.venue}</p>
          <div class="col s12 m6 l6">
            <div class="card-panel center" style="background-color: #0D47A1; color: white;">
            <h5 style="font-weight:bold;">COMPETITIONS</h5>
              <p>
                  <ul>
        `;
        data.activeCompetitions.forEach(function(item) {
        teamHTML += `
                  <li>${item.name}</li>
                    `;
        });
        teamHTML += `
                  </ul>
                </p>
              </div>
            </div>
            <div class="col s12 m6 l6">
            <div class="card-panel center">
              <h5 style="font-size:25px; color:blue; font-weight:bold;">SQUAD</h5>
              <table style="font-size:14px;" class="responsive-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                    `;
        data.squad.forEach(function(item) {
        teamHTML += `
                  <tr>
                  <td>${item.name}</td>
                  <td>${item.position}</td>
                  </tr>
                    `;
        });
        teamHTML += `

            </div>
          </div>
        </div>
                    `;
      document.getElementById("body-content").innerHTML = teamHTML;
      // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
      resolve(data);
        })
      }
    })
  }

  fetchApi(team_id_url)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      console.log(data);
      // tampilkan data detail team
      var teamHTML = `
      <div class="row">
        <h4 class="light center grey-text text-darken-3" style="font-size:40px; font-weight:bold;"><img style="width:90px;" src="${data.crestUrl}"> <br>${data.name}</h4>
              <p align="center">Nickname : ${data.shortName}<br>Address : ${data.address}<br>Founded : ${data.founded}<br>Club Colors : ${data.clubColors}<br>Venue : ${data.venue}</p>
          <div class="col s12 m6 l6">
            <div class="card-panel center" style="background-color: #0D47A1; color: white;">
            <h5 style="font-weight:bold;">COMPETITIONS</h5>
              <p>
                  <ul>
        `;
        data.activeCompetitions.forEach(function(item) {
        teamHTML += `
                  <li>${item.name}</li>
                    `;
        });
        teamHTML += `
                  </ul>
                </p>
              </div>
            </div>
            <div class="col s12 m6 l6">
            <div class="card-panel center">
              <h5 style="font-size:25px; color:blue; font-weight:bold;">SQUAD</h5>
              <table style="font-size:14px;" class="responsive-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                    `;
        data.squad.forEach(function(item) {
        teamHTML += `
                  <tr>
                  <td>${item.name}</td>
                  <td>${item.position}</td>
                  </tr>
                    `;
        });
        teamHTML += `

            </div>
          </div>
        </div>
                    `;
      document.getElementById("body-content").innerHTML = teamHTML;
      // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
      resolve(data);
    });
  });
}
function getSavedTeams() {
  getAll().then(function(data) {
    console.log(data);
    // Menyusun komponen card artikel secara dinamis
    var teamsHTML = "";
    data.forEach(function(data) {
      teamsHTML += `
            <div class="row">
            <div class="col s12 m6 l6">
              <div class="card">
                <div class="card-image">
                  <img src="${data.crestUrl}">
                  <button class="btn-floating halfway-fab waves-effect waves-light red" id="delete"><i class="material-icons">delete</i></button>
                </div>
                <div class="card-content">
                <span class="card-title" align="center" style="font-weight:bold; margin-bottom:20px; color:#0D47A1;"><u>${data.name}</u></span>
                <p align="center">Nickname : ${data.shortName}<br>Address : ${data.address}<br>Founded : ${data.founded}<br>Club Colors : ${data.clubColors}<br>Venue : ${data.venue}</p>
                </div>
              </div>
            </div>
          </div>
                `;

    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamsHTML;
    let btn = document.querySelectorAll(".btn-floating");
           for(let button of btn) {
               button.addEventListener("click", function (event) {
                   let id = event.target.id;
                   dbDeleteTeam(id).then(() => {
                       getSavedTeams()
                   })
               })
           }
  });
}

