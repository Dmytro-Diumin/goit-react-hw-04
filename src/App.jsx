import { useEffect, useState, useRef } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import ImageModal from "./components/imageModal/ImageModal";
import LoadMoreBtn from "./components/loadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/searchBar/SearchBar";
import getPhotos from "./components/API/imageAPI";
import ErrorMessage from "./components/errorMessage/ErrorMessage";
import ImageGallery from "./components/imageGallery/ImageGallery";

import { DNA } from "react-loader-spinner";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(null);
  const [modalPhotoIndex, setModalPhotoIndex] = useState(null);
  const imageListRef = useRef(null);

  const handleNextPhoto = () => {
    setModalPhotoIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevPhoto = () => {
    setModalPhotoIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      if (searchQuery.length > 0) {
        try {
          setLoader(true);
          setError(false);
          const fetchedData = await getPhotos(searchQuery, page);
          setTotalPages(fetchedData.total_pages);
          setPhotos((prevPhotos) => [...prevPhotos, ...fetchedData.results]);
        } catch (error) {
          setError(true);
        } finally {
          setLoader(false);
        }
      }
    };
    fetchPhotos().then(() => {
      if (imageListRef.current) {
        const firstImage = imageListRef.current.firstElementChild;
        const firstImageHeight = firstImage.getBoundingClientRect().height;
        imageListRef.current.scrollTop -= 2 * firstImageHeight;
      }
    });
  }, [searchQuery, page]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) {
        if (e.key === "ArrowLeft") {
          handlePrevPhoto();
        } else if (e.key === "ArrowRight") {
          handleNextPhoto();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, handleNextPhoto, handlePrevPhoto]);

  useEffect(() => {
    if (isModalOpen && photos.length > 0) {
      setModalPhotoIndex(0);
    }
  }, [isModalOpen, photos]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPhotos([]);
    setPage(1);
  };

  const openModal = (photo, size) => {
    const url = size === "regular" ? photo.urls.regular : photo.urls.small;
    setModalPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalPhoto(null);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} setPhotos={setPhotos} />
      <Toaster position="top-right" reverseOrder={false} />
      {error && <ErrorMessage message="Error fetching photos" />}
      <ImageGallery photos={photos} openModal={openModal} setPage={setPage} />
      {loader ? (
        <DNA />
      ) : (
        <>{totalPages > page && <LoadMoreBtn onLoadMore={handleLoadMore} />}</>
      )}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          photo={photos[modalPhotoIndex]}
          onClose={closeModal}
          onNext={handleNextPhoto}
          onPrev={handlePrevPhoto}
        />
      )}
    </>
  );
}

export default App;
