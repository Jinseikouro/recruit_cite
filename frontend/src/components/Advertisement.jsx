import React, { useEffect, useState } from 'react';
import { Image } from 'semantic-ui-react';
import './Advertisement.css';

const fetchAd = async () => {
    const res = await fetch('http://localhost:5000/advertisement');
    return res.json();
};

const Advertisement = () => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        (async function () {
            const fetchedAds = await fetchAd();
            setAds(fetchedAds);
        })();
    }, []);

    //map関数で、とってきた分だけ、表示する
    //ad.photo_typeにはデータ型、ad.photoにはエンコードされたデータが入ってる。
    //base64でデコードしてあげる
    return (
        <div>
            {ads.map((ad) => (
                <div key={ad.id}>
                    <p id="title">{ad.title}</p>
                    {ad.photo && (
                        <Image
                            id="ad"
                            src={`data:${ad.photo_type};base64,${ad.photo}`}
                            alt={ad.title}
                        />
                    )}
                </div>
            ))
            }
        </div >
    );
};

export default Advertisement;
