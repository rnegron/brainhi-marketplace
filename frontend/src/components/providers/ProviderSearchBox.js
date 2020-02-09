import React from "react";

import { Container, Segment, Button, Popup } from "semantic-ui-react";

import ProviderSearchBar from "./ProviderSearchBar";

class ProviderSearchBox extends React.Component {
  render() {
    const {
      value,
      onSearchChange,
      searchResultsLoading,
      onClickSearchButton
    } = this.props;

    return (
      <Container text style={{ marginTop: "7em" }}>
        <Popup
          content="Search by name, specialty or address!"
          header="Hint"
          position="top center"
          hideOnScroll
          on="click"
          trigger={
            <Segment textAlign="center" raised padded>
              <ProviderSearchBar
                value={value}
                onSearchChange={onSearchChange}
              />
              <Button
                style={{ marginTop: "2em" }}
                disabled={searchResultsLoading}
                size="big"
                onClick={onClickSearchButton}
                animated="fade"
              >
                <Button.Content visible>
                  Search for your provider
                </Button.Content>
                <Button.Content hidden>Begin search</Button.Content>
              </Button>
            </Segment>
          }
        />
      </Container>
    );
  }
}

export default ProviderSearchBox;
