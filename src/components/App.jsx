// import axios from 'axios';
import * as API from '../api/imageFinder';
import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

// const PER_PAGE = 12;

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [galleryValue, setGalleryValue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageModalUrl, setImageModalUrl] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [errorLoading, setErrorLoading] = useState(null);
  const [id, setId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setIsLoading(true);

    API.getImges(searchQuery, page)
      .then(data => {
        const { hits, totalHits } = data;
        setGalleryValue(prevState => [...prevState, ...hits]);
        setTotalHits(totalHits);
      })
      .catch(
        () => setErrorLoading(true),
        error => console.log(error)
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery, page]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const getAPIImages = value => {
    setSearchQuery(value);
    setGalleryValue([]);
    setTotalHits(0);
    setPage(1);
  };

  const getLargeUrl = (value, id) => {
    setImageModalUrl(value);
    setId(id);

    toggleModal();
  };

  const toggleModal = e => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={getAPIImages} isSubmiting={isLoading} />
      {errorLoading && <p>Ooops.. something goes wrong : {errorLoading}</p>}
      {galleryValue.length > 0 && (
        <ImageGallery data={galleryValue} getLargeUrl={getLargeUrl} />
      )}
      {isLoading && <Loader />}
      {isModalOpen && (
        <Modal imgUrl={imageModalUrl} id={id} onModal={toggleModal} />
      )}
      {totalHits / 12 >= 1 && !isLoading && <Button onLoadMore={loadMore} />}
    </div>
  );
}

export default App;

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     galleryValue: [],
//     isLoading: false,
//     imageModalUrl: '',
//     totalHits: 0,
//     page: 1,
//     errorLoading: null,
//     id: '',
//     isModalOpen: false,
//   };

//   async componentDidUpdate(_, prevState) {
//     const { searchQuery, page } = this.state;
//     if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
//       try {
//         this.setState({ isLoading: true });
//         const response = await API.getImges(searchQuery, page);
//         const { hits, totalHits } = response;

//         this.setState(prevState => ({
//           galleryValue: [...prevState.galleryValue, ...hits],
//           totalHits,
//         }));
//       } catch (error) {
//         this.setState({ errorLoading: error });
//       } finally {
//         this.setState({ isLoading: false });

//       }
//     }
//   }

//   loadMore =()=>{
//     this.setState(prevState =>({
//       page: prevState.page + 1,
//     }))
//   }

//   getAPIImages = value => {
//     this.setState({
//       searchQuery: value,
//       galleryValue: [],
//       totalHits: 0,
//       page: 1,
//     });
//   };

//   getLargeUrl = (value, id) => {
//     this.setState({
//       imageModalUrl: value,
//       id,
//     })
//     this.toggleModal();
//   };

//   toggleModal = (e)=>{
//     this.setState(({isModalOpen}) =>({isModalOpen: !isModalOpen}))
//   }
//   render() {
//     const { errorLoading, galleryValue, isLoading, imageModalUrl, totalHits, isModalOpen, id } = this.state;

//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.getAPIImages} isSubmiting={isLoading} />
//         {errorLoading && <p>Ooops.. something goes wrong : {errorLoading}</p>}
//         {galleryValue.length > 0 && <ImageGallery data={galleryValue} getLargeUrl={this.getLargeUrl} />}
//         {isLoading && <Loader />}
//         {isModalOpen && <Modal imgUrl={imageModalUrl} id={id} onModal={this.toggleModal} />}
//         {totalHits / 12 >= 1 && !isLoading && <Button onLoadMore={this.loadMore} />}
//       </div>
//     );
//   }
// }
