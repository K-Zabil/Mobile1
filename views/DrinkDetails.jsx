import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const DrinkDetails = () => {
  const route = useRoute();
  const [details, setDetails] = useState(null);

  const getDrinkDetails = async (id) => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      console.log('Fetched data:', data);
      setDetails(data.drinks[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getDrinkDetails(route.params.id);
  }, [route.params.id]);

  const renderIngredient = ({ item }) => (
    <View style={styles.ingredientContainer}>
      <Text style={styles.ingredientText}>{item.ingredient}</Text>
      <Text style={styles.measureText}>{item.measure}</Text>
    </View>
  );

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = details[`strIngredient${i}`];
      const measure = details[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {details && (
        <View style={styles.detailsContainer}>
          <Image source={{ uri: details.strDrinkThumb }} style={styles.image} />
          <Text style={styles.title}>{details.strDrink}</Text>
          <Text style={styles.category}>{details.strCategory}</Text>
          <Text style={styles.instructionsTitle}>Instructions:</Text>
          <Text style={styles.instructions}>{details.strInstructions}</Text>
          <Text style={styles.ingredientsTitle}>Ingredients:</Text>
          <FlatList
            data={getIngredients()}
            renderItem={renderIngredient}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 16,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 16,
  },
  ingredientsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 4,
  },
  ingredientText: {
    fontSize: 16,
  },
  measureText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default DrinkDetails;