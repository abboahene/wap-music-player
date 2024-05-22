let currentPage = "login";
let allSongs = [];
let allPlaylistSongs = [];
const showPage = async (page) => {
  if (page === "main") {
    if (currentPage !== "main") {
      document.getElementById("login-page-container").style.display = "none";
      document.getElementById("main-page").style.display = "block";
    }
    // fetch all songs and playlist
    getPlayList();
    getAllSongs();
  } else {
    if (currentPage === "login") return;
    document.getElementById("login-page-container").style.display = "block";
    document.getElementById("main-page").style.display = "none";
  }
};


const addToPlaylist = async (id) => {
    let {data} = await httpPost(`http://localhost:3000/users/playlists/${id}`);
    const playlist = data.playlist;
    allPlaylistSongs = playlist;
    
    // filter playlist songs from all songs
    const filteredSongs = filterSongs(allSongs, allPlaylistSongs);
    allSongs = filteredSongs;
    refreshAllSongs(allSongs);
    refreshPlayList(playlist);
} 

const removeFromPlaylist = async (id) => {
    let {data} = await httpPut(`http://localhost:3000/users/playlists/${id}`);
    const playlist = data.playlist;
    const toRemove = allPlaylistSongs.find(s => s.id === id);
    allPlaylistSongs = playlist;
    console.log(allSongs);
    allSongs.push(toRemove);

    refreshAllSongs(allSongs);
    refreshPlayList(allPlaylistSongs);
} 

async function getAllSongs(){
    const songs = await httpGet("http://localhost:3000/songs");
    console.log(songs);
    if (songs.status === "success") {
        console.log(songs.data);

        // filter playlist songs from all songs
        allSongs = filterSongs(songs.data, allPlaylistSongs);

        refreshAllSongs(allSongs);
    } else {
      alert(songs.error);
    }
}

async function getPlayList(){
    const {data, status} = await httpGet("http://localhost:3000/users/playlists");
    const playlist = data.playlist;
    allPlaylistSongs = playlist;
    if (status === "success") {
      refreshPlayList(playlist);
    } else {
      alert(songs.error);
    }
}





function refreshAllSongs(arr){
    let tableRows = ` <tr>
    <th>Id</th>
    <th>Title</th>
    <th>Released Date</th>
    <th>Actions</th>
  </tr>
  `;
    arr.forEach((song) => {
    tableRows += `<tr>
    <td>${song.id}</td>
    <td>${song.title}</td>
    <td>${song.releaseDate}</td>
    <td>
      <img onclick="addToPlaylist(${song.id})" class="action-icon" src="./assets/svgs/add.svg" alt="" />
    </td>
  </tr>`;
  });

  document.getElementById("all-songs").innerHTML = tableRows;
}

function refreshPlayList(arr){
    let tableRows = ` <tr>
    <th>Id</th>
    <th>Title</th>
    <th>Released Date</th>
    <th>Actions</th>
  </tr>
  `;
  arr.forEach((song) => {
      tableRows += `<tr>
      <td>${song.id}</td>
      <td>${song.title}</td>
      <td>${song.releaseDate}</td>
      <td>
          <img
                
                onclick="removeFromPlaylist(${song.id})"
              class="action-icon"
              src="./assets/svgs/minus-primary.svg"
              alt=""
          />
          <img
                id="pp${(song.title+song.singer+song.id).replace(" ", "")}"
                onclick="changeAudio(this,'${song.path}')"
              class="action-icon"
              src="./assets/svgs/play-primary.svg"
              alt=""
          />
      </td>
    </tr>`;
    });

    document.getElementById("playlist").innerHTML = tableRows;
}


function filterSongs(list1, list2){
    return list1.filter(song => !list2.find(s => s.id === song.id));
}