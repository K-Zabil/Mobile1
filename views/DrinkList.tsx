import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { DrinkItem } from '../components/DrinkItem';
import { RootState } from '../favorites/store';
import { addFavorite, removeFavorite } from '../favorites/favoritesSlice';

export const DrinkList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const scrollRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drinks, setDrinks] = useState([]);
  const [filterText, setFilterText] = useState('');
  const favorites = useSelector((state: RootState) => state.favorites.drinks);

  const handleFetch = async (drinks = ['margarita', 'vodka', 'rum', 'whiskey', 'tequila', 'cosmopolitan', 'daiquiri', 'martini']) => {
    try {
      const fetchPromises = drinks.map(drink =>
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`).then(response => response.json())
      );

      const results = await Promise.all(fetchPromises);

      const fetchedDrinks = results.flatMap(data => data.drinks || []);

      const uniqueDrinks = Array.from(new Set(fetchedDrinks.map(drink => drink.idDrink)))
        .map(id => fetchedDrinks.find(drink => drink.idDrink === id));

      // @ts-ignore
      setDrinks(uniqueDrinks);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < drinks.length) {
      setCurrentIndex(nextIndex);
      scrollRef.current?.scrollToIndex({ index: nextIndex, animated: true });
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

  const filteredDrinks = drinks.filter(drink =>
    // @ts-ignore
    drink.strDrink.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <TextInput
        style={styles.filterInput}
        placeholder="Filter drinks..."
        value={filterText}
        onChangeText={setFilterText}
      />

      <FlatList
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        data={filteredDrinks}
        keyExtractor={(item, index) => `${item.idDrink}-${index}`}
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
        onPress={() => {
          scrollRef.current?.scrollToIndex({ index: 0, animated: true });
          setCurrentIndex(0);
        }}
      >
        <Text>Top</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { bottom: 42 }]}
        onPress={handleNext}
      >
        <Text>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    margin: 16,
    borderRadius: 5,
  },
  button: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
    width: 48,
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