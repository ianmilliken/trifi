import React from "react";
import format from "date-fns/format";

export default class JournalPreview extends React.Component {
  render() {
    const {entry, getAsset, widgetFor} = this.props;

    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

    return (
      <article className="j-post">
        <section className="p-banner">
          <div className="container u-center-group">
            <div className="p-banner__background" style={{backgroundImage: image && `url(${image})`}}></div>
            <div className="u-group">
              <div className="p-banner__location">
                <i className="fa fa-map-marker"></i>
                { widgetFor("location") }
              </div>
            </div>
            <h1 className="p-banner__title">
              { entry.getIn(["data", "title"])}
            </h1>
            <div className="p-banner__teaser">
              { widgetFor("teaser") }
            </div>
            <p>{ format(entry.getIn(["data", "date"]), "ddd, MMM D, YYYY") }</p>
          </div>
        </section>
        <div className="cms container">
          <div className="j-post__body">
          { widgetFor("body") }
          </div>
        </div>
      </article>
    );
  }
}
