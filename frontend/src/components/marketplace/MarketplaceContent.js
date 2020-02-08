import React from "react";

import times from "lodash/times";
import { Container } from "semantic-ui-react";

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
    let results = await api.get("providers");

    this.setState({
      providerCardsLoading: false,
      providers: results.data.providers
    });
  };

  onSearchChange = (e, { value }) => {
    this.setState({ searchTerm: value });

    setTimeout(async () => {
      if (this.state.searchTerm.length < 1) {
        return this.setState({ searchResultsLoading: false, searchTerm: "" });
      }
    }, 300);
  };

  onClickSearchButton = async () => {
    const { searchTerm } = this.state;

    console.log({ searchTerm });

    if (!searchTerm) {
      return this.fetchAllProviders();
    }

    this.setState({ searchResultsLoading: true, providerCardsLoading: true });

    try {
      let results = await api.get(`providers/search/${searchTerm}`);

      this.setState({
        providers: [],
        searchResultsLoading: false
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

  // Return real provider cards or placeholders if still loading
  getProviderCards(loading) {
    if (loading) {
      return times(10, id => {
        return <PlaceholderCard key={id} />;
      });
    } else {
      return this.state.providers.map(
        ({ id, name, picture, specialty, bio }) => {
          return (
            <ProviderCard
              key={id}
              name={name}
              picture={picture}
              specialty={specialty}
              bio={bio}
            />
          );
        }
      );
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
          <ProviderCardGroup>
            {this.getProviderCards(this.state.providerCardsLoading)}
          </ProviderCardGroup>
        </Container>
      </div>
    );
  }
}

export default MarketplaceContent;
