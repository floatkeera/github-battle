import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';

/*class SelectLanguage extends React.Component{


	render(){
		var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python', 'Hi'];

		return(
			<ul className='languages'>
					{languages.map(function(lang){
						return(
							<li 
								style={lang == this.props.selectedLanguage ? {color: '#26C6DA'} : null}
								onClick={this.props.onSelect.bind(null, lang)} // bind returns new function and will be invoked on click
								key={lang}>{lang}</li>
							);

					}, this)}
			</ul>
		);
	}
}*/

//Stateless functional component!!

function SelectLanguage({selectedLanguage, onSelect}){
	var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

	return(
			<ul className='languages'>
					{languages.map((lang) =>(
							<li 
								style={lang == selectedLanguage ? {color: '#00BFA5'} : null}
								onClick={() => onSelect(lang)}
								key={lang}>{lang}</li>
							))}
			</ul>
		);
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};

function RepoGrid({ repos }){
	return(
		<ul className='popular-list'>
			{repos.map(({ name, stargazers_count, owner, html_url}, index) => (
					<li key={name} className='popular-item'>
						<div className='popular-rank'>#{index + 1}</div>
							<ul className='space-list-items'>
								<li>
									<img
										className='avatar'
										src={owner.avatar_url}/>
								</li>
								<li><a className='repoName' href={html_url}>{name}</a></li>
								<li>@{owner.login}</li>
								<li>{stargazers_count} stars</li>
							</ul>
					</li>))
			})

		</ul>

		);
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
};

class Popular extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			selectedLanguage: 'All',
			repos: null
		};

		this.updateLanguage = this.updateLanguage.bind(this); //`this` component in updateLanguage will always refer to the component instance becauses of this binding
	}

	componentDidMount(){
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage = async (lang) =>{
		this.setState(() => ({
				selectedLanguage: lang,
				repos:null
			}));

		const repos = await fetchPopularRepos(lang);
		this.setState(() => ({ repos }));

		//AJAX Request

        
  }
	

	render() {

		const{ selectedLanguage, repos } = this.state;
	
		return (
			<div>
				<SelectLanguage 
					selectedLanguage = {selectedLanguage}
					onSelect = {this.updateLanguage}/>
					
				{!this.state.repos ? <Loading text='Wait a sec'
				interval = {100}></Loading> : <RepoGrid repos = {repos} />}  
			</div>  //this prevents repos from getting null and passing that to RepoGrid
		);
	}
}

export default Popular;