import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function CharactersList({
  characters,
  onSelectCharacter,
  selectedCharacterId,
}) {
  return (
    <div className="characters-list">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onSelectCharacter={onSelectCharacter}
          selectedCharacterId={selectedCharacterId}
        >
          <button className="char-card__icon">
            {selectedCharacterId === character.id ? (
              <EyeSlashIcon className="eye-icon" />
            ) : (
              <EyeIcon className="eye-icon" />
            )}
          </button>
        </CharacterCard>
      ))}
    </div>
  );
}

export default CharactersList;

export function CharacterCard({ children, character, onSelectCharacter }) {
  return (
    <div
      className="char-card"
      key={character.id}
      onClick={() => onSelectCharacter(character.id)}
    >
      <img src={character.image} alt="" className="char-card__img" />
      <div className="char-card__desc">
        <div className="char-card__text">
          <h3 className="char-card__title">
            <span>{character.gender === "Male" ? "🧔🏻‍♂️" : "👩🏻‍🦰"}</span>
            <span>&nbsp;{character.name}</span>
          </h3>
          <div className="char-card__status">
            <span
              className={`status ${character.status === "Dead" ? "status--dead" : ""}`}
            ></span>
            <span>&nbsp;{character.status}</span>
            <span> - {character.species}</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
