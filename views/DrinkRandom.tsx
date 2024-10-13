import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { DrinkItem } from '../components/DrinkItem';
import { RootState } from '../favorites/store';
import { addFavorite, removeFavorite } from '../favorites/favoritesSlice';

export const DrinkRandom = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const scrollRef = useRef<FlatList>(null);
  const [drinks, setDrinks] = useState([]);

  const favorites = useSelector((state: RootState) => state.favorites.drinks);

  const handleFetch = async () => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/random.php`
      );
      const data = await response.json();
      setDrinks(data.drinks || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const onAddPress = (item: any) => {
    if (favorites.some(drink => drink.idDrink === item.idDrink)) {
      dispatch(removeFavorite(item.idDrink));
    } else {
      dispatch(addFavorite(item));
    }
  };

  const handleRandomize = () => {
    handleFetch();
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlatList
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        data={drinks}
        keyExtractor={item => `${item.idDrink}`}
        renderItem={({ item }) => (
          <DrinkItem
            name={item.strDrink}
            imageUrl={item.strDrinkThumb}
            actionText={favorites.some(fav => fav.idDrink === item.idDrink) ? 'Remove' : 'Add'}
            onActionPress={() => onAddPress(item)}
            onPress={() => {
              // @ts-ignore
              navigation.navigate('DrinkDetails', { id: item.idDrink });
            }}
          />
        )}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRandomize}
      >
        <Text>Randomize</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
    width: 100,
    height: 48,
    position: 'absolute',
    bottom: 100,
    right: 16,
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
    gap: 16,
  },
});