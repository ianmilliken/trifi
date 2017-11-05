import React from "react";
import format from "date-fns/format";

export default class GalleriesPreview extends React.Component {
  render() {
    const {entry, widgetFor} = this.props;

    // Fetch the data from the provided gallery ID
    console.log('LOOK AT ME');

    return (
      <article className="content">
        <header className="container">
          <div className="content-narrow u-center">
            <h1>{ entry.getIn(["data", "title"])}</h1>
          </div>
        </header>
        <section className="cms container">
          <div className="content__body">

          </div>
        </section>
      </article>
    );
  }
}
