import React from 'react';
import _ from 'lodash';
import { Button, Search } from 'semantic-ui-react';

class VenueNav extends React.Component {
  constructor() { super() }
  componentWillMount() {
    this.resetComponent();
    if (!this.props.list || !this.props.list.length) {
      this.props.actions.index();
    }
  }
  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })
  handleResultSelect = (e, { result }) => {
    this.props.navigateTo(result.id);
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.list, isMatch),
      })
    }, 300)
  }

  getIndexFrom = (id) => {
    if (!this.props.list.length) return 0;
    return this.props.list.findIndex(venue => venue.id == id);
  }

  render() {
    const { navigateTo, id } = this.props;
    const { isLoading, value, results } = this.state;
    const currentIndex = this.getIndexFrom(id);

    return (
      <div className='venue-navigation'>
        {
          currentIndex == 0 ?
            <Button content='Previous' icon='left arrow' labelPosition='left' disabled/>
          : <Button content='Previous' icon='left arrow' labelPosition='left' onClick={() => navigateTo(this.props.list[currentIndex - 1].id)} />
        }
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
          results={results}
          value={value}
        />
        {
          currentIndex == (this.props.list.length - 1) ?
            <Button content='Next' icon='right arrow' labelPosition='right' disabled/>
          : <Button content='Next' icon='right arrow' labelPosition='right' onClick={() => navigateTo(this.props.list[currentIndex + 1].id)} />
        }
      </div>
    );
  }
}
export default VenueNav;
