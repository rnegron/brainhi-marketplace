import React from "react";
import { Search } from "semantic-ui-react";

class ProviderSearchBar extends React.Component {
  render() {
    return (
      <Search
        category
        data-test-id="provider-search-bar"
        showNoResults={false}
        size="massive"
        loading={this.props.loading}
        onSearchChange={this.props.onSearchChange}
        value={this.props.value}
      />
    );
  }
}

export default ProviderSearchBar;
