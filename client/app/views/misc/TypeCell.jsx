var React = require("react");

var TypeCell = React.createClass({

	render: function(){
		return (
				<span>
					<input id={this.props.type} type="radio" name="type-radio" value={this.props.type} />
					<label className="type-cc" htmlFor={this.props.type}
						style={{backgroundImage:"url(../../../img/"+this.props.type+".png)"}}></label>
        		</span>
        	);
	}
	

});

module.exports = TypeCell;