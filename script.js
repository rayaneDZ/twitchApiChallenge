var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var usersDiv = document.getElementById('users');
var user = document.getElementsByClassName('user');
var $all = document.getElementById('all');
var $online = document.getElementById('online');
var $offline = document.getElementById('offline');
var offlineUsers = document.getElementById('offlineUsers');
var onlineUsers = document.getElementById('onlineUsers');
var search = document.getElementById('search');
//SENDING AN XHR
for (var i = 0; i < users.length; i++) {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
  var parsed = JSON.parse(this.responseText);
  //UPDATING THE HTML WITH THE DATA OBTAINED
  if(parsed.status == null){
    offlineUsers.innerHTML += `<div class="user notStreaming" title="offline">
      <a href=${parsed.url} target="_blank"><img src="${parsed.logo}" alt=""></a>
      <p id="name"> ${parsed.display_name}</p>
      <p id="doing"> Not Streaming</p>
    </div>`;
  }else{
    var game = parsed.game == null ? "no game" : parsed.game;
    onlineUsers.innerHTML += `<div class="user streaming">
      <a href=${parsed.url} target="_blank"><img src="${parsed.logo}" alt=""></a>
      <p id="name"> ${parsed.display_name}</p>
      <p id="doing"> ${parsed.status}</p>
      <p id="game"> ${game}</p>
    </div>`;
  }
}
  xhttp.open('GET' , 'https://api.twitch.tv/kraken/channels/'+users[i]+'?client_id=c7n05wcpeajbgxpbaub8a2vjxhlif9');
  xhttp.send();
}
//ADDING FUNCTIONALITIES
$all.addEventListener('click', toggleActive);
$online.addEventListener('click', toggleActive);
$offline.addEventListener('click', toggleActive);
function toggleActive() {
    //THIS IS TO TOGGLE THE BORDERBOTTOM OF THE NAVIGATION BAR
    $all.classList.remove('active');
    $online.classList.remove('active');
    $offline.classList.remove('active');
    this.classList.add('active');
    //THIS IS TO SHOW AND HIDE THE SELECTED LIST
    if(this.id == "all"){
      offlineUsers.classList.remove('hide');
      onlineUsers.classList.remove('hide');
    }else if (this.id == "online") {
      offlineUsers.classList.add('hide');
      onlineUsers.classList.remove('hide');
    }else{
      offlineUsers.classList.remove('hide');
      onlineUsers.classList.add('hide');
    }
}
//REAL TIME SEARCH FUNCTIONALITY
search.addEventListener('keyup', searchMatch);
function searchMatch() {
  var searchValue = search.value.toUpperCase();
  for(i in users){
    var toMatch = user[i].children[1].innerHTML.toUpperCase();
    if(toMatch.indexOf(searchValue) > -1){
      user[i].classList.remove('hide');
    }else{
      user[i].classList.add('hide');
    }
  }
}
