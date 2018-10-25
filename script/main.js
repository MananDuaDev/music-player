var app = angular.module("musicPlayerApp", []);
app.controller("musicPlayerCtrl", function($scope) {
    $scope.featuredAlbumData = {
        "id": 1,
        "name": "Featured Album",
        "songs": [{
                "id": 1,
                "album_name": "Unorthodox Jukebox",
                "file_name": "Bruno Mars",
                "img_url": "https://upload.wikimedia.org/wikipedia/en/7/77/BrunoMarsUJAlbumCover.png",
                "total_time": "5:37",
                "music_path": "sample1.mp3",
                "fav_value": false
            },
            {
                "id": 2,
                "album_name": "Revival",
                "file_name": "Eminem",
                "img_url": "https://i.ebayimg.com/images/i/142624395592-0-1/s-l1000.jpg",
                "total_time": "4:30",
                "music_path": "mars1.mp3",
                "fav_value": false
            },
            {
                "id": 3,
                "album_name": "Views",
                "file_name": "Drake",
                "music_path": "drake1.mp3",
                "total_time": "3:36",
                "fav_value": false,
                "img_url": "http://blog.dj-l.co.uk/wp-content/uploads/2016/05/Drake-View-From-The-6.jpg"
            },
            {
                "id": 4,
                "album_name": "VOICENOTES",
                "file_name": "Charlie Puth",
                "music_path": "boys1.mp3",
                "total_time": "2:47",
                "fav_value": false,
                "img_url": "https://cdnrockol-rockolcomsrl.netdna-ssl.com/Ogv5423uHVOtXsWjWFFPAr1ScoA=/300x300/smart/rockol-img/img/foto/upload/voicenotes-charlie-puth-cover-ts1527447782.jpeg"

            },
            {
                "id": 5,
                "album_name": "Dale",
                "file_name": "Pitbull",
                "total_time": "5:09",
                "music_path": "temp.mp3",
                "fav_value": false,
                "img_url": "https://is4-ssl.mzstatic.com/image/thumb/Music1/v4/de/97/7c/de977cfd-a44c-8f3b-1856-2a53fcc391e5/886445195620.jpg/268x0w.jpg"
            }
        ]
    }

    $scope.recentlyPlayedData = {
        "id": 2,
        "name": "RecentlyPlayed Album",
        "songs": [{
                "id": 1,
                "album_name": "Bruno Mars",
                "file_name": "It Will Rain",
                "music_path": "mars.mp3",
                "img_url": "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/It_Will_Rain.png/220px-It_Will_Rain.png",
                "total_time": "3:26",
                "fav_value": false
            },
            {
                "id": 2,
                "album_name": "Eminem",
                "file_name": "Monster",
                "music_path": "eminem.mp3",
                "img_url": "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/The_Monster_cover.png/220px-The_Monster_cover.png",
                "total_time": "5:04",
                "fav_value": false
            },
            {
                "id": 3,
                "album_name": "Drake",
                "file_name": "In My Feelings",
                "music_path": "drake.mp3",
                "total_time": "3:36",
                "fav_value": false,
                "img_url": "https://files.slack.com/files-pri/T1UEU7539-FCCT684E7/https__2f_2fimages.genius.com_2f2fee80dd9aec0717aef8e1eb7aaaae4c.809x809x1.jpg"
            },
            {
                "id": 4,
                "album_name": "Charlie Puth",
                "file_name": "We dont talk anymore",
                "music_path": "boys.mp3",
                "total_time": "2:47",
                "fav_value": false,
                "img_url": "https://m.media-amazon.com/images/M/MV5BOWQyYmJiOWUtNzkzYS00YWJlLWI5YjgtYTg4MjI0MmM1N2ZkXkEyXkFqcGdeQXVyNjE0ODc0MDc@._V1_.jpg"

            },
            {
                "id": 5,
                "album_name": "Justin Timberlake",
                "file_name": "Mirrors",
                "total_time": "2:58",
                "music_path": "eminem1.mp3",
                "fav_value": false,
                "img_url": "http://www.mrwillwong.com/wp-content/uploads/2013/03/Justin-Timberlake_The-2020-Experience_Album-Artwork.jpg"
            }
        ]
    }
    $scope.favList = {
        "songs": []
    };

    $scope.allAlbums = [];
    $scope.allAlbums.push($scope.featuredAlbumData, $scope.recentlyPlayedData);
    var audio, bar;
    angular.element(document).ready(function() {
        audio = angular.element(document.getElementById('audioPlayer'))[0];
        bar = new ldBar("#songBar");

    });

    $scope.currentSongObj = {}
    $scope.setCurrentTime = function() {
        $scope.$apply(function() {

            $scope.currentSongObj.mins = Math.floor(parseInt(audio.currentTime) / 60);
            $scope.currentSongObj.secs = Math.floor(parseInt(audio.currentTime) % 60).toString();
            $scope.currentSongObj.percent = Math.floor((parseInt(audio.currentTime) / parseInt(audio.duration)) * 100).toString();
            
            $scope.currentSongObj.percent = parseInt($scope.currentSongObj.percent);
            // console.log("$scope.currentSongObj.percent",typeof($scope.currentSongObj.percent));
            bar.set($scope.currentSongObj.percent);

        });
    }

    $scope.playSong = function(song, fav_value, album) {
        $scope.searchedSongs = [];
        $scope.currentAlbum = album;
        $scope.hideLiked = fav_value;
        $scope.currentSong = song;
        audio.play();
        $scope.hide = true;
        audio.ontimeupdate = function() {
            $scope.setCurrentTime();
        };
        audio.onended = function() {
            $scope.playNextSong($scope.currentSong);
        }
        $scope.repeat = function() {
            audio.onended = function() {
                $scope.playSong($scope.currentSong, false, $scope.currentAlbum);
            }
        }
    }
    
    $scope.search = function() {
        $scope.searchedSongs = [];
        for (var i = 0; i < $scope.allAlbums.length; i++) {
            var temp = _.where($scope.allAlbums[i].songs, { file_name: $scope.searchText });
            $scope.searchedSongs.push.apply($scope.searchedSongs, temp);
        }
    }
    $scope.playPrevSong = function(songObj) {
        prevId = songObj.id - 1;
        songObj = _.where($scope.currentAlbum.songs, { id: prevId });
        if (songObj != null && songObj.length != 0) {
            $scope.playSong(songObj[0], false, $scope.currentAlbum);
        }
    }

    $scope.playNextSong = function(songObj) {
        nextId = songObj.id + 1;
        songObj = _.where($scope.currentAlbum.songs, { id: nextId });
        if (songObj != null && songObj.length != 0) {
            $scope.playSong(songObj[0], false, $scope.currentAlbum);
        }

    }

    $scope.shuffle = function() {
        audio.onended = function() {
            $scope.random = $scope.recentlyPlayedData.songs[Math.floor(Math.random() * $scope.recentlyPlayedData.length)];
            $scope.playSong($scope.random, false, $scope.currentAlbum);
        }
    }
    $scope.pauseSong = function() {
        $scope.hide = false;
        audio.pause();
    }
    $scope.playSong1 = function() {
        audio.play();
        $scope.hide = true;
    }

    $scope.mute = function(value) {
        audio.muted = value;
        $scope.hidemuteicon = !$scope.hidemuteicon;

    }
    $scope.fav = function(songObj, value) {
        $scope.currentSong.fav_value = value;
        if ($scope.currentSong.fav_value == true) {
            $scope.favList.songs.push(songObj);
        } else {
            songObjIdx = _.indexOf($scope.favList, songObj);
            $scope.favList.songs.splice(songObjIdx, 1);
        }
        $scope.hidefavicon = !$scope.hidefavicon;

    }

    $scope.likedPlaylist = function() {
        $scope.hideLiked = !$scope.hideLiked;

    }
    $scope.back = function() {
        $scope.hideLiked = !$scope.hideLiked;
    }

});