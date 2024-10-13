import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Drink {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
}

interface FavoritesState {
    drinks: Drink[];
}

const initialState: FavoritesState = {
    drinks: [],
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Drink>) => {
            const exists = state.drinks.some(drink => drink.idDrink === action.payload.idDrink);
            if (!exists) {
                state.drinks.push(action.payload);
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.drinks = state.drinks.filter(drink => drink.idDrink !== action.payload);
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;