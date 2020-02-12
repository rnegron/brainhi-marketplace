import React from "react";

import { Container, Segment, Button } from "semantic-ui-react";

import ProviderSearchBar from "./ProviderSearchBar";

class ProviderSearchBox extends React.Component {
  state = { popupCanOpen: false };

  componentDidMount = () => {
    this.setState({ popupCanOpen: true });
  };

  handlePopupClosed = () => {
    this.setState({ popupCanOpen: false });
  };

  render() {
    const {
      value,
      onSearchChange,
      searchResultsLoading,
      onClickSearchButton
    } = this.props;


    return (
      <Container text style={{ marginTop: "7em" }}>
        <Segment textAlign="center" raised padded>
          <ProviderSearchBar value={value} onSearchChange={onSearchChange} />
          <Button
            data-test-id="provider-search-button"
            content="Search for your provider"
            style={{ marginTop: "2em" }}
            disabled={searchResultsLoading}
            size="big"
            onClick={onClickSearchButton}
          />
        </Segment>
      </Container>
    );
  }
}

export default ProviderSearchBox;
