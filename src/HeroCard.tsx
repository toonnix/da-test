import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    flex: "0 0 24%",
    margin: "0.5%",
    height: 200,
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    flexBasis: '60%'
  },
  name: {
    fontSize: '1.2rem',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));


interface CardProps {
  hero: any,
}

export const HeroCard: React.FC<CardProps> = (props) => {
  const { hero } = props;
  const classes = useStyles();
  const thumbnail = `${hero.thumbnail.path}/standard_xlarge.${hero.thumbnail.extension}`;

  return (
    <Card className={classes.card} key={hero.id}>
      <div className={classes.details}>
        <CardContent>
          <Typography className={classes.name} component="h5" variant="h5">
            <Link to={`/hero/${hero.id}`}>{hero.name}</Link>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {hero.description}
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={thumbnail}
      />
    </Card>
  )
}

export default HeroCard;