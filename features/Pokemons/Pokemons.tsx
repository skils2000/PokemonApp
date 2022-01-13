import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, Picker } from "react-native";
import { pokeAPI } from "../../services/pokeAPI";
import { PokemonShortInfo } from "../../types/Pokemon";
import { Pokemon } from "./components/Pokemon";

export const Pokemons: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonShortInfo[]>([]);
  const [number, setNumber] =useState("10");

  const getPokemons = async () => {
    try {
      console.log(number);
      
      const pokemons = await pokeAPI.getPokemons(number);
      console.log(pokemons)
      setPokemons(pokemons);
    } catch (error) {
      console.error(error);
    }
  };

  const reGetPokemons = async (count) => {
    try {
      console.log(number);
      
      const pokemons = await pokeAPI.getPokemons(count);
      console.log(pokemons)
      setPokemons(pokemons);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokeapp</Text>
      <Picker
        style={styles.select}
        selectedValue={number}
        onValueChange={(itemValue, itemIndex) => {setNumber(itemValue); reGetPokemons(itemValue)}}
      >
        <Picker.Item label="Мало" value="10" />
        <Picker.Item label="Два раза по Мало" value="20" />
        <Picker.Item label="Пять раз по Два раза по Мало" value="100" />
        <Picker.Item label="Всё" value="1000" />
      </Picker>
      <FlatList
        data={pokemons}
        // ! Привет костыль, неудобство во внешнем ресурсе
        renderItem={({ item, index }) => (
          <Pokemon index={index + 1} data={item} />
        )}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  list: {
    padding: 16,
    marginTop: 16,
  },
  item: {
    width: "90wv",
    height: 400,
    backgroundColor: "red",
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
  },
  select:{
    width: "80%",
  }
});
