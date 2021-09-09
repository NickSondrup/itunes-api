export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this.id = data.trackId || data._id;
  }

  get Template() {
    return /*html*/ `
  <div>
    <div class="card ">
      <div class="card-header">
        <h2>${this.title}-${this.artist}</h2>                    
      </div>
      <div class="card-body">
        <img src="${this.albumArt}" alt="listing image">
      </div>
        <div class="card-footer">
            <audio src="${this.preview}" controls></audio>
            <button class= "btn btn-info m-1" onclick="app.songsController.addSong('${this.id}')">Add to playlist</button>
        </div>
    </div>                
  </div>
        `
  }

  get playlistTemplate() {
    return /*html*/ `
    <div>
    <div class="card ">
        <div class="card-header">
            <h2>${this.title}-${this.artist}</h2>                    
        </div>
        <div class="card-body">
        <img src="${this.albumArt}" alt="listing image">
        </div>
        <div class="card-footer">
            <audio src="${this.preview}" controls></audio>
            <button class= "btn btn-danger m-1" onclick="app.songsController.removeSong('${this.id}')">Remove</button>
        </div>
    </div>                
  </div>
        `
  }
}
