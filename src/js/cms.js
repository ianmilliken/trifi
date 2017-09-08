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

CMS.registerEditorComponent({
      id: "youtube",
      label: "Youtube",
      fields: [{name: 'id', label: 'Youtube Video ID'}],
      pattern: /^{{<\s?youtube (\S+)\s?>}}/,
      fromBlock: function(match) {
        return {
          id: match[1]
        };
      },
      toBlock: function(obj) {
        return '{{< youtube ' + obj.id + ' >}}';
      },
      toPreview: function(obj) {
        return (
          <img src="http://img.youtube.com/vi/' + obj.id + '/maxresdefault.jpg" alt="Youtube Video"/>
        );
      }
});

CMS.registerEditorComponent({
      id: "image_with_caption",
      label: "Image with caption",
      fields: [
        {
          name: 'src',
          label: 'Source',
          widget: 'string'
        },
        {
          name: 'alt',
          label: 'Alt',
          widget: 'string'
        },
        {
          name: 'link',
          label: 'Link to',
          widget: 'string'
        },
        {
          name: 'caption',
          label: 'Caption',
          widget: 'text'
        }
      ],
      pattern: /^{{<\s?500px src="(\S+)" alt="(\S+)" href="(\S+)"\s?>}}\s?(.*)\s?{{<\/\s?500px\s?>}}$/,
      // fromBlock: get arguement position from pattern regexp
      fromBlock: function(match) {
        return {
          src: match[1],
          alt: match[2],
          link: match[3],
          caption: match[4]
        };
      },
      // toBlock: this is the format returned to the markdown editor
      toBlock: function(obj) {
        return (
          '{{< 500px src="' + obj.src + '" alt="' + obj.alt + '" href="' + obj.link + '">}}' + obj.caption + '{{</ 500px >}}'
        );
      },
      // toPreview: this is the format returned to the markdown preview area
      // @NOTE Watch out for the matched values form the fromBlcok rendering
      //       parts of the regexp that should not be returned, i.e. the
      //       attribute tags that encose the values themselves
      toPreview: function(obj) {
        return (
          <div className="cms-embed-image">
            <div className="pixels-photo">
              <p>
                <img src={obj.src} alt={obj.alt} />
              </p>
              <a href={obj.link}></a>
            </div>
            <p><i className="fa fa-camera"></i>{obj.caption}</p>
          </div>
        );
      }
});
