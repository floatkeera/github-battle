var React = require('react');
var PropTypes = require('prop-types');

function PlayerPreview({ avatar, username, children }){
	return(
	
			<div className = 'column'>
				<img 
					className='avatar'
					src={avatar} 
					alt="lol"/>
			
			<h2 className = 'username'>@{username}
				
			</h2>

			{children}
			

		</div>


	);
}

PlayerPreview.propTypes = {
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
};


module.exports = PlayerPreview;
