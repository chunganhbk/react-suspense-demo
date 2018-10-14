import React, {PureComponent} from 'react';
import logo from './logo.svg';
import './App.css';
import  MoviePageList from './MoviePageList';
import  MoviePage from './MoviePage';
class App extends PureComponent {
    state = {
        currentMovieId: null,
        showDetail: false
    };
    componentDidUpdate(prevProps, prevState){
        if(prevState.showDetail !== this.state.showDetail &&
            prevState.currentMovieId !== this.state.currentMovieId){
            window.scrollTo(0,0)
        }
    }
    render() {
        const {showDetail, currentMovieId} = this.state;
        return (
            <div className='App'>
                {!showDetail ? this.renderList() :
                            this.renderDetail(currentMovieId)}
            </div>
        );
    }
    renderDetail (id){
        return (
            <div>
                <button
                    className='App-callback'
                    onClick={this.handleBackClick.bind(this)}>
                </button>
                <MoviePage id={id} />
            </div>
        )
    }
    renderList (){
        return (
            <MoviePageList onMovieClick={this.handleMovieClick} />
        )
    }
    handleMovieClick = movieId => {
        this.setState({currentMovieId: movieId, showDetail: true});
    };

    handleBackClick = () => {
        this.setState({currentMovieId: null, showDetail: false});
    };
}


export default App;
