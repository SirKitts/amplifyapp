import React from 'react';

export const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
export const API_BASE = 'https://hn.algolia.com/api/v1';
export const API_SEARCH = '/search';
export const PARAM_SEARCH = 'query=';
export const PARAM_PAGE = 'page=';

export const getUrl = (searchTerm, page) =>
    `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

export const extractSearchTerm = url =>
    url
        .substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&'))
        .replace(PARAM_SEARCH, '');

export const getLastSearches = urls =>
    urls
        .reduce((result, url, index) => {
            const searchTerm = extractSearchTerm(url);

            if (index === 0) {
                return result.concat(searchTerm);
            }

            const previousSearchTerm = result[result.length - 1];

            if (searchTerm === previousSearchTerm) {
                return result;
            } else {
                return result.concat(searchTerm);
            }
        }, [])
        .slice(-6)
        .slice(0, -1);

export const storiesReducer = (state, action) => {
    switch (action.type) {
        case 'STORIES_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'STORIES_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data:
                    action.payload.page === 0
                        ? action.payload.list
                        : state.data.concat(action.payload.list),
                page: action.payload.page,
            };
        case 'STORIES_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case 'REMOVE_STORY':
            return {
                ...state,
                data: state.data.filter(
                    story => action.payload.objectID !== story.objectID
                ),
            };
        default:
            throw new Error();
    }
};

export const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = React.useState(
        localStorage.getItem(key) || initialState
    );

    React.useEffect(() => {
        localStorage.setItem(key, value);
    }, [value, key]);

    return [value, setValue];
};
