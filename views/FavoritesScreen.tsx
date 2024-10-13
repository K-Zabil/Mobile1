import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { DrinkItem } from '../components/DrinkItem';
import { RootState } from '../favorites/store';
import { removeFavorite } from '../favorites/favoritesSlice';

export const Favorites = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const favorites = useSelector((state: RootState) => state.favorites.drinks);

  const onRemovePress = (id: string) => {
    dispatch(removeFavorite(id));
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet.</Text>
        </View>
      ) : (
        <FlatList
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          data={favorites}
          keyExtractor={item => `${item.idDrink}`}
          renderItem={({ item }) => (
            <DrinkItem
              name={item.strDrink}
              imageUrl={item.strDrinkThumb}
              actionText="Remove"
              onActionPress={() => onRemovePress(item.idDrink)}
              onPress={() => {
                // @ts-ignore
                navigation.navigate('DrinkDetails', { id: item.idDrink });
              }}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
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