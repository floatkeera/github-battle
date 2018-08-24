import React from 'react';
import queryString from 'query-string';
import { battle } from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

function Player({label, score, profile}){
	return(
		<div>
			<h1 className='header'>{label}</h1>
			<h3 style={{textAlign: 'center'}}>Score: {score}</h3>

			<PlayerPreview 
				avatar = {profile.avatar_url}
				username = {profile.login}>
				<ul className='space-list-items'>
        			{profile.name
        			 && <li>{profile.name}</li>}
        			{profile.location && <li>{profile.location}</li>}
        			{profile.company && <li>{profile.company}</li>}
        			<li>Followers: {profile.followers}</li>
        			<li>Following: {profile.following}</li>
        			<li>Public Repos: {profile.public_repos}</li>
        			{profile.blog && <li><a href={'http://'+ profile.blog}>{profile.blog}</a></li>}
      			</ul>

			</PlayerPreview>
		</div>



	);
}

Player.propTypes = {
	label: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.object.isRequired
};

class Results extends React.Component{

	constructor(props){
		super(props);

		this.state={
			winner: null,
			loser: null,
			error: null,
			loading: true
		};
	}

	async componentDidMount(){
		const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search);
		const players = await battle([
			playerOneName,
			playerTwoName
		])

			if(players == null){
				return this.setState(() => ({
						error: 'Check both users are on Github',
						loading: false,
					}));
				}
			

			this.setState(() =>({

					error:null,
					winner: players[0],
					loser: players[1],
					loading: false,
				}));
		
	}

	render() {
		var {error, winner, loser, loading} = this.state;

		if(loading == true){
			return <Loading text='Computing results'></Loading>;
		}

		if(error){
			return(<div>
				<p>{error}</p>
				<Link to='/battle'>Reset</Link>
			</div>);
		}


		
		return (
			<div className='row'>
				<Player label='Winner'
					score={winner.score}
					profile={winner.profile}/>
				<Player
					label='Loser'
					score ={loser.score}
					profile={loser.profile}/>
			</div>
		);
	}
}

export default Results;

