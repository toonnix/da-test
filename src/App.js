import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import md5 from 'md5';
import 'fontsource-roboto';
import HeroCard from './HeroCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}));


function App() {
  const [heroList, setHeroList] = useState([]);
  const privateKey = 'e94ca8202f710e551f0065740b10772dccee1848';
  const publicKey = '3c36ca4b2e113ad8aabc725a3cca1bf0';
  const classes = useStyles();

  useEffect(() => {
    window.analytics.track('Visit Homepage');
    let mounted = true;
    const ts = moment().unix();
    const hashKey = md5(`${ts}${privateKey}${publicKey}`);
    axios.get(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashKey}&nameStartsWith=spider`).then(res => {
      const results = res.data.data.results;
      if (mounted) {
        setHeroList(results)
      }
    })
    return () => mounted = false;
  }, []);

  return (
    <div className="App">
      <div className={classes.root}>
        {console.log(heroList)}
        {heroList.map((hero) => <HeroCard hero={hero} />)}
      </div>
    </div>
  );
}

export default App;
