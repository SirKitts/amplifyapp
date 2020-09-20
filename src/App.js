import React from 'react';
import axios from 'axios';
// import { sortBy } from 'lodash';

import {
    extractSearchTerm,
    getLastSearches,
    getUrl,
    useSemiPersistentState,
    storiesReducer
} from './components/Common';
import LastSearches from './components/LastSearches';
import List from './components/List';
import SearchForm from './components/SearchForm';

import './App.css';

const App = () => {
    const [searchTerm, setSearchTerm] = useSemiPersistentState(
        'search',
        'React'
    );

    const [urls, setUrls] = React.useState([getUrl(searchTerm, 0)]);

    const [stories, dispatchStories] = React.useReducer(
        storiesReducer,
        { data: [], page: 0, isLoading: false, isError: false }
    );

    const handleFetchStories = React.useCallback(async () => {
        dispatchStories({ type: 'STORIES_FETCH_INIT' });

        try {
            const lastUrl = urls[urls.length - 1];
            const result = await axios.get(lastUrl);

            dispatchStories({
                type: 'STORIES_FETCH_SUCCESS',
                payload: {
                    list: result.data.hits,
                    page: result.data.page,
                },
            });
        } catch {
            dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
        }
    }, [urls]);

    React.useEffect(() => {
        handleFetchStories();
    }, [handleFetchStories]);

    const handleRemoveStory = item => {
        dispatchStories({
            type: 'REMOVE_STORY',
            payload: item,
        });
    };

    const handleSearchInput = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = event => {
        handleSearch(searchTerm, 0);
        event.preventDefault();
    };

    const handleLastSearch = searchTerm => {
        setSearchTerm(searchTerm);

        handleSearch(searchTerm, 0);
    };

    const handleMore = () => {
        const lastUrl = urls[urls.length - 1];
        const searchTerm = extractSearchTerm(lastUrl);
        handleSearch(searchTerm, stories.page + 1);
    };

    const handleSearch = (searchTerm, page) => {
        const url = getUrl(searchTerm, page);
        setUrls(urls.concat(url));
    };

    const lastSearches = getLastSearches(urls);

    return (
        <div>
            <h1>My Hacker Stories</h1>
            <SearchForm
                searchTerm={searchTerm}
                onSearchInput={handleSearchInput}
                onSearchSubmit={handleSearchSubmit}
            />
            <LastSearches
                lastSearches={lastSearches}
                onLastSearch={handleLastSearch}
            />
            <hr />
            {stories.isError && <p>Something went wrong ...</p>}
            <List list={stories.data} onRemoveItem={handleRemoveStory} />
            {stories.isLoading ? (
                <p>Loading ...</p>
            ) : (
                <button type="button" onClick={handleMore}>
                    More
                </button>
            )}
        </div>
    );
};

export default App;

