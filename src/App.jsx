import { useEffect, useState } from "react";
import "./App.css";
import CharacterInfo from "./components/CharacterInfo";
import CharactersList from "./components/CharactersList";
import Header, { SearchResults, Search, Favorites } from "./components/Header";
import Modal from "./components/Modal";
import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { characters, isLoading } = useCharacters(
    "https://rickandmortyapi.com/api/character/?name",
    query,
  );
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [favorites, setFavorites] = useLocalStorage("FAVORITES", []);

  const handleSelectedCharacter = (id) => {
    setSelectedCharacterId((prevId) => (prevId === id ? null : id));
  };

  const handleAddToFavorites = (char) => {
    setFavorites((prevChars) => [...prevChars, char]);
  };

  const handleRemoveFavorite = (id) => {
    setFavorites((prevChars) => prevChars.filter((char) => char.id !== id));
  };

  const isAddedToFavorites = favorites
    .map((char) => char.id)
    .includes(selectedCharacterId);

  return (
    <div className="container">
      <Toaster />

      <Header>
        <Search query={query} setQuery={setQuery} />
        <SearchResults foundedCharactersNum={characters.length} />
        <Favorites
          favorites={favorites}
          onRemoveFavorite={handleRemoveFavorite}
          onSelectCharacter={handleSelectedCharacter}
        />
      </Header>

      <div className="content">
        <CharactersList
          characters={characters}
          onSelectCharacter={handleSelectedCharacter}
          selectedCharacterId={selectedCharacterId}
        />
        <CharacterInfo
          characterId={selectedCharacterId}
          onAddToFavorites={handleAddToFavorites}
          isAddedToFavorites={isAddedToFavorites}
        />
      </div>
    </div>
  );
}

export default App;
