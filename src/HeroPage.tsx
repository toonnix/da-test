import axios from 'axios';
import md5 from 'md5';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


export interface HeroParams {
    heroId: string,
}

export interface HeroInfo {
    name: string,
}

export const HeroPage: React.FC = () => {
    let { heroId } = useParams<HeroParams>();

    const [heroInfo, setHeroInfo] = useState<HeroInfo>({
        name: '',
    });
    const privateKey = 'e94ca8202f710e551f0065740b10772dccee1848';
    const publicKey = '3c36ca4b2e113ad8aabc725a3cca1bf0';
    const ts = moment().unix();
    const hashKey = md5(`${ts}${privateKey}${publicKey}`);
    const callUrl = `http://gateway.marvel.com/v1/public/characters/${heroId}?ts=${ts}&apikey=${publicKey}&hash=${hashKey}&nameStartsWith=spider`;

    useEffect(() => {
        let mounted = true;

        axios.get(callUrl).then((res) => {
            const results = res.data.data.results[0];
            console.log(results);
            if (mounted) {
                setHeroInfo(results)
            }
        })
        return () => { mounted = false };
    }, []);

    return (
        <div>
            <div>{heroId}</div>
            <div>{heroInfo.name}</div>
            <Link to={`/hero`}>Back to Spider-Man list</Link>
        </div>
    )
}

export default HeroPage;