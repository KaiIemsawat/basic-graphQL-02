import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            username
            age
            nationality
        }
    }
`;

const QUERY_ALL_MOVIES = gql`
    query GetAllMovies {
        movies {
            id
            name
            yearOfRelease
        }
    }
`;

const GET_MOVIE_BY_NAME = gql`
    query Movie($name: String!) {
        movie(name: $name) {
            name
            yearOfRelease
        }
    }
`;

function DisplayData() {
    const [movieSearch, setMovieSearch] = useState("");

    const { data, loading, error } = useQuery(QUERY_ALL_USERS);
    const {
        data: movieData,
        loading: movieLoading,
        error: movieError,
    } = useQuery(QUERY_ALL_MOVIES);

    // working on search
    const [fetchMovie, { data: movieSeachData, error: movieSearchError }] =
        useLazyQuery(GET_MOVIE_BY_NAME);

    if (loading) {
        return <h1>DATA IS LOADING....</h1>;
    }

    if (data) {
        console.log(data);
    }

    if (error) {
        console.log(error);
    }

    if (movieSearchError) {
        console.log(movieSearchError);
    }

    return (
        <div>
            {data &&
                data.users.map((user) => (
                    <div key={user.id}>
                        <h1>Name: {user.name}</h1>
                        <h1>Username: {user.username}</h1>
                        <h1>Age: {user.age}</h1>
                        <h1>Nationality: {user.nationality}</h1>
                    </div>
                ))}

            {movieData &&
                movieData.movies.map((movie) => (
                    <div key={movie.id}>
                        <h1>Movie Name:{movie.name}</h1>
                    </div>
                ))}
            <div>
                <input
                    type="text"
                    placeholder="Interstellar.."
                    onChange={(event) => setMovieSearch(event.target.value)}
                />
                <button
                    onClick={() => {
                        fetchMovie({
                            variables: {
                                name: movieSearch,
                            },
                        });
                    }}
                >
                    Fetch Data
                </button>
                <div>
                    {movieSeachData && (
                        <div>
                            <h1>Movie Name : {movieSeachData.movie.name}</h1>
                            <h1>
                                Released Date :{" "}
                                {movieSeachData.movie.yearOfRelease}
                            </h1>
                        </div>
                    )}
                    {movieSearchError && (
                        <h1>There is an error fetching the data</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DisplayData;
