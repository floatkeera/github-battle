

async function getProfile(username){
	const response = await fetch(`https://api.github.com/users/${username}`);

	return response.json(); //when it's done call this function
}

async function getRepos(username){
	const response = await fetch (`https://api.github.com/users/${username}/repos`);
	return response.json();
}

function getStarCount(repos){
	return repos.reduce((count, {stargazers_count}) => count + stargazers_count, 0); // reduce the array to a number - start at 0. The thing that the function returns is going to be passed as the count for the second iteration
}

function calculateScore({followers}, repos){
	return (followers * 3) + getStarCount(repos);
}

function handleError(err){
	console.warn(err);
	return null;
}

async function getUserData(player){
	
	const [ profile, repos ] = await Promise.all([ //takes in an array of promises and then once all the promises in the array is resolved, it's going to call the function in then
		getProfile(player), // async functions defined above
		getRepos(player)
	]);

	return{
			profile,
			score: calculateScore(profile, repos)
		};
}

function sortPlayers(players){
	return players.sort((a,b) =>  b.score - a.score); // this is a compare function to define an alternative sort order
}

export async function battle(players){
	//method declarations changed from x: function(players){} to just this
		
		const results = await Promise.all(players.map(getUserData)) //for each item in players, we are calling getUserData
			.catch(handleError);

		return results === null
		? results
		: sortPlayers(results) //getUserData returns you an object with a profile and a score
}

export async function fetchPopularRepos (language){
	const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
		
	const response = await fetch(encodedURI).catch(handleError);

	const repos = await response.json();
	return repos.items;
}