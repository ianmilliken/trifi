import React from "react";
import format from "date-fns/format";

export default class SnapshotsPreview extends React.Component {
  render() {
    const {entry, widgetFor} = this.props;

    return (
      <article className="content">
        <header className="container">
          <div className="content-narrow u-center">
            <h1>{ entry.getIn(["data", "title"])}</h1>
            <p className="content__intro">{ widgetFor("teaser") }</p>
          </div>
        </header>
        <section className="cms container">
          <div className="content__body">
            { widgetFor("body") }
          </div>
        </section>
      </article>
    );
  }
}
