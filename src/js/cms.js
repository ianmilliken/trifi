import React from "react";
import CMS from "netlify-cms";

import JournalPreview from "./cms-preview-templates/journal";
import SnapshotsPreview from "./cms-preview-templates/snapshots";


// Example of creating a custom color widget
class ColorControl extends React.Component {
  render() {
    return (
      <input
          style={{height: "80px"}}
          type="color"
          value={this.props.value}
          onInput={(e) => this.props.onChange(e.target.value)}
      />
    );
  }
}

CMS.registerPreviewStyle("/css/app.css");
CMS.registerPreviewTemplate("journal", JournalPreview);
CMS.registerPreviewTemplate("snapshots", SnapshotsPreview);
CMS.registerWidget("color", ColorControl);
