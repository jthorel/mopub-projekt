var React = require("react");

var SelectListCellView = React.createClass({
    
    propTypes: {
        collection: React.PropTypes.object,
        model: React.PropTypes.object
    },
    
    render: function() {
        return (
            <div className="list-group-item">
                <div className="row">
                    <div className="col-md-1 col-xs-1" >
                        <h4 style={{cursor: "pointer", color: "green"}} onClick={this.add}><span className="glyphicon glyphicon-plus" /></h4>
                    </div>
                    <div className="col-md-7 col-xs-7">
                        <h4>{this.props.model.get("title")} <small>  {this.props.model.get("artist")}</small></h4>
                    </div>
                    <div className="col-md-4 col-xs-4">

                    </div>
                </div>
            </div>
        )
    },
    
    add: function() {
        this.props.collection.add(this.props.model);
    }
});

module.exports = SelectListCellView;