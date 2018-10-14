'use strict'
import React, {Component} from "react";
import { fetchMovies } from "./api";
import { createFetcher } from "./future";
import Icon from "./Icon";
import Spinner from "./Spinner";
import "./MoviePageList.css";

const MoviesFetcher = createFetcher(fetchMovies);

function Score({ score, icon }) {
    if (score === null || score < 0) return null;
    return (
        <>
            <Icon type={icon} size="tiny" /> {score}%
        </>
    );
}

function Movie({
                   id,
                   title,
                   tomatoScore,
                   tomatoIcon,
                   popcornIcon,
                   popcornScore,
                   theaterReleaseDate,
                   loading,
                   onClick
               }) {
    return (
        <div
            className={`Movie box ${loading ? "loading" : ""}`}
            onClick={() => onClick(id)}
        >
            <div className="content">
                <div className="title">{title}</div>
                <div className="sub-text">
                    <Score icon={tomatoIcon} score={tomatoScore} /> ·{" "}
                    <Score icon={popcornIcon} score={popcornScore} /> ·{" "}
                    {theaterReleaseDate}
                </div>
            </div>
            {loading && <Spinner size="small" />}
        </div>
    );
}

export default class  MoviePageList extends Component  {
    //const movies = MoviesFetcher.read();
    constructor(props, context) {
        super(props, context);
        this.state = {
            movies: []
        };
    }
    async componentDidMount() {
        let data = await fetchMovies();
        this.setState({ movies: data })
    }
     render() {
         return (
             <div className="IndexPage">
             <h1>Top Box Office</h1>
             <div>
                 {this.state.movies.map(infos => (
                     <Movie
                         key={infos.id}
                         {...infos}
                         loading={infos.id === this.props.loadingMovieId}
                         onClick={() => this.props.onMovieClick(infos.id)}
                     />
                 ))}
             </div>
         </div>
         )
     }
}
