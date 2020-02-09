import debounce from "lodash/debounce";

import React from "react";
import { Search, Popup } from "semantic-ui-react";

class ProviderSearchBar extends React.Component {
  render() {
    return (
      <Popup
        content="Search by name, specialty or address!"
        header="Hint"
        position="top center"
        trigger={
          <Search
            category
            showNoResults={false}
            size="massive"
            loading={this.props.loading}
            onSearchChange={debounce(this.props.onSearchChange, 500, {
              leading: true
            })}
            value={this.props.value}
          />
        }
      />
    );
  }
}

export default ProviderSearchBar;
