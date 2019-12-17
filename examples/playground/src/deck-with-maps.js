import React, {Component} from 'react';
import DeckGL from '@deck.gl/react';
import {View} from '@deck.gl/core';

export default class DeckWithMaps extends Component {
  constructor(props) {
    super(props);
    this._deckRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.initialViewState !== prevProps.initialViewState) {
      this._deckRef.current.setViewState(this.props.initialViewState);
    }
  }

  render() {
    const {views = []} = this.props;

    const maps = [];
    for (const view of views) {
      if (view.props.map || view.props.mapStyle) {
        maps.push(
          <View id={view.props.id} key={view.props.id}>
            <this.props.Map
              reuseMap
              mapStyle={view.props.mapStyle}
              mapboxApiAccessToken={view.props.mapToken || this.props.mapboxApiAccessToken}
            />
          </View>
        );
      }
    }

    return (
      <DeckGL id="json-deck" ref={this._deckRef} {...this.props}>
        {maps}
      </DeckGL>
    );
  }
}
