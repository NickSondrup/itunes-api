import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

// @ts-ignore
const api = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Nick/songs'
})

class SongsService {
  constructor(){
    this.getMySongs()
  }
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
        console.log(ProxyState.songs)
      })
      .catch(err => {
        throw new Error(err);
      });
    
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    //TODO What are you going to do with this result
    let res = await sandBoxApi.get()
    console.log('the res', res)
    ProxyState.playlist = res.data.map(s => new Song(s))
    console.log(ProxyState.playlist)
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(id) {
    
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
    let foundSong = ProxyState.songs.find(s => s.id == id)
    console.log(foundSong)
     try {
      await sandBoxApi.post('', foundSong)
      ProxyState.playlist =[...ProxyState.playlist, foundSong]
    }
    catch (error) {
      console.log(error)
    }
    
  }


  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
   async removeSong(id) {
    //TODO Send the id to be deleted from the server then update the store
      await api.delete(id)
      ProxyState.playlist = ProxyState.playlist.filter(c => c.id !== id)
      
    }
  }


const service = new SongsService();
export default service;
