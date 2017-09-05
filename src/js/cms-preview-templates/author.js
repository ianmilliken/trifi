import React from "react";

export default class AuthorsPreview extends React.Component {
  render: function() {
    return h('div', {},
      h('h1', {}, 'Authors'),
      this.props.widgetsFor('authors').map(function(author, index) {
        return h('div', {key: index},
          h('hr', {}),
          h('strong', {}, author.getIn(['data', 'first_name'])),
          author.getIn(['widgets', 'bio'])
        );
      })
    );
  }
}
