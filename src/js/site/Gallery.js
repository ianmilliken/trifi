import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default function Gallery() {

	console.log('Gallery has loaded');
	console.log('----------------------------------------');


	const GalleryDOM = document.getElementById('gallery'),
				GalleryID = GalleryDOM.dataset.galleryId,
				UserID = '19709765',
				ConsumerKey = 'QbKVMdZ4ltpPI7jfFXbaQ4uuMUglNmZGBjPwPCYk';

	class GalleryContainer extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				photos: [],
				activePhoto: undefined,
				previousPhoto: undefined,
				nextPhoto: undefined,
				loading: true,
			}
			this.handleNextClick = this.handleNextClick.bind(this);
			this.handlePreviousClick = this.handlePreviousClick.bind(this);
			this.findPhoto = this.findPhoto.bind(this);
		}

		fetchGallery() {
			const parent = this;
			axios.get('https://api.500px.com/v1/users/' + UserID + '/galleries/' + GalleryID + '/items', {
				params: {
					image_size: 1600,
					consumer_key: ConsumerKey
				}
			})
			.then(function (response) {
				console.log(response);
				for (let photo in response.data.photos) {
					//console.log(response.data.photos[photo]);
					let self = response.data.photos[photo],
							//instance = <GalleryItem id={self.id} self={self} handlePreviousClick={parent.handlePreviousClick} handleNextClick={parent.handleNextClick} photos={parent.state.photos} />,
							newState = parent.state.photos.concat(self);
					parent.setState({
						photos: newState,
						activePhoto: newState[0],
						nextPhoto: newState[1],
						loading: false
					});
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		}

		findPhoto(photo) {
			return photo.id === this.state.activePhoto.id;
		}

		handleNextClick(direction) {
			//console.log(direction);
			var photos = this.state.photos,
					last_photo = photos.length - 1,
					current_photo = photos.findIndex(this.findPhoto),
					next_photo = current_photo + 1,
					next_photo_object;

			var currentDOM = document.querySelector('.is-current');
			var nextDOM = document.querySelector('.is-next');
			currentDOM.classList.add('is-previous');
			currentDOM.classList.remove('is-current');
			nextDOM.classList.add('is-current');
			nextDOM.classList.remove('is-next');

			/*if (next_photo <= last_photo) {
				next_photo_object = photos[next_photo];
			} else {
				next_photo_object = photos[0];
			}

			this.updateActivePhoto(next_photo_object);*/
		}

		handlePreviousClick(direction) {
			//console.log(direction);
			var photos = this.state.photos,
					last_photo = photos.length - 1,
					current_photo = photos.findIndex(this.findPhoto),
					previous_photo = current_photo - 1,
					previous_photo_object;

			var currentDOM = document.querySelector('.is-current');
			var previousDOM = document.querySelector('.is-previous');
			currentDOM.classList.add('is-next');
			currentDOM.classList.remove('is-current');
			previousDOM.classList.add('is-current');
			previousDOM.classList.remove('is-previous');

			/*if (previous_photo >= 0) {
				previous_photo_object = photos[previous_photo];
			} else {
				previous_photo_object = photos[last_photo];
			}

			this.updateActivePhoto(previous_photo_object);*/
		}

		updateActivePhoto(photo) {
			this.setState({
				activePhoto: photo
			});
		}

	  componentWillMount() {
	    this.fetchGallery();
	  }

		renderPhotos() {
			var collection = [];
			for (let i in this.state.photos) {
				let self = this.state.photos[i];
				console.log(self);
				collection.push(
          <li key={i} className={"gallery__item" + (i == 0 ? " is-current" : "") + (i == this.state.photos.length - 1 ? " is-previous" : "") + (i == 1 ? " is-next" : "") + (i != 0 && i != 1 && i != this.state.photos.length - 1 ? " is-upcoming" : "")}>
            {this.state.loading ? <span className="gallery__loader"><i className="fa fa-circle-o-notch fa-spin"></i></span> : <img className="gallery__image" src={self.image_url} alt={self.name} title={self.name} />}
          </li>
				);
			}
			return collection;
		}

		renderCurrentPhoto() {
			console.log('here we go!');
			return (
				<li className="gallery__item is-current">
					<img className="gallery__image" src={this.state.activePhoto.image_url} alt={this.state.activePhoto.name} title={this.state.activePhoto.name} />
				</li>
			);
		}

		renderPreviousPhoto() {
			return (
				<li className="gallery__item is-previous">
					{this.state.loading ? <span className="gallery__loader"><i className="fa fa-circle-o-notch fa-spin"></i></span> : <img className="gallery__image" src={this.state.previousPhoto.image_url} alt={this.state.previousPhoto.name} title={this.state.previousPhoto.name} />}
				</li>
			);
		}

		renderNextPhoto() {
			return (
				<li className="gallery__item is-next">
					{this.state.loading ? <span className="gallery__loader"><i className="fa fa-circle-o-notch fa-spin"></i></span> : <img className="gallery__image" src={this.state.nextPhoto.image_url} alt={this.state.nextPhoto.name} title={this.state.nextPhoto.name} />}
				</li>
			);
		}



	  render() {
	    return (
	      <div className="gallery-container">
					<ul className="gallery__list">
						{this.state.loading ? <span className="gallery__loader"><i className="fa fa-circle-o-notch fa-spin"></i></span> : this.renderPhotos()}
					</ul>
					<div className="gallery__controls">
						<Button icon="chevron-left" action={this.handlePreviousClick} />
						<Button icon="chevron-right" action={this.handleNextClick} />
					</div>
				</div>
	    );
	  }
	}


	class Button extends React.Component {
		constructor(props) {
			super(props);
			this.handleClick = this.handleClick.bind(this);
		}

		handleClick() {
			this.props.action(this.props.text);
		}

		render() {
			return (
				<button className="gallery__button" onClick={this.handleClick}><i className={"fa fa-" + this.props.icon}></i></button>
			);
		}
	}


	var GalleryClass;

	if (GalleryDOM) {
		GalleryClass = ReactDOM.render(<GalleryContainer />, GalleryDOM);
	}

}
