import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default function Gallery() {

	console.log('Gallery has loaded');
	console.log('----------------------------------------');


	const GalleryDOM = document.getElementById('gallery'),
				GalleryID = GalleryDOM.dataset.galleryId,
				UserID = '19709765',
				ConsumerKey = 'RgAZO3RwsFWdy1eNCnwiC5JaSBxTFypd3cvVbVMl';


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
					image_size: 4,
					consumer_key: ConsumerKey
				}
			})
			.then(function (response) {
				console.log(response);
				for (let photo in response.data.photos) {
					console.log(response.data.photos[photo]);
					let self = response.data.photos[photo],
							instance = <GalleryItem id={self.id} imageURL={self.image_url} />,
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
			console.log(direction);
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
			console.log(direction);
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
					<Button text="Previous" action={this.handlePreviousClick} />
					<Button text="Next" action={this.handleNextClick} />
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
				<ul>{this.props.activePhoto}</ul>
			);
		}
	}


	class GalleryItem extends React.Component {
	  constructor(props) {
	    super(props);
	  }

	  render() {
	    return (
	      <li>
	        <img src={this.props.imageURL} />
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
				<button onClick={this.handleClick}>{this.props.text}</button>
			);
		}
	}


	var GalleryClass;

	if (GalleryDOM) {
		GalleryClass = ReactDOM.render(<GalleryContainer />, GalleryDOM);
	}

}
