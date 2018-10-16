var app = angular.module("musicPlayerApp", []);
app.controller("musicPlayerCtrl", function($scope) {


    $scope.featuredAlbumData = [{
            "id": 1,
            "album_name": "Unorthodox Jukebox",
            "file_name": "Bruno Mars",
            "img_url": "https://upload.wikimedia.org/wikipedia/en/7/77/BrunoMarsUJAlbumCover.png",
            "total_time": "0:27",
            "music_path": "sample1.mp3",
            "fav_value":false
        },
        {
            "id": 2,
            "album_name": "Revival",
            "file_name": "Eminem",
            "img_url": "https://i.ebayimg.com/images/i/142624395592-0-1/s-l1000.jpg",
            "total_time": "3:26",
            "music_path": "mars1.mp3",
            "fav_value":false
        },
        {
            "id": 3,
            "album_name": "Views",
            "file_name": "Drake",
            "music_path": "drake1.mp3",
            "total_time": "3:36",
            "fav_value":false,
            "img_url": "http://blog.dj-l.co.uk/wp-content/uploads/2016/05/Drake-View-From-The-6.jpg"
        },
        {
            "id": 4,
            "album_name": "VOICENOTES",
            "file_name": "Charlie Puth",
             "music_path": "boys1.mp3",
            "total_time": "2:47",
            "fav_value":false,
            "img_url": "https://cdnrockol-rockolcomsrl.netdna-ssl.com/Ogv5423uHVOtXsWjWFFPAr1ScoA=/300x300/smart/rockol-img/img/foto/upload/voicenotes-charlie-puth-cover-ts1527447782.jpeg"

        },
        {
            "id": 5,
            "album_name": "Dale",
            "file_name": "Pitbull",
            "total_time": "5:09",
            "music_path": "temp.mp3",
            "fav_value":false,
            "img_url": "https://is4-ssl.mzstatic.com/image/thumb/Music1/v4/de/97/7c/de977cfd-a44c-8f3b-1856-2a53fcc391e5/886445195620.jpg/268x0w.jpg"
        }
    ]

    $scope.recentlyPlayedData = [{
            "id": 1,
            "album_name": "Bruno Mars",
            "file_name": "It Will Rain",
            "music_path": "mars.mp3",
            "img_url": "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/It_Will_Rain.png/220px-It_Will_Rain.png",
            "total_time": "3:26",
            "fav_value":false
        },
        {
            "id": 2,
            "album_name": "Eminem",
            "file_name": "Monster",
            "music_path": "sample.mp3",
            "img_url": "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/The_Monster_cover.png/220px-The_Monster_cover.png",
            "total_time": "0:27",
            "fav_value":false
        },
        {
            "id": 3,
            "album_name": "Drake",
            "file_name": "In My Feelings",
            "music_path": "drake.mp3",
            "total_time": "3:36",
            "fav_value":false,
            "img_url": "https://files.slack.com/files-pri/T1UEU7539-FCCT684E7/https__2f_2fimages.genius.com_2f2fee80dd9aec0717aef8e1eb7aaaae4c.809x809x1.jpg"
        },
        {
            "id": 4,
            "album_name": "Charlie Puth",
            "file_name": "We Don't Talk Anymore",
            "music_path": "boys.mp3",
            "total_time": "2:47",
            "fav_value":false,
            "img_url": "https://m.media-amazon.com/images/M/MV5BOWQyYmJiOWUtNzkzYS00YWJlLWI5YjgtYTg4MjI0MmM1N2ZkXkEyXkFqcGdeQXVyNjE0ODc0MDc@._V1_.jpg"

        },
        {
            "id": 5,
            "album_name": "Justin Timberlake",
            "file_name": "Mirrors",
            "total_time": "5:09",
            "music_path": "temp.mp3",
            "fav_value":false,
            "img_url": "http://www.mrwillwong.com/wp-content/uploads/2013/03/Justin-Timberlake_The-2020-Experience_Album-Artwork.jpg"
        }
    ]
    $scope.favList = [];

    // $scope.musicPath = ['mars.mp3', 'temp.mp3', 'boys.mp3', 'drake.mp3', 'sample.mp3']

    console.log($scope.recentlyPlayedData[0].music_path);
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
            bar.set($scope.currentSongObj.percent);

        });
    }

    $scope.playSong = function(song,value) {
        // $scope.hide = !$scope.hide;
        // console.log("song", song);
        $scope.hideLiked = value;
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
            // $scope.playNextSong($scope.currentSong);
            audio.onended = function() {
                console.log('ended');
                // if () {
                $scope.playSong($scope.currentSong);
                // }
                // else{
                //     $scope.playNextSong($scope.currentSong);
            }
        }
    }
    $scope.playPrevSong = function(songObj) {
        console.log("song", songObj);
         // $scope.hideLiked = !$scope.hideLiked;

        prevId = songObj.id - 1;
        console.log(prevId);
        songObj = _.where($scope.recentlyPlayedData, { id: prevId });
        console.log(songObj);
        if (songObj != null && songObj.length != 0) {
            $scope.playSong(songObj[0]);
        }

        // audio.ontimeupdate = function() {
        //     $scope.setCurrentTime()
        // };
    }

    $scope.playNextSong = function(songObj) {
        console.log("songnext", songObj);
        nextId = songObj.id + 1;
        console.log(nextId);
        songObj = _.where($scope.recentlyPlayedData, { id: nextId });
        if (songObj != null && songObj.length != 0) {
            $scope.playSong(songObj[0]);
        }

    }

    $scope.shuffle = function() {
        console.log('shufflung');
        audio.onended = function() {
            console.log('123');
            // $scope.playNextSong($scope.currentSong);

            // console.log("song", songObj);
            // for (var i = 0; i < $scope.recentlyPlayedData.length; i++) {
            // console.log($scope.recentlyPlayedData[i].music_path);
            $scope.random = $scope.recentlyPlayedData[Math.floor(Math.random() * $scope.recentlyPlayedData.length)];
            console.log($scope.random);
            $scope.playSong($scope.random);
            // $scope.playSong($);
        }
    }
    $scope.pauseSong = function() {
        console.log("song", audio.currentTime);
        $scope.hide = false;
        audio.pause();


        // $scope.currentSong = song;
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
        console.log(songObj,value);
        // $scope.recentlyPlayedData.fav_value = value;
        $scope.currentSong.fav_value = value;
        if ($scope.currentSong.fav_value == true) {
            // $scope.recentlyPlayedData.fav_value = true;
            $scope.favList.push(songObj);
        } else {
            // $scope.recentlyPlayedData.fav_value = false;
            songObjIdx = _.indexOf($scope.favList, songObj);
            // console.log("filtered",songObj);
            $scope.favList.splice(songObjIdx,1);
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