import React, { useState } from "react";
import styled from "styled-components";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchData } from "../../redux/reducers/searchReducer";

const SearchContainer = styled.form`
  display: flex;
`;

const SearchBar = styled.input`
  padding: 8px 10px 8px 20px;
  width: 90px;
  background-color: ${({ theme }) => theme.background.searchBox};
  color: ${({ theme }) => theme.text.searchBox};
  border: transparent;
  border-radius: 20px 0 0 20px;
  &::placeholder {
    color: ${({ theme }) => theme.text.searchBox};
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0 20px 0 0;
  background-color: ${({ theme }) => theme.background.searchBox};
  color: ${({ theme }) => theme.text.searchBox};
  border: transparent;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
`;

export default function SearchBox() {
  const [searchContent, setSearchContent] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearchContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchContent) return;
    dispatch(setSearchData(searchContent.toLowerCase()));
    history.push(`/search/${searchContent}`);
    setSearchContent(""); // 送出後清空欄位
  };

  return (
    <SearchContainer onSubmit={handleSubmit}>
      <SearchBar
        type="text"
        value={searchContent}
        placeholder="Search"
        onChange={handleSearchChange}
      />
      <SearchButton type="submit">
        <SearchIcon />
      </SearchButton>
    </SearchContainer>
  );
}
