import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';



class Battle extends React.Component{

	state = {
		playerOneName: '',
		playerTwoName: '',
		playerOneImage: null,
		playerTwoImage: null,
	};

	handleSubmit = (id, username) => {
		this.setState(() => ({
			[id+ 'Name']: username,
			[id+ 'Image']: `https://github.com/${username}.png?size=200`
		}));
	}

	handleReset = (id) =>{
		this.setState(()=> ({
			[id+'Name']: '', //computed property names in ES6
			[id+'Image']: null
		}));
	}

	render() {
		const {match} = this.props; //you get match as a prop when your component is called by a Route
		
		const{playerOneName, playerTwoName, playerOneImage, playerTwoImage} = this.state;

		return (
			<div>
				<div className='row'>
					{!playerOneName && 
						<PlayerInput
							id='playerOne'
							label='Player One'
							onSubmit={this.handleSubmit} />}
					{playerOneImage !== null &&
						<PlayerPreview
							avatar={playerOneImage}
							username={playerOneName}>
						<button
							className='reset'
							onClick={()=> this.handleReset('playerOne')}>
							Reset
						</button>
					</PlayerPreview>}
					{!playerTwoName && <PlayerInput
							id='playerTwo'
							label='Player Two'
							onSubmit={this.handleSubmit} />}
					{playerTwoImage !== null &&
					<PlayerPreview
						avatar={playerTwoImage}
						username={playerTwoName}>
						<button
							className='reset'
							onClick={() => this.handleReset('playerTwo')}>
							Reset
						</button>
				</PlayerPreview>}
			</div>
				{playerOneImage && playerTwoImage &&
					<Link
						className='button'
						to={{
							pathname: match.url + '/results',
							search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName //this object is in the location prop of the props of the routing object
						}}>Battle</Link>} 
			</div>
		);
	}
}

class PlayerInput extends React.Component{

	static propTypes = {
		id: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		onSubmit: PropTypes.func.isRequired
	};

	state={
		username: ''
	};

	handleChange = (event) =>{
		const value = event.target.value; //grabs specific text typed in input field

		//must capture event because otherwise after the callback the event will be gone

		this.setState(() => ({
				username: value
		}));
	}

	handleSubmit= (event) =>{
		event.preventDefault();

		//onSubmit is passed from the parent component as a property
		// which will triger the handleSubmit function
		this.props.onSubmit(this.props.id, this.state.username);
	}

	render() {
		const {username} = this.state;
		const {label} = this.props;

		return (
			<form className='column' onSubmit = {this.handleSubmit}>
				<label className='header' htmlFor='username'>
					{label}
				</label>
				<input 
					type="text"
					id='username'
					placeholder='github username'
					autoComplete='off'
					value = {username}
					onChange={this.handleChange}/>
				<button
					className ='button'
					type = 'submit'
					disabled={!this.state.username}> Submit </button>
			</form>
		);
	}
}

export default Battle;