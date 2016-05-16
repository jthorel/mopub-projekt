var React = require("react");
var backboneMixin = require('backbone-react-component');

//VIEWS:
var SimpleListOrderedCellView = require("./cell/SimpleListOrderedCellView.jsx");
var SimpleListUnorderedCellView = require("./cell/SimpleListUnorderedCellView.jsx");

var SimpleListView = React.createClass({

	propTypes: {
		collection: React.PropTypes.object.isRequired, //A Backbone-Collection of tracks
		type: React.PropTypes.string.isRequired //"unordered" or "ordered". 
	},


	render: function(){
		var _this = this;

		if(this.props.filterString) {
			var regExp = new RegExp(this.props.filterString, "i");
		}
		
		if(this.props.collection.length === 0) {
			rows = <div> There appears to be nothing here. </div>
		} else if(this.props.type === "unordered"){			
			var rows = this.props.collection.models.map(function(model){
				if(_this.props.filterString){
					if ( !regExp.test(model.get("title")) ) return;
				}
				return <SimpleListUnorderedCellView model={model} key={model.id} />
			})
		} else {
			var rows = this.props.collection.models.map(function(model){
				return <SimpleListOrderedCellView model={model} collection={_this.props.collection} key={model.id} />
			})
		}

		return (
			<div className="list-group">
				{rows}
			</div>
		)
	}
});

module.exports = SimpleListView;