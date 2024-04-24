import Header from "./Header";
import SearchWord from "./SearchWord";
import Content from "./content";
import { useState } from "react";
import { useRef } from "react";
function App() {
  /*
    create a useref object and when the page rerenders
    due to a usestate react makes the userref object
    current property be assigned to the jsx node that
    the useref object was referrenced with i.e assigned
    to so any method call on the current property or
    a direct change on it changes it's state but it does
    cause the functional component it was created from to
    re-render, which would have changes its value but
    only if a hook that causes re-rendering would change
    state of the userefhook.
  */
  const inputRef = useRef(null);
  /*
    here I would define the state variable and setter
    to control the input tag of react since this is a
    controlled input. unlike dom which is uncontrolled
    and also I will send the searchword state variable,
    and setSearchWord function as props to the searchWord
    alias functional component
  */
  const [searchword, setSearchWord] = useState('');

  /*
    now I need another state for my image array
    then and handleSearch function that runs an
    asynchronous operation making the user still
    able to interact with the app even though the
    process could take a lot of time due to network
    and so.
  */
  const [image_array, setImagearray] = useState(JSON.parse(localStorage.getItem("image_array")));

  /*
    now define the image pointer to helps us to navigate between
    the next image and previous image i.e we could use these to
    know if there is a next image or not, and also if there is
    a previous image or not
  */
 const [imagepointer, setImagePointer] = useState(0);
 /*
    use this handleNext and handleBack function
    to manage the image pointers to know which image
    to render next based on the back and next buttons
 */
 const handleNext = (img_pointer) => {
    setImagePointer(img_pointer + 1);
 }
 const handleBack = (img_pointer) => {
    setImagePointer(img_pointer - 1);
 }
  // handle search function
  const handleSearch = (event) => {
    /*
      prevent the default action when a form
      is submitted i.e data is sent to the server
      server sends a response if form is accepted
      then the page reloads
    */
    event.preventDefault();
    /*
      now check if searchword state variable is an empty
      string, if it is exit the function without doing the
      ajax request.
    */
    if (!searchword) return;
    const accessKey = "GSkZK2MzYiS6lXfumYw85HkHrXsUFg0BFJj7LrFWMpY";
    const resource = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${searchword}&per_page=1`;
    fetch(
      resource,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        redirect: "follow",
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! status-code: ${response.status}, and status-text: ${response.statusText}`);
      }
      return response.json();
    }).then((jsonData) => {
      const search_array = jsonData.results.map((result) => {
        const searchedDate = new Date();
        return {
          name: result.alt_description,
          searched_at: searchedDate.toLocaleDateString(),
          url: result.urls.full,
        }
      });
      const copy_image_array = [...search_array, ...(image_array ? image_array : [])];
      // save the new image array
      localStorage.setItem("image_array", JSON.stringify(copy_image_array));
      // setimage array to copy_image_array
      setImagearray(copy_image_array);
      setSearchWord("");
    }).catch((error) => {
      console.error(error);
    });
  }
  return (
    <div>
      <Header />
      <SearchWord
        searchword={searchword}
        setSearchWord={setSearchWord}
        inputRef={inputRef}
        handleSearch={handleSearch}
      />
      <Content
        image_array={image_array}
        imagepointer={imagepointer}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </div>
  );
}

export default App;
