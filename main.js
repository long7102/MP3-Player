var intro = "Chào em, cô gái xinh đẹp nóng bỏng mà anh quen. Hôm nay em đã cười chưa"
alert(intro)

// bind querySelector
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// storage key
const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER'

// define variables
const playlist = $('.playlist')
const playingSongName = $('.playing-song-name')
const playingSongArtist = $('.playing-song-artist')
const cdThumbnail = $('.cd-thumbnail')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn  = $('.btn-prev')
const repeatBtn = $('.btn-repeat')
const shuffleBtn = $('.btn-shuffle')
const song = $$('.song')
var shuffleArray = []


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    configs: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    songs: [
        {
            name: "Vườn Sao Băng",
            singer: "puppy & JayKem",
            path: "./asset/music/puppy  JayKem  Vườn Sao Băng ft FOWLEX Snowz  Official Lyrics Video.mp3",
            image: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/04/76/6d/04766dde-a26e-876d-07bd-4c0c12c07376/artwork.jpg/1200x1200bf-60.jpg",
            isFavorite: false

        },
        {
            name: "Rơi vào hoàng hôn",
            singer: "‪@2imphuoc",
            path: "./asset/music/2imphuoc  RƠI VÀO HOÀNG HÔN Prod COAST MUSIC.mp3",
            image: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/b/f/6/d/bf6dc9e42ca62045a288828677e17f29.jpg",
            isFavorite: false
        },
        {
            name: "Butterflies",
            singer: "Normandie",
            path: "./asset/music/Normandie  Butterflies Official Video.mp3",
            image: "https://images.genius.com/e53f29a2d523d78ec6cf74137b615a01.1000x1000x1.jpg",
            isFavorite: false,
        },
        {
            name: "Babylon",
            singer: "Normandie",
            path: "./asset/music/Normandie  Babylon Official Audio Stream.mp3",
            image: "https://i.ytimg.com/vi/1STMdBRxDmQ/maxresdefault.jpg",
            isFavorite: false
        },
        {
            name: "Candy",
            singer: "Doja Cat",
            path: "./asset/music/Doja Cat  Candy Audio.mp3",
            image: "https://i1.sndcdn.com/artworks-000521778090-l1mdj3-t500x500.jpg",
            isFavorite: false
        },
        {
            name: "older",
            singer: "Isabel LaRosa",
            path: "./asset/music/Isabel LaRosa  older Lyrics.mp3",
            image: "https://i1.sndcdn.com/artworks-37zshbv2zv1t1xEK-JNnzWA-t500x500.jpg",
            isFavorite: false
        },
        {
            name: "favorite",
            singer: "Isabel LaRosa",
            path: "./asset/music/Isabel LaRosa  favorite Lyric Video.mp3",
            image: "https://i1.sndcdn.com/artworks-37zshbv2zv1t1xEK-JNnzWA-t500x500.jpg",
            isFavorite: false
        },
        {
            name: "DEATH",
            singer: "Melanie Martinez",
            path: "./asset/music/Melanie Martinez  DEATH Lyrics.mp3",
            image: "https://i9.ytimg.com/s_p/OLAK5uy_lWz191CuKFCKMG2081fWGOGKFgm1zGCgg/maxresdefault.jpg?sqp=CISnq7UGir7X7AMICM62nLUGEAE=&rs=AOn4CLC6gIVOfLBJEXnDeIIb6foJSgub9Q&v=1722227534",
            isFavorite: false
        },
        {
            name: "em",
            singer: "mer",
            path: "./asset/music/mer  em.mp3",
            image: "https://photo-zmp3.zadn.vn/avatars/a/0/e/e/a0eea24fb8dafb5cae3be2e259e64eec.jpg",
            isFavorite: false
        },
        {
            name: "lơ mơ",
            singer: "mer",
            path: "./asset/music/lơ mơ  mer.mp3",
            image: "https://photo-zmp3.zadn.vn/avatars/a/0/e/e/a0eea24fb8dafb5cae3be2e259e64eec.jpg",
            isFavorite: false
        },
        {
            name: "Be Broken",
            singer: "Shayda",
            path: "./asset/music/Be Broken  Shayda FtGimi.mp3",
            image: "./asset/author/shayda.jpg",
            isFavorite: false
        },
        {
            name: "iu bạn mình ",
            singer: "Shayda",
            path: "./asset/music/iu bạn mình  Shayda Ft Gimi.mp3",
            image: "./asset/author/shayda.jpg",
            isFavorite: false
        },
        {
            name: "Take Me Away",
            singer: "Christina Vidal",
            path: "./asset/music/Christina Vidal  Take Me Away.mp3",
            image: "https://m.media-amazon.com/images/M/MV5BMTYxOTE1NzM2M15BMl5BanBnXkFtZTYwNTg4MzQ1._V1_FMjpg_UX1000_.jpg",
            isFavorite: false
        },
        {
            name: "Duality",
            singer: "Skipnot",
            path: "./asset/music/Slipknot  Duality  HQ  Lyrics.mp3",
            image: "https://images.radiobob.de/files/media/image/file/bob_slipknot_16-9_1.jpg?rect=center%2Cmiddle%2C1080%2C1080",
            isFavorite: false
        },
        {
            name: "Smells Like Teen Spirit",
            singer: "Nirvana",
            path: "./asset/music/Nirvana  Smells Like Teen Spirit Lyrics.mp3",
            image: "https://www.nirvana.com/files/2023/10/Nevermind-compressed.jpg",
            isFavorite: false
        },
        {
            name: "Gorillaz ",
            singer: "Clint Eastwood",
            path: "./asset/music/Clint Eastwood.mp3",
            image: "https://vcdn1-giaitri.vnecdn.net/2021/09/18/Clint-Eastwood-The-Good-The-Bad-and-The-Ugly-1631939528.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=C3V5qO9e_hiTM4_5uKSSag",
            isFavorite: false
        },
        {
            name: "nữ siêu anh hùng",
            singer: "tlinh",
            path: "./asset/music/tlinh  nữ siêu anh hùng  OFFICIAL MUSIC VIDEO.mp3",
            image: "https://vcdn1-giaitri.vnecdn.net/2022/02/08/thao-linh-jpeg-1644313181-2294-1644314017.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=zUwYLKE1lqSsl-q5y7qskw",
            isFavorite: false
        },{
            name: "nếu lúc đó",
            singer: "tlinh",
            path: "./asset/music/tlinh  nếu lúc đó ft 2pillz  OFFICIAL MUSIC VIDEO.mp3",
            image: "https://vcdn1-giaitri.vnecdn.net/2022/02/08/thao-linh-jpeg-1644313181-2294-1644314017.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=zUwYLKE1lqSsl-q5y7qskw",
            isFavorite: false
        },
        {
            name: "Rebound",
            singer: "tlinh",
            path: "./asset/music/TGSN  Rebound feat Tlinh  Official Visualizer.mp3",
            image: "https://vcdn1-giaitri.vnecdn.net/2022/02/08/thao-linh-jpeg-1644313181-2294-1644314017.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=zUwYLKE1lqSsl-q5y7qskw",
            isFavorite: false
        },
        {
            name: "Cuốn cho nhau 1 điếu",
            singer: "tlinh",
            path: "./asset/music/Cuốn cho nhau 1 điếu  Tlinh  remake  Lyrics.mp3",
            image: "https://vcdn1-giaitri.vnecdn.net/2022/02/08/thao-linh-jpeg-1644313181-2294-1644314017.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=zUwYLKE1lqSsl-q5y7qskw",
            isFavorite: false
        },
        {
            name: "PHI TIÊU",
            singer: "LEFT HAND",
            path: "./asset/music/PHI TIÊU  LEFT HAND Official Music Video.mp3",
            image: "https://vcdn1-giaitri.vnecdn.net/2022/02/08/thao-linh-jpeg-1644313181-2294-1644314017.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=zUwYLKE1lqSsl-q5y7qskw",
            isFavorite: false
        },
        {
            name: "PHONG",
            singer: "VSTRA",
            path: "./asset/music",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpOQsl2_69YLNUR-AHssTWAjQdqW1GpEGmuw&s",
            isFavorite: false
        },
        {
            name: "She Said",
            singer: "WEAN",
            path: "./asset/music/WEAN  She Said  Official Lyrics Video  ft NAOMI.mp3",
            image: "https://mamnonanhduongvt.edu.vn/wp-content/uploads/2022/11/202010060333546371-c5f5d7c4-fc20-4e31-82b0-78237bdb620c.png",
            isFavorite: false
        },

        {
            name: "HONGKONG1 (remake)",
            singer: "52HZ",
            path: "./asset/music/HONGKONG1 remake  52HZ high quality.mp3",
            image: "https://media.viez.vn/prod/2023/5/1/IMG_0876_e6323e0717.PNG",
            isFavorite: false
        },

        {
            name: "Muốn anh Long đau",
            singer: "Winno ft Vlong",
            path: "./asset/music/Winno  Muốn anh đau ft Hustlang Robber  TO LOVE AND BE LOVED Album.mp3",
            image: "./asset/image/long.jpg",
            isFavorite: false
        },
        {
            name: " Hello Kitty",
            singer: "Avril Lavigne ",
            path: "./asset/music/Avril Lavigne  Hello Kitty Lyrics.mp3",
            image: "https://source.boomplaymusic.com/group10/M00/12/11/9e505773957e461489b5c5195b19fb45_464_464.jpg",
            isFavorite: false
        },
        {
            name: "Criminal",
            singer: "Britney Spears",
            path: "./asset/music/Britney Spears  Criminal Lyrics.mp3",
            image: "https://phunuvietnam.mediacdn.vn/thumb_w/700/179072216278405120/2024/4/19/quotenguoi-dan-ba-trong-toi-17134906859421847163240-71-1475-749-2560-crop-1713490710352831129787.jpg",
            isFavorite: false
        },
        {
            name: "Obsessed",
            singer: "Mariah Carey",
            path: "./asset/music/Mariah Carey   Obsessed Lyrics.mp3",
            image: "https://cdn.britannica.com/13/238513-050-98B05E9E/Mariah-Carey-American-pop-singer-2019.jpg",
            isFavorite: false
        },
        {
            name: "Make me wanna die",
            singer: "The pretty reckless",
            path: "./asset/music/The Pretty Reckless  Make Me Wanna Die Lyrics.mp3",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/03/The_Pretty_Reckless_Rockfest_2017_3.jpg",
            isFavorite: false
        },
        {
            name: "Just tonight",
            singer: "The pretty reckless",
            path: "./asset/music/The Pretty Reckless  Just Tonight Official Music Video.mp3",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/03/The_Pretty_Reckless_Rockfest_2017_3.jpg",
            isFavorite: false
        },
        {
            name: "Kill me",
            singer: "The pretty reckless",
            path: "./asset/music/The Pretty Reckless  Kill Me FULL VERSION.mp3",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/03/The_Pretty_Reckless_Rockfest_2017_3.jpg",
            isFavorite: false
        },
        {
            name: "Witches burn",
            singer: "The pretty reckless",
            path: "./asset/music/The Pretty Reckless  Witches Burn.mp3",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/03/The_Pretty_Reckless_Rockfest_2017_3.jpg",
            isFavorite: false
        },
        {
            name: "Diorama",
            singer: "Yves",
            path: "./asset/music/DIORAMA Yves.mp3",
            image: "https://images.genius.com/3459329ea1a364d0403881f2fc8f956d.1000x1000x1.png",
            isFavorite: false
        },
        {
            name: "Rối ren",
            singer: "Truant Fu",
            path: "./asset/music/Truant Fu  Rối Ren Eh eh Official Music Video.mp3",
            image: "https://i.ytimg.com/vi/VveWMtbKXGU/0.jpg",
            isFavorite: false
        },
        {
            name: "Runaway",
            singer: "Truant Fu",
            path: "./asset/music",
            image: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/d/3/6/d/d36dc73c987a570d29f05fe712eb5c44.jpg",
            isFavorite: false
        },
        {
            name: "Feel Good",
            singer: "gorillaz ",
            path: "./asset/music/Gorillaz  Feel Good Inc Official Video.mp3",
            image: "https://i1.sndcdn.com/artworks-000498993117-tfcwb6-t500x500.jpg",
            isFavorite: false
        },
        {
            name: "Song that I chose for you.",
            singer: "Sát thủ vô tình",
            path: "./asset/music/Caravan Palace  Lone Digger Album version.mp3",
            image: "./asset/image/long.jpg",
            isFavorite: false
        },
        {
            name: "Song that you gonna like",
            singer: "Sát thủ vô tình",
            path: "./asset/music/Pumped Up Kicks.mp3",
            image: "./asset/image/433476422_1619992155441619_932794865641942996_n.jpg",
            isFavorite: false
        },
        {
            name: "Song that remind me of you",
            singer: "Sói già cô đơn",
            path: "./asset/music/Eyes Without A Face.mp3",
            image: "./asset/image/6fbc84e6-ce8a-498a-b722-2eaaf9f52f0c.jpg",
            isFavorite: false
        },
        {
            name: "Song that i like",
            singer: "Zoe aka Girl with 1000 names",
            path: "./asset/music/laugh.mp3",
            image: "./asset/image/icon.jpg",
            isFavorite: false
        },
    ],

    // set config for app
    setConfig: function(key, value) {
        this.configs[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.configs))
    },
    
    // render songs in above array to html
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index == this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="song-contain">
                    <div class="song-img" style="background-image: url('${song.image}')" alt="" class="song-image"></div>
                    <div class="song-text">
                        <h5 class="song-name">${song.name}</h5>
                        <p class="song-artist">${song.singer}</p>
                    </div>
                </div>

                <div class="song-contain song-select">
                    <div>
                        <i class="song-favorite-${index} btn song-favorite fa-regular fa-heart" onclick="handleFavorite(event)"></i> 
                        <i class="btn song-remove-${index} fa-solid fa-xmark" onclick="handleRemove(event)"></i>
                    </div>
                </div>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('');
    },
    

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function() {
        // play button
        playBtn.onclick = function() {
            if (app.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        audio.onplay = function() {
            app.isPlaying = true
            playBtn.classList.add('song-playing')
            cdThumbAni.play()
        }

        audio.onpause = function() {
            app.isPlaying = false
            playBtn.classList.remove('song-playing')
            cdThumbAni.pause()
        }

        // rotate cd
        const cdThumbAni = cdThumbnail.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })

        cdThumbAni.pause()

        // track song progress
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        // seek 
        progress.oninput = function(e) {
            const seekTime = e.target.value / 100 * audio.duration
            audio.currentTime = seekTime
        }

        // next button
        nextBtn.onclick = function() {
            if (app.isRandom) {
                app.randomSong()
            } else {
                app.nextSong()
            }
            audio.play()    
        }

        // previous button
        prevBtn.onclick = function() {
            if (app.isRandom) {
                app.randomSong()
            } else {
                app.prevSong()
            }
            audio.play()
        }

        // repeat button
        repeatBtn.onclick = function(e) {
            app.isRepeat = !app.isRepeat
            app.setConfig('isRepeat', app.isRepeat)
            repeatBtn.classList.toggle('active', app.isRepeat)
        }

        // shuffle button
        shuffleBtn.onclick = function(e) {
            app.isRandom = !app.isRandom
            app.setConfig('isRandom', app.isRandom)
            shuffleBtn.classList.toggle('active', app.isRandom)
        }

        // next song when ended
        audio.onended = function() {
            if (app.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // click playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            var songs = $$('.song')
            songs[app.currentIndex].classList.remove('active')
            

            if (songNode || e.target.closest('.option')) {
                // Clicked on a song
                if (songNode) {
                    app.currentIndex = Number(songNode.dataset.index);
                    songs[app.currentIndex].classList.add('active')
                    app.loadCurrentSong();
                    audio.play();
                }
            }   
        }
    },

    // load current song based on current index
    loadCurrentSong: function() {
        playingSongName.textContent = this.currentSong.name
        playingSongArtist.textContent = this.currentSong.singer
        cdThumbnail.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    // load all configs of app
    loadConfig: function() {
        this.isRandom = this.configs.isRandom
        this.isRepeat = this.configs.isRepeat

        if (app.isRepeat) {
            repeatBtn.classList.add('active')
        }

        if (app.isRandom) {
            shuffleBtn.classList.add('active')
        }
    },

    // handle nextSong event
    nextSong: function() {
        let songs = $$('.song')
        songs[this.currentIndex].classList.remove('active')

        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }

        songs[this.currentIndex].classList.add('active')
        this.loadCurrentSong()
    },

    // handle prevSong event
    prevSong: function() {
        let songs = $$('.song')
        songs[this.currentIndex].classList.remove('active')

        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }

        songs[this.currentIndex].classList.add('active')
        this.loadCurrentSong()
    },

    // handle randomSong event using fisher-Yates (aka Knuth) Shuffle algorithm
    randomSong: function() {
        let songs = $$('.song')
        songs[this.currentIndex].classList.remove('active')
        // If all songs have been played, reshuffle the array
        if (shuffleArray.length === 0) {
            shuffleArray = [...this.songs]; // Copy the songs array
            for (let i = shuffleArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]]; // Swap elements
            }
        }

        // Get the next song from the shuffled array
        const nextSong = shuffleArray.pop();

        // Update the current index and load the song
        this.currentIndex = this.songs.indexOf(nextSong);
        songs[this.currentIndex].classList.add('active')
        this.loadCurrentSong();
    },

    // handle events when starting app
    start: function() {
        this.loadConfig()
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentSong()
        this.render()
    }
}

// handle event when clicking favorite (heart) icon
function handleFavorite(event) {
    alert("Này bấm cho vui thôi, mình chưa làm đến đây đâu")
    event.stopPropagation()
    const songElement = event.target.closest('.song')
    const dataIndex = songElement.dataset.index;
    const favBtn = $(`.song-favorite-${dataIndex}`)

    if (!app.songs[dataIndex].isFavorite) {
        favBtn.classList.replace("fa-regular", "fa-solid")
        app.songs[dataIndex].isFavorite = true;
    } else {
        favBtn.classList.replace("fa-solid", "fa-regular")
        app.songs[dataIndex].isFavorite = false;
    }
}

// handle event when clicking remove (delete) icon
function handleRemove(event) {
    event.stopPropagation()
    const songElement = event.target.closest('.song')
    const dataIndex = songElement.dataset.index;
    const removeBtn = $(`.song-remove-${dataIndex}`)

    const removeSong = removeBtn.closest('.song')
    app.songs.splice(removeSong, 1)
    removeSong.style.display = 'none'
}

// starto
app.start()
