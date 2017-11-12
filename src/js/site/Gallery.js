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
						nextPhoto: newState[1]
					});
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		}

		findPhoto(photo) {
			// React symbol is provided as an argument
			// So we have to access it's ID through props
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
					<li key={i} className="gallery__item"><img src={self.image_url} alt={self.name} title={self.name} /></li>
				);
			}
			return collection;
		}

		renderCurrentPhoto() {
			return (
				<li className="gallery__item is-current"><img className="gallery__image" src={this.state.activePhoto.image_url} alt={this.state.activePhoto.name} title={this.state.activePhoto.name} /></li>
			);
		}

		renderPreviousPhoto() {
			return (
				<li className="gallery__item is-previous"><img className="gallery__image" src={this.state.previousPhoto.image_url} alt={this.state.previousPhoto.name} title={this.state.previousPhoto.name} /></li>
			);
		}

		renderNextPhoto() {
			return (
				<li className="gallery__item is-next"><img className="gallery__image" src={this.state.nextPhoto.image_url} alt={this.state.nextPhoto.name} title={this.state.nextPhoto.name} /></li>
			);
		}



	  render() {
	    return (
	      <div className="gallery-container">
					{/*<Gallery photos={this.state.photos} activePhoto={this.state.activePhoto} />*/}
					<ul className="gallery__list">
						{this.state.activePhoto !== undefined ? this.renderCurrentPhoto() : ''}
						{this.state.previousPhoto !== undefined ? this.renderPreviousPhoto() : ''}
						{this.state.nextPhoto !== undefined ? this.renderNextPhoto() : ''}
					</ul>
					<div className="gallery__controls">
						<Button icon="chevron-left" action={this.handlePreviousClick} />
						<Button icon="chevron-right" action={this.handleNextClick} />
					</div>
				</div>
	    );
	  }
	}


	class Gallery extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			return (
				<ul className="gallery">{this.props.activePhoto}</ul>
			);
		}
	}


	class GalleryItem extends React.Component {
	  constructor(props) {
	    super(props);
	  }

	  render() {
	    return (
	      <div>
					<li className="gallery__item">
		        <div className="photo__panel">
							<span className="gallery__image-holder"><img className="gallery__image" src={this.props.self.image_url} alt={this.props.self.name} title={this.props.self.name} /></span>
						</div>
						{/*
							<div className="info__panel">
								<div className="info__panel__inner">
									<h2 className="photo__title">{this.props.self.name}</h2>
									<p className="photo__description">{this.props.self.description}</p>
								</div>
							</div>
						*/}
		      </li>

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
