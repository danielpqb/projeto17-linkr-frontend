import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DebounceInput } from 'react-debounce-input';
import { BiSearch } from 'react-icons/bi';

import { Container, SearchResults, StyledResult } from "./style";
import { getSearchUsers } from "../../../services/linkrAPI";

export default function SearchBar() {

    const navigate = useNavigate();

    const [searchTag, setSearchTag] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    async function handleSearch(e){
        const filter = e.target.value;
        setSearchTag(filter);

        try {
            const res = await getSearchUsers({filter});
            setSearchResults(res.data);
        } catch (error) {
            setSearchTag('');
            setSearchResults([]);
        }
    };

    function Result({user}){
        return (
            <StyledResult onClick={() => {
                    navigate(`/users/${user.id}`)
                    setSearchTag('');
                    setSearchResults([])
                }}>
                <img src={user.imageUrl} alt=''/>
                <h2>{user.name}</h2>
            </StyledResult>
        )
    }

    return (
        <Container>
            <DebounceInput
                type="text"
                placeholder="Search for people"
                minLength={3}
                debounceTimeout={300}
                value={searchTag}
                onChange={e => handleSearch(e)}
            />
            <BiSearch />
            
            {searchResults.length === 0?
                <></> :
                <SearchResults>
                    {searchResults.map((result, index) => <Result key={index} user={result} />)}
                </SearchResults>
            }
            
        </Container>
    )
};