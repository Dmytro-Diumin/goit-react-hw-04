import "./App.css";
import ImageModal from "./components/imageModal/ImageModal";
import { LoadMoreBtn } from "./components/loadMoreBtn/LoadMoreBtn";
import { SearchBar } from "./components/searchBar/SearchBar";
import { Audio, DNA } from "react-loader-spinner";

function App() {
  return (
    <>
      <SearchBar></SearchBar>
      {/* <ImageModal></ImageModal> */}
      <DNA></DNA>
      <LoadMoreBtn></LoadMoreBtn>
    </>
  );
}

export default App;
