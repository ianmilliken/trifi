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
				activePhoto: []
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
					console.log(response.data.photos[photo]);
					let self = response.data.photos[photo],
							instance = <GalleryItem id={self.id} self={self} handlePreviousClick={parent.handlePreviousClick} handleNextClick={parent.handleNextClick} photos={parent.state.photos} />,
							newState = parent.state.photos.concat(instance);
					parent.setState({
						photos: newState,
						activePhoto: newState[0]
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
			return photo.props.id === this.state.activePhoto.props.id;
		}

		handleNextClick(direction) {
			//console.log(direction);
			var photos = this.state.photos,
					last_photo = photos.length - 1,
					current_photo = photos.findIndex(this.findPhoto),
					next_photo = current_photo + 1,
					next_photo_object;

			if (next_photo <= last_photo) {
				next_photo_object = photos[next_photo];
			} else {
				next_photo_object = photos[0];
			}

			this.updateActivePhoto(next_photo_object);
		}

		handlePreviousClick(direction) {
			//console.log(direction);
			var photos = this.state.photos,
					last_photo = photos.length - 1,
					current_photo = photos.findIndex(this.findPhoto),
					previous_photo = current_photo - 1,
					previous_photo_object;

			if (previous_photo >= 0) {
				previous_photo_object = photos[previous_photo];
			} else {
				previous_photo_object = photos[last_photo];
			}

			this.updateActivePhoto(previous_photo_object);
		}

		updateActivePhoto(photo) {
			this.setState({
				activePhoto: photo
			});
		}

	  componentWillMount() {
	    this.fetchGallery();
	  }

	  render() {
	    return (
	      <div className="gallery-container">
					<Gallery photos={this.state.photos} activePhoto={this.state.activePhoto} />
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
	      <li className="gallery__item">
					<div className="info__panel">
						<div className="info__panel__inner">
							<h2 className="photo__title">{this.props.self.name}</h2>
							<p className="photo__description">{this.props.self.description}</p>
							<div className="photo__details">
								<p>Taken: {this.props.self.created_at}</p>
								<p>Location: {this.props.self.location}</p>
							</div>
						</div>
						<div className="gallery__controls">
							<Button text="Previous" action={this.props.handlePreviousClick} />
							<Button text="Next" action={this.props.handleNextClick} />
						</div>
					</div>
	        <div className="photo__panel">
						<img className="gallery__image" src={this.props.self.image_url} alt={this.props.self.name} title={this.props.self.name} />
					</div>
	      </li>
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
				<button className="gallery__button" onClick={this.handleClick}>{this.props.text}</button>
			);
		}
	}


	var GalleryClass;

	if (GalleryDOM) {
		GalleryClass = ReactDOM.render(<GalleryContainer />, GalleryDOM);
	}

}
