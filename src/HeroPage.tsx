import axios from 'axios';
import md5 from 'md5';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '@material-ui/core';


export interface HeroParams {
    heroId: string,
}

export interface HeroInfo {
    name: string,
    description: string,
}

export const HeroPage: React.FC = () => {
    const { heroId } = useParams<HeroParams>();

    const [heroInfo, setHeroInfo] = useState<HeroInfo>({
        name: '',
        description: '',
    });

    useEffect(() => {
        let mounted = true;
        const _heroId = heroId;
        const privateKey = 'e94ca8202f710e551f0065740b10772dccee1848';
        const publicKey = '3c36ca4b2e113ad8aabc725a3cca1bf0';
        const ts = moment().unix();
        const hashKey = md5(`${ts}${privateKey}${publicKey}`);
        const callUrl = `https://gateway.marvel.com/v1/public/characters/${_heroId}?ts=${ts}&apikey=${publicKey}&hash=${hashKey}&nameStartsWith=spider`;

        axios.get(callUrl).then((res) => {
            const results = res.data.data.results[0];
            if (mounted) {
                (window as any).analytics.track('visit-hero-page', {heroName : results.name});
                setHeroInfo(results);
            }
        })
        return () => { 
            mounted = false 
        };
    }, [heroId]);

    return (
        <Card>
            <div>{heroId}</div>
            <div>{heroInfo.name}</div>
            <div>{heroInfo.description}</div>
            <Link to={`/hero`}>Back to Spider-Man list</Link>
        </Card>
    )
}

export default HeroPage;