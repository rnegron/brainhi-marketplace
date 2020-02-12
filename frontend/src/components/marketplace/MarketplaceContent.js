import React from "react";
import { withRouter } from "react-router-dom";

import times from "lodash/times";

import { Container, Header, Segment } from "semantic-ui-react";

import ProviderCard from "../providers/ProviderCard";
import ProviderCardGroup from "../providers/ProviderCardGroup";
import ProviderSearchBox from "../providers/ProviderSearchBox";

import PlaceholderCard from "../extras/PlaceholderCard";

import api from "../../services/api";

const INITIAL_STATE = {
  searchResultsLoading: false,
  providerCardsLoading: true,
  providers: [],
  searchTerm: ""
};

class MarketplaceContent extends React.Component {
  state = INITIAL_STATE;

  fetchAllProviders = async () => {
    let response = await api.get("providers/");

    this.setState({
      providerCardsLoading: false,
      providers: response.data.results
    });
  };

  onSearchChange = (e, { value }) => {
    this.setState({ searchTerm: value });
  };

  onClickSearchButton = async () => {
    const { searchTerm } = this.state;

    if (!searchTerm) {
      return this.fetchAllProviders();
    }

    this.setState({ searchResultsLoading: true, providerCardsLoading: true });

    try {
      let response = await api.get(`providers/search/`, {
        params: {
          search_term: searchTerm
        }
      });

      this.setState({
        providers: response.data.results,
        searchResultsLoading: false,
        providerCardsLoading: false
      });
    } catch (err) {
      console.error(err);
      // TODO: Alert that there was a problem
      this.setState({
        providers: [],
        searchResultsLoading: false
      });
    }
  };

  getPlaceholderCards() {
    return times(25, id => <PlaceholderCard key={id} />);
  }

  getRealCards(providers) {
    return providers.map(
      ({ id, name, picture, specialty, address, bio, phone_number }) => (
        <ProviderCard
          key={id}
          id={id}
          name={name}
          picture={picture}
          specialty={specialty}
          address={address}
          bio={bio}
          phone={phone_number}
        />
      )
    );
  }

  // Return real provider cards or placeholders if still loading
  getProviderCards(loading) {
    const { providers } = this.state;

    if (loading) {
      return (
        <ProviderCardGroup>{this.getPlaceholderCards()}</ProviderCardGroup>
      );
    } else {
      if (providers.length === 0) {
        return (
          <Segment
            placeholder
            textAlign="center"
            style={{ margin: "2em 0em 0em", padding: "1em 0em" }}
          >
            <Header
              data-test-id="no-providers"
              as="h1"
              content="No providers found!"
            />
          </Segment>
        );
      } else {
        return (
          <ProviderCardGroup>{this.getRealCards(providers)}</ProviderCardGroup>
        );
      }
    }
  }

  componentDidMount = async () => {
    await this.fetchAllProviders();
  };

  render() {
    return (
      <div>
        <ProviderSearchBox
          loading={this.state.searchResultsLoading}
          value={this.state.searchTerm}
          onSearchChange={this.onSearchChange}
          onClickSearchButton={this.onClickSearchButton}
        />
        <Container style={{ marginTop: "5em" }}>
          {this.getProviderCards(this.state.providerCardsLoading)}
        </Container>
      </div>
    );
  }
}

export default withRouter(MarketplaceContent);
