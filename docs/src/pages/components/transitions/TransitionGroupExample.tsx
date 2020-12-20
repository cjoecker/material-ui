import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { TransitionGroup } from 'react-transition-group';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    button: {
      marginBottom: theme.spacing(2),
    },
  }),
);

const FRUITS = ['Apple', 'Banana', 'Mango', 'Papaya', 'Watermelon', 'Coconut'];

export default function TransitionGroupExample() {
  const classes = useStyles();
  const [fruitsInBasket, setFruitsInBasket] = React.useState(FRUITS.slice(0, 3));

  const handleAddFruit = () => {
    const nextHiddenItem = FRUITS.find((i) => !fruitsInBasket.includes(i));
    if (nextHiddenItem) setFruitsInBasket((prev) => [nextHiddenItem, ...prev]);
  };

  const handleRemoveFruit = (item: string) => {
    setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
  };

  return (
    <div>
      <Button
        variant="contained"
        className={classes.button}
        disabled={fruitsInBasket.length >= FRUITS.length}
        onClick={handleAddFruit}
      >
        Add fruit to basket
      </Button>
      <List className={classes.root}>
        <TransitionGroup>
          {fruitsInBasket.map((item) => (
            <Collapse key={item} in>
              <ListItem>
                <ListItemText primary={item} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge={'end'}
                    aria-label="delete"
                    onClick={() => handleRemoveFruit(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </div>
  );
}
