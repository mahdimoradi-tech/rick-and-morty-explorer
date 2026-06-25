import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import toast from "react-hot-toast";

function CharacterInfo({ characterId, onAddToFavorites, isAddedToFavorites }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedEpisodes, setSelectedEpisodes] = useState([]);

  useEffect(() => {
    async function fetchSelectedCharacter() {
      try {
        setIsLoading(true);
        setSelectedCharacter(null);
        setSelectedEpisodes([]);

        const { data: character } = await axios.get(
          `https://rickandmortyapi.com/api/character/${characterId}`,
        );
        setSelectedCharacter(character);

        if (!character) throw new Error();

        const episodesId = character.episode.map((item) =>
          Number(item.split("/").slice(-1)[0]),
        );
        const { data: episodes } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`,
        );
        setSelectedEpisodes([episodes].flat().slice(0, 7));
      } catch (err) {
        toast.error(err.response.data.error, {
          style: {
            fontWeight: "bold",
            fontSize: "1rem",
          },
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchSelectedCharacter();
  }, [characterId]);

  if (isLoading) return <Loader />;

  return (
    <div className="character-info">
      <div className="selected-card">
        <CardInformation
          selectedCharacter={selectedCharacter}
          onAddToFavorites={onAddToFavorites}
          isAddedToFavorites={isAddedToFavorites}
        />

        <div className="episodes-accordion">
          <EpisodesAccordion selectedEpisodes={selectedEpisodes} />
        </div>
      </div>
    </div>
  );
}

export default CharacterInfo;
function CardInformation({
  selectedCharacter,
  onAddToFavorites,
  isAddedToFavorites,
}) {
  if (selectedCharacter) {
    return (
      <div className="card-information">
        <img
          src={selectedCharacter.image}
          alt=""
          className="card-information__img"
        />
        <div className="card-information__detail">
          <div className="card-information__title">
            <h3>
              <span>{selectedCharacter.gender === "Male" ? "🧔🏻‍♂️" : "👩🏻‍🦰"}</span>
              <span>&nbsp;{selectedCharacter.name}</span>
            </h3>
            <p>
              <span
                className={`status ${selectedCharacter.status === "Dead" ? "status--dead" : ""}`}
              ></span>
              <span>&nbsp;{selectedCharacter.status}</span>
              <span> - {selectedCharacter.species}</span>
            </p>
          </div>
          <div className="card-information__last-location">
            <p>Last Known Location:</p>
            <p className="card-information__location">
              {selectedCharacter.location.name}
            </p>
          </div>
          {isAddedToFavorites ? (
            <p style={{ fontSize: "0.8rem" }}>
              This Character is in your Favorites. ✅
            </p>
          ) : (
            <button
              onClick={() => onAddToFavorites(selectedCharacter)}
              className="add-fav-btn"
            >
              Add to Favorite
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="card-information">
        <p style={{ fontSize: "2rem", margin: "0 auto" }}>
          No character selected
        </p>
      </div>
    );
  }
}

function EpisodesAccordion({ selectedEpisodes }) {
  const [sortBy, setSortBy] = useState(true);

  let sortedEpisodes;

  if (sortBy) {
    sortedEpisodes = selectedEpisodes.sort(
      (a, b) => new Date(a.created) - new Date(b.created),
    );
  } else {
    sortedEpisodes = selectedEpisodes.sort(
      (a, b) => new Date(b.created) - new Date(a.created),
    );
  }

  if (selectedEpisodes.length > 0) {
    return (
      <div className="accordion">
        <div className="accordion__head">
          <h3 className="accordion__title">List of Episodes:</h3>
          <span
            className="accordion__icon"
            onClick={() => setSortBy((is) => !is)}
          >
            <ArrowUpCircleIcon className="chevron-icon" style={{rotate: sortBy ? "0deg" : "180deg", transition:"all ease-in 0.2s"}}/>
          </span>
        </div>

        <ul className="accordion__content">
          {sortedEpisodes.map((episode, index) => (
            <li className="episode" key={episode.id}>
              <p>
                <span className="episode__num">
                  {String(index + 1).padStart(2, "0")} - {episode.episode}
                </span>
                {" : "}
                <strong>{episode.name}</strong>
              </p>
              <span className="release-badge">
                {new Date(episode.air_date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
