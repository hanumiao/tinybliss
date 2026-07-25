 document.addEventListener("DOMContentLoaded", function () {
            const el = document.getElementById('spaCarousel');
            if (el) new bootstrap.Carousel(el, { interval: 3500, ride: 'carousel', touch: true });
        });

        (function(){
            const imgs = ['picture/19.png','picture/20.png','picture/21.png','picture/22.png','picture/23.png'];
            const total = 5, INTERVAL = 3500;
            let cur = 0, timer;

            const slidesEl = document.getElementById('auSlides');
            const pbar = document.getElementById('auPbar');
            const dotsEl = document.getElementById('auDots');
            const thumbsEl = document.getElementById('auThumbs');

            for(let i = 0; i < total; i++){
                const d = document.createElement('button');
                d.setAttribute('aria-label', `Slide ${i+1}`);
                if(i===0) d.classList.add('active');
                d.addEventListener('click', ()=> goTo(i, true));
                dotsEl.appendChild(d);

                const t = document.createElement('div');
                t.className = 'au-thumb' + (i===0 ? ' active' : '');
                t.innerHTML = `<img src="${imgs[i]}" alt="Thumbnail ${i+1}">`;
                t.addEventListener('click', ()=> goTo(i, true));
                thumbsEl.appendChild(t);
            }

            function updateUI(){
                slidesEl.style.transform = `translateX(-${cur*100}%)`;
                dotsEl.querySelectorAll('button').forEach((d,i) => d.classList.toggle('active', i===cur));
                thumbsEl.querySelectorAll('.au-thumb').forEach((t,i) => t.classList.toggle('active', i===cur));
                document.querySelectorAll('.au-caption-count').forEach(c => c.textContent = `${cur+1} / ${total}`);
            }

            function startProgress(){
                pbar.style.transition = 'none';
                pbar.style.width = '0%';
                requestAnimationFrame(()=> requestAnimationFrame(()=>{
                    pbar.style.transition = `width ${INTERVAL}ms linear`;
                    pbar.style.width = '100%';
                }));
            }

            function goTo(idx, manual=false){
                cur = (idx + total) % total;
                updateUI();
                if(manual){ clearInterval(timer); startProgress(); timer = setInterval(autoNext, INTERVAL); }
            }

            function autoNext(){ goTo(cur+1); startProgress(); }

            document.getElementById('auPrev').addEventListener('click', ()=> goTo(cur-1, true));
            document.getElementById('auNext').addEventListener('click', ()=> goTo(cur+1, true));

            updateUI();
            startProgress();
            timer = setInterval(autoNext, INTERVAL);
        })();

            mapboxgl.accessToken = CONFIG.mapbox_token;
            const lokasiToko = [110.3695, -7.7956]; //koordinat lokasi toko 
            const map = new mapboxgl.Map({
                container: 'tb-map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: lokasiToko,
                zoom: 14
            });
            new mapboxgl.Marker({ color: '#c99b6b' })
                .setLngLat(lokasiToko)
                .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML("<b>Tiny Bliss Salon Spa & Massage</b>"))
                .addTo(map);