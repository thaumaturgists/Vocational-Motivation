// MusicMixer.js
const MusicMixer = /** @class */ (function () {
    class MusicMixer {
        constructor() {
            this.musicList = [
                {
                    src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1734880641&auto_play=true&show_artwork=false&show_comments=false&hide_related=true&show_user=true&buying=false&liking=false&show_playcount=false&sharing=false&show_reposts=false&show_teaser=true&visual=false&download=false",
                    title: "Trending Music - Indie"
                },
                {
                    src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1734880599&auto_play=true&show_artwork=false&show_comments=false&hide_related=true&show_user=true&buying=false&liking=false&show_playcount=false&sharing=false&show_reposts=false&show_teaser=true&visual=false&download=false",
                    title: "Trending Music - Pop"
                },
                {
                    src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1734880578&auto_play=true&show_artwork=false&show_comments=false&hide_related=true&show_user=true&buying=false&liking=false&show_playcount=false&sharing=false&show_reposts=false&show_teaser=true&visual=false&download=false",
                    title: "Trending Music - R&B"
                }
            ];
            this.currentMusic = null;
            this.isMinimized = false;
            this.init();
        }
        getRandomNumber(min, max) {
            var array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            return (array[0] % (max - min + 1)) + min;
        }
        playRandomMusic() {
            try {
                var randomIndex = this.getRandomNumber(0, this.musicList.length - 1);
                var selectedMusic = this.musicList[randomIndex];
                var musicSrc = selectedMusic.src;
                var randomNumber = this.getRandomNumber(1, 4);
                var modifiedSrc = "".concat(musicSrc, "&start_track=").concat(randomNumber);
                this.currentMusic = modifiedSrc;
                this.updateMusicPlayer();
            }
            catch (error) {
                console.error('Error playing music:', error);
                alert('An error occurred while trying to play music. Please try again later.');
            }
        }
        toggleMinimize() {
            this.isMinimized = !this.isMinimized;
            this.updateUI();
        }
        updateMusicPlayer() {
            var musicContainer = document.getElementById('musicContainer');
            if (this.currentMusic) {
                const newIframe = `<iframe width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src="${this.currentMusic}"></iframe>`;
                if (musicContainer.innerHTML !== newIframe) {
                    musicContainer.innerHTML = newIframe;
                }
            } else {
                musicContainer.innerHTML = '';
            }
        }
        updateUI() {
            var musicMixer = document.getElementById('musicMixer');
            musicMixer.style.opacity = this.isMinimized ? '0.2' : '0.9';
            musicMixer.style.backdropFilter = this.isMinimized ? 'blur(5px)' : 'blur(10px)';
            document.getElementById('musicContainer').style.display = this.isMinimized ? 'none' : 'block';
        }
        toggleVisibility(isVisible) {
            const musicMixer = document.getElementById('musicMixer');
            if (musicMixer) {
                musicMixer.style.display = isVisible ? 'flex' : 'none';
            }
        }
        init() {
            var _this = this;
            var container = document.createElement('div');
            container.id = 'musicMixer';
            container.style.position = 'fixed';
            container.style.bottom = '0';
            container.style.right = '20px';
            container.style.width = '250px';
            container.style.maxWidth = '90%';
            container.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            container.style.border = '1px solid rgba(204, 204, 204, 0.5)';
            container.style.borderRadius = '12px';
            container.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
            container.style.zIndex = '1000';
            container.style.transition = 'all 0.7s ease';
            container.style.overflow = 'hidden';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            // Append the music mixer container to the body
            document.body.appendChild(container);
            // Add event listener to the existing checkbox
            const checkbox = document.getElementById('hideMusicMixerCheckbox');
            if (checkbox) {
                checkbox.addEventListener('change', function () {
                    _this.toggleVisibility(checkbox.checked);
                });
            }
            var buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'space-between';
            buttonContainer.style.alignItems = 'center';
            buttonContainer.style.padding = '10px';
            var playButton = document.createElement('button');
            playButton.innerHTML = "<img src=\"https://raw.githubusercontent.com/thaumaturgists/Kewlest/main/feather.png\" alt=\"Kewlest\" style=\"max-width: 15px; height: 15px; margin-right: 5px;\" /> Play Random Music";
            playButton.style.flexGrow = '1';
            playButton.style.padding = '10px';
            playButton.style.border = 'none';
            playButton.style.color = 'rgb(245, 0, 18)';
            playButton.style.cursor = 'pointer';
            playButton.style.borderRadius = '5px';
            playButton.style.transition = 'background 0.3s ease';
            playButton.style.fontSize = '15px';
            playButton.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
            playButton.style.boxShadow = '0 0 10px rgba(245, 0, 18, 0.7)';
            playButton.onmouseover = function () {
                playButton.style.backgroundColor = 'rgba(255, 85, 0, 1)';
                playButton.style.color = 'white';
                playButton.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
                playButton.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.8)';
            };
            playButton.onmouseout = function () {
                playButton.style.backgroundColor = '';
                playButton.style.color = 'rgb(245, 0, 18)';
                playButton.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
                playButton.style.boxShadow = '0 0 10px rgba(245, 0, 18, 0.7)';
            };
            playButton.onclick = function () { return _this.playRandomMusic(); };
            var toggleButton = document.createElement('button');
            toggleButton.innerHTML = this.isMinimized ? '+' : '-';
            toggleButton.style.padding = '5px 10px';
            toggleButton.style.background = 'transparent';
            toggleButton.style.border = 'none';
            toggleButton.style.color = '#ff5500';
            toggleButton.style.cursor = 'pointer';
            toggleButton.style.fontSize = '20px';
            toggleButton.style.transition = 'transform 0.2s ease, background 0.3s ease';
            toggleButton.onmouseover = function () {
                toggleButton.style.transform = 'scale(1.1)';
                toggleButton.style.color = 'gold';
            };
            toggleButton.onmouseout = function () {
                toggleButton.style.transform = '';
                toggleButton.style.color = '#ff5500';
            };
            toggleButton.onclick = function () {
                _this.toggleMinimize();
                toggleButton.innerHTML = _this.isMinimized ? '+' : '-';
                requestAnimationFrame(() => _this.updateUI());
            };
            buttonContainer.appendChild(playButton);
            buttonContainer.appendChild(toggleButton);
            container.appendChild(buttonContainer);
            var musicContainer = document.createElement('div');
            musicContainer.id = 'musicContainer';
            musicContainer.style.marginTop = '5px';
            musicContainer.style.display = this.isMinimized ? 'none' : 'block';
            container.appendChild(musicContainer);
            var musicFooter = document.createElement('h6');
            musicFooter.innerHTML = '&#x00A9; Kewlest';
            musicFooter.style.backgroundColor = 'rgba(255, 85, 0, 0.9)';
            musicFooter.style.color = '#ff17b4';
            musicFooter.style.padding = '5px 0';
            musicFooter.style.textAlign = 'center';
            musicFooter.style.fontFamily = 'Cursive';
            musicFooter.style.fontWeight = 'bold';
            musicFooter.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 85, 0, 1)';
            musicFooter.style.margin = '0';
            container.appendChild(musicFooter);
            document.body.appendChild(container);
        }
    }

    // Attach the MusicMixer class to the global window object
    window.MusicMixer = MusicMixer;

    // Initialize the MusicMixer when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function () {
        new MusicMixer();
    });
})();
