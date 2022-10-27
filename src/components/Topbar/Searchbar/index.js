import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import { BiSearch } from "react-icons/bi";

import { Container, SearchResults, StyledResult } from "./style";
import { getSearchUsers } from "../../../services/linkrAPI";
import PostsContext from "../../../contexts/postsContext";

export default function SearchBar() {
  const navigate = useNavigate();

  const [searchTag, setSearchTag] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { isLoading } = React.useContext(PostsContext);
  const { refreshFeed, setRefreshFeed, setInfiniteScrollIndex } = React.useContext(PostsContext);

  async function handleSearch(e) {
    const filter = e.target.value;
    setSearchTag(filter);

    try {
      const res = await getSearchUsers(filter);
      setSearchResults(res.data);
    } catch (error) {
      console.log(error);
      setSearchTag("");
      setSearchResults([]);
    }
  }

  function Result({ user }) {
    return (
      <StyledResult
        onClick={() => {
          if(isLoading === false){
            navigate(`/user/${user.id}`);
            setInfiniteScrollIndex(0);
            localStorage.setItem(
              "targetUser",
              JSON.stringify({
                id: user.id,
                name: user.name,
              })
            );
            setRefreshFeed(!refreshFeed);
            setSearchTag("");
            setSearchResults([]);
          }
        }}
      >
        <img src={user.imageUrl} alt="" 
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; 
            currentTarget.src="https://static.vecteezy.com/ti/vetor-gratis/p1/2318271-icone-do-perfil-do-usuario-gr%C3%A1tis-vetor.jpg";
          }} 
        />
        <h2>{user.name}</h2>
      </StyledResult>
    );
  }

  return (
    <Container>
      <DebounceInput
        type="search"
        placeholder="Search for people"
        minLength={3}
        debounceTimeout={300}
        value={searchTag}
        onChange={(e) => handleSearch(e)}
      />
      <BiSearch />

      {searchResults.length === 0 ? (
        <></>
      ) : (
        <SearchResults>
          {searchResults.map((result, index) => (
            <Result key={index} user={result} />
          ))}
        </SearchResults>
      )}
    </Container>
  );
}
