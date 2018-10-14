/**
 * @author: Anh Chung
 * @created: 10/14/2018
 * @description:
 */

'use strict'
import React, {Placeholder, Component} from 'react';
import {fetchMovieDetails, fetchMovieReviews, fetchMovies} from "./api";
import Icon from "./Icon";
import Spinner from './Spinner';
function Rating({ label, score, icon }) {
    if (typeof score !== "number" || score < 0) return null;
    return (
        <div className="Rating">
            <div className="small-title">{label}</div>
            {icon && (
                <div>
                    <Icon type={icon} size="medium" />
                </div>
            )}
            <div className="rating-score">{score}%</div>
        </div>
    );
}
function MovieDetails({data}) {
    const { ratingSummary, ratings, title, posters } = data;
    console.log(data);
    return (
        <div className="MovieDetails">
            <div className="poster">
                <img src={posters.detailed} alt="poster" />
            </div>
            <div className="details">
                <h1>{title}</h1>
                <div className="ratings">
                    <Rating
                        label="Tomatometer"
                        score={ratings.critics_score}
                        icon={ratings.critics_rating}
                    />
                    <Rating
                        label="Audience"
                        score={ratings.audience_score}
                        icon={ratings.audience_rating}
                    />
                </div>
                <div className="critic">
                    <div className="small-title">Critics consensus</div>
                    {ratingSummary.consensus}
                </div>
            </div>
        </div>
    );
}
function MovieReview({ quote, critic }) {
    return (
        <div className="MovieReview box">
            <div>{quote}</div>
            <div className="sub-text">{critic.name}</div>
        </div>
    );
}

function MovieReviews({ reviews }) {

    return (
        <div className="MovieReviews">
            {reviews.map(review => <MovieReview key={review.id} {...review} />)}
        </div>
    );
}

export default class MoviePage extends  Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            movieDetail: {
                ratingSummary: '',
                ratings: [],
                title: '',
                posters: {
                    detailed: ''
                }
            },
            reviewMovie: ''
        };
    }
    async componentDidMount() {
        let data = await fetchMovieDetails(this.props.id);
        let reviews = await fetchMovieReviews(this.props.id);
        this.setState({ movieDetail: data, reviewMovie: reviews})
    }
    componentDidUpdate(prevProps, preState){
        console.log(prevProps, preState);
    }
    render(){
        return (
            <>
              <MovieDetails data={this.state.movieDetail} />
              <Placeholder delayMs={500} fallback={<Spinner />}>
                    <MovieReviews reviews={this.state.reviewMovie} />
                </Placeholder>
            </>
        );
    }
}
