
/*
    destructure the props searchword and setSearchWord
    into the function SearchWord as props arguements
    which can now be used in this component.

    here is how to destructure:
    { prop1, prop2, prop3, ..., propN}
*/
function SearchWord({ searchword, setSearchWord, inputRef, handleSearch}) {
    return (
        <form onSubmit={(event) => handleSearch(event)}>
            <input
                ref={inputRef}
                type="text"
                autoFocus
                placeholder="search image of anything"
                value={searchword}
                onChange={(event) => setSearchWord(event.target.value)}
            />
            <button
                type="submit"
                onClick={() => inputRef.current.focus()}
            >
                search image
            </button>
        </form>
    );
}
export default SearchWord