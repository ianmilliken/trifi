import React from "react";
import format from "date-fns/format";
import axios from 'axios';

export default class GalleriesPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    }
  }

  render() {
    const {entry, widgetFor} = this.props,
          user_id = "19709765",
          gallery_id = entry.getIn(['data', 'gallery_id']),
          _this = this;
    let photoArray = [];


    // Fetch the data from the provided gallery ID
    axios.get('https://api.500px.com/v1/users/' + user_id + '/galleries/' + gallery_id + '/items', {
      params: {
        image_size: 4,
        consumer_key: "RgAZO3RwsFWdy1eNCnwiC5JaSBxTFypd3cvVbVMl"
      }
    })
    .then(function (response) {
      console.log(response);
      //photoData = response.data.photos;
      _this.setState({
        photos: response.data.photos
      });
    })
    .catch(function (error) {
      console.log(error);
    });


    if (this.state.photos.length > 0) {
      for (var i in this.state.photos) {
        let self = this.state.photos[i];
        photoArray.push(
          <div>
            <img src={self.image_url} alt={self.name} />
            <p>{self.description}</p>
          </div>
        );
      }
    }


    return (
      <article className="content">
        <header className="container">
          <div className="content-narrow u-center">
            <h1>{ entry.getIn(["data", "title"])}</h1>
          </div>
        </header>
        <section className="cms container">
          <div className="content__body">
            {photoArray}
          </div>
        </section>
      </article>
    );
  }
}
