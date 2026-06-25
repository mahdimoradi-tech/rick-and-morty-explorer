import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { useState } from "react";
import { CharacterCard } from "./CharactersList";

function Header({ children }) {
  return (
    <div className="header">
      <Logo />
      {children}
    </div>
  );
}

export default Header;

function Logo() {
  return <span className="logo">LOGO⭐</span>;
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="search"
      placeholder="search..."
    />
  );
}

export function SearchResults({ foundedCharactersNum }) {
  return (
    <span className="results-founded">
      Found <strong>{foundedCharactersNum}</strong> results
    </span>
  );
}

export function Favorites({ favorites, onRemoveFavorite, onSelectCharacter }) {
  const [isClose, setIsClose] = useState(true);

  const handleSelectCharacter = (id) => {
    onSelectCharacter(id);
    setIsClose(true);
  };

  return (
    <>
      <Modal title={"List of Favorites"} isClose={isClose} onOpen={setIsClose}>
        {favorites.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            onSelectCharacter={handleSelectCharacter}
          >
            <button
              className="char-card__icon char-card__icon--trash"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFavorite(char.id);
              }}
            >
              <TrashIcon className="eye-icon" />
            </button>
          </CharacterCard>
        ))}
      </Modal>

      <button className="fav-cards-btn" onClick={() => setIsClose(false)}>
        <HeartIcon className="heart-icon" />
        <span className="badge">{favorites.length}</span>
      </button>
    </>
  );
}
