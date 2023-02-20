import { useEffect } from 'react';
import PropTypes from 'prop-types';

function Modal({ onModal, imgUrl, id }) {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });

  function closeModal(e) {
    if (e.code === 'Escape') {
      onModal();
    }
  }

  const closeModalOnBackDrop = e => {
    if (e.target === e.currentTarget) onModal();
  };

  return (
    <div className="Overlay" onClick={closeModalOnBackDrop}>
      <div className="Modal">
        <img src={imgUrl} alt={id} />
      </div>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

// import { Component } from 'react';
// import PropTypes from 'prop-types';

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.closeModal);
//   }
//   closeModal = e => {
//     if (e.code === 'Escape') {
//       this.props.onModal();
//     }
//   };

//   closeModalOnBackDrop = e => {
//     if (e.target === e.currentTarget) this.props.onModal();
//   };

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.closeModal);
//   }

//   render() {
//     const { imgUrl, id } = this.props;

//     return (
//       <div className="Overlay" onClick={this.closeModalOnBackDrop}>
//         <div className="Modal">
//           <img src={imgUrl} alt={id} />
//         </div>
//       </div>
//     );
//   }
// }

// export default Modal;

// Modal.propTypes = {
//   imgUrl: PropTypes.string.isRequired,
//   id: PropTypes.number.isRequired,
// };
