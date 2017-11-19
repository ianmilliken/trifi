import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default function Gallery() {

	console.log('Gallery has loaded');
	console.log('----------------------------------------');


	const GalleryDOM = document.getElementById('gallery'),
				GalleryID = GalleryDOM.dataset.galleryId;

	class GalleryContainer extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				photos: [],
				loading: true,
			}
			this.handleNextClick = this.handleNextClick.bind(this);
			this.handlePreviousClick = this.handlePreviousClick.bind(this);
			this.findPhoto = this.findPhoto.bind(this);
			this.handleKeyDown = this.handleKeyDown.bind(this);
		}

		fetchGallery() {
			const parent = this;
			axios.get('https://api.500px.com/v1/users/' + USER_ID + '/galleries/' + GalleryID + '/items', {
				params: {
					image_size: 1600,
					rpp: 50,
					consumer_key: CONSUMER_KEY
				}
			})
			.then(function (response) {
				//console.log(response);
				for (let photo in response.data.photos) {
					//console.log(response.data.photos[photo]);
					let self = response.data.photos[photo],
							newState = parent.state.photos.concat(self);
					parent.setState({
						photos: newState,
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
			var nextDOM = document.querySelector('.is-next');

			if (nextDOM !== null) {
				var previousDOM = document.querySelector('.is-previous');
				var currentDOM = document.querySelector('.is-current');
				var futureDOMId = parseFloat(nextDOM.getAttribute('id')) + 1;
				var futureDOM = document.getElementById(futureDOMId);

				currentDOM.classList.add('is-previous');
				currentDOM.classList.remove('is-current');
				nextDOM.classList.add('is-current');
				nextDOM.classList.remove('is-next');

				if (previousDOM !== null) {
					previousDOM.classList.add('is-history');
					previousDOM.classList.remove('is-previous');
				}

				if (futureDOM !== null) {
					futureDOM.classList.add('is-next');
					futureDOM.classList.remove('is-future');
				}
			} else {
				//console.log('There is no next photo.');
			}
		}

		handlePreviousClick(direction) {
			var previousDOM = document.querySelector('.is-previous');

			if (previousDOM !== null) {
				var currentDOM = document.querySelector('.is-current');
				var nextDOM = document.querySelector('.is-next');
				var historyDOMId = parseFloat(previousDOM.getAttribute('id')) - 1;
				var historyDOM = document.getElementById(historyDOMId);

				currentDOM.classList.add('is-next');
				currentDOM.classList.remove('is-current');
				previousDOM.classList.add('is-current');
				previousDOM.classList.remove('is-previous');

				if (historyDOM !== null) {
					historyDOM.classList.add('is-previous');
					historyDOM.classList.remove('is-history');
				}

				if (nextDOM !== null) {
					nextDOM.classList.add('is-future');
					nextDOM.classList.remove('is-next');
				}

			} else {
				//console.log('There is no previous photo.');
			}
		}

		handleKeyDown(event) {
			event.preventDefault();
			const LEFT_ARROW = 37,
						RIGHT_ARROW = 39;
			switch (event.keyCode) {
				case LEFT_ARROW:
					this.handlePreviousClick('previous');
					break;
				case RIGHT_ARROW:
					this.handleNextClick('next');
					break;
				default:
					break;
			}
		}

	  componentWillMount() {
			document.addEventListener('keydown', this.handleKeyDown);
			this.fetchGallery();
		}

		componentWillUnmount() {
			document.removeEventListener('keydown', this.handleKeyDown);
		}

		renderPhotos() {
			const source = this.state.photos;
			let collection = [];
			for (let i in source) {
				let self = source[i];
				if (self !== undefined) {
					collection.push(
						<li key={i} id={i}
							className={"gallery__item"
							+ (i == 0 ? " is-current" : "")
							+ (i == 1 ? " is-next" : "")
							+ (i == 2 ? " is-future" : "")
							+ (i > 2 ? " is-future" : "")}>
							{this.state.loading ? <span className="gallery__loader"><i className="fa fa-circle-o-notch fa-spin"></i></span> : <img className="gallery__image" src={self.image_url} alt={self.name} title={self.name} />}
							<div className="photo__info">
								<h2 className="photo__title">{self.name}</h2>
								<p className="photo__description">{self.description}</p>
							</div>
						</li>
					);
				}
			}
			return collection;
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
