import React, { Component } from 'react';
import MovieList from './components/MovieList';
import './App.css';
import debounce from './utils';

class App extends Component {
  state = {
    list: [],
    pageCount: null,
    page: 1,
    loading: true
  };

  componentDidMount() {
    this.fetchPopular(1)
      .then(res =>
        this.setState({ list: res.results, pageCount: res.total_pages })
      )
      .catch(err => console.log(err))
      .finally(() => {
        this.setState({ loading: false });
      });

    const handleScroll = evt => {
      this.handleScrollNearEnd(
        document.documentElement.scrollHeight,
        window.pageYOffset
      );
    };

    const debouncedhandleScroll = debounce(handleScroll.bind(this), 100);

    window.addEventListener('scroll', debouncedhandleScroll);
  }

  fetchPopular = async page => {
    const response = await fetch(`http://localhost:5000/api/popular/${page}`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleScrollNearEnd = (scrollHeight, pageOffset) => {
    const threshold = 0.5;
    if (pageOffset / scrollHeight > threshold) {
      const nextPage = this.state.page + 1;
      this.setState({ loading: true });
      this.fetchPopular(nextPage)
        .then(resp => {
          const previousList = this.state.list;
          this.setState({
            page: nextPage,
            list: [...previousList, ...resp.results]
          });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  };

  handleSearch = async query => {
    const response = await fetch(
      `http://localhost:5000/api/search/movie/${query}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const body = await response.json();
    this.setState({ list: body.results });
  };

  handleSearchOnChange = debounce(value => {
    this.handleSearch(value);
  }, 500);

  handleNext = () => {
    if (this.state.page === this.state.pageCount) {
      console.log('handleNext, no more pages to advance');
      return;
    }

    const nextPage = this.state.page + 1;

    this.setState({ loading: true });

    this.fetchPopular(nextPage)
      .then(resp => {
        console.log('resp', resp);
        this.setState({ page: nextPage, list: resp.results });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handlePrevious = () => {
    if (this.state.page === 1) {
      console.log('already on page 1');
      return;
    }

    const previousPage = this.state.page - 1;

    this.setState({ loading: true });

    this.fetchPopular(previousPage)
      .then(({ results }) => {
        this.setState({ page: previousPage, list: results });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { list } = this.state;

    return (
      <div className="App">
        {this.state.loading && (
          <div
            style={{
              position: 'absolute',
              width: '200px',
              backgroundColor: 'red',
              height: '200px',
              top: '50%',
              left: '50%',
              textAlign: 'center',
              transform: 'translate(-50%, 50%'
            }}
          >
            Loading...
          </div>
        )}
        <button onClick={this.handlePrevious}>Previous</button>
        <button onClick={this.handleNext}>Next</button>
        <span style={{ color: 'white' }}>On Page {this.state.page}</span>
        <input
          type="text"
          placeholder="Search movies..."
          className="search"
          // https://medium.com/trabe/react-syntheticevent-reuse-889cd52981b6
          onChange={({ target: { value } }) => this.handleSearchOnChange(value)}
        />

        <MovieList list={list} />
      </div>
    );
  }
}

export default App;
