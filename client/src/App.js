import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function App() {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: "http://localhost:3001/graphql",
    });
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <h1>List of users</h1>
            </div>
        </ApolloProvider>
    );
}

export default App;