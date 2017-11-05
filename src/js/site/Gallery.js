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


	class Gallery extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      photos: []
	    }
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
	        //console.log(response.data.photos[photo]);
	        let instance = <GalleryItem imageURL={response.data.photos[photo].image_url} />,
	            newState = parent.state.photos.concat(instance);
	        parent.setState({
	          photos: newState
	        });
	      }
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	  }

	  componentWillMount() {
	    this.fetchGallery();
	  }

	  render() {
	    return (
	      <ul>{this.state.photos}</ul>
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


	var GalleryClass;

	if (GalleryDOM) {
		GalleryClass = ReactDOM.render(<Gallery />, GalleryDOM);
	}

}
