var React = require("react");
var TypeCell = require("./TypeCell.jsx");


// Choose type of activity
var TypeSelector = React.createClass({

	// Callback when changing "radio"-button
	handleType: function(event){
		this.props.handleType(event.target.value);
	},

	
	render: function(){
		return (
				
			<form onChange={this.handleType}>
				<div className="type-selector">
					<TypeCell type="fotboll"/>
					<TypeCell type="biljard"/>
					<TypeCell type="bowling"/>
					<TypeCell type="beer"/>
					<TypeCell type="tennis"/>
					<TypeCell type="löpning"/>
					<TypeCell type="cykla"/>
					<TypeCell type="golf"/>
					<TypeCell type="skate"/>
					<TypeCell type="basket"/>
	    		</div>
	    	</form>
        );
	}
	

});

module.exports = TypeSelector;