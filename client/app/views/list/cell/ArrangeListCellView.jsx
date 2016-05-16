var React = require("react");

var ArrangeListCellView = React.createClass({
    
    propTypes: {
        model: React.PropTypes.object.isRequired, //Backbone.Model:
        collection: React.PropTypes.object.isRequired
    },
    
    render: function(){
        var model = this.props.model;
        var collection = this.props.collection;
        var canMoveUp = collection.indexOf(model) > 0 ? true : false;
        var canMoveDown = collection.indexOf(model) + 1 < collection.length ? true : false;
        var style = {
            cursor: "pointer",
            fontSize: "20px"
        };

        return (
            <div>
                <div className="list-group-item" >
                    <div className="row">
                        <div className="col-md-1 col-xs-1">
                            <div className="row">
                                <div className="col-md-1 col-xs-1" >
                                    <span onClick={this.moveUp} className={canMoveUp ? "glyphicon glyphicon-menu-up" : ""}
                                        style={style}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-1 col-xs-1" >
                                    <span onClick={this.moveDown} className={canMoveDown ? "glyphicon glyphicon-menu-down" : ""}
                                        style={style}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9 col-sm-7 col-xs-7" style={{borderBottom:"5px"}}>
                            <h4>{this.props.model.get("title")} <small> {this.props.model.get("artist")}</small></h4>
                        </div>
                        <div className="col-md-2 col-sm-4">
                            <a onClick={this.remove}>
                                <h4 className="remove text-center">
                                    <span className="glyphicon glyphicon-remove"/>
                                </h4>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
            
        );
    },
    
    moveUp: function(){
        this.props.collection.moveUp(this.props.model)    
    },
    
    moveDown: function() {
        this.props.collection.moveDown(this.props.model);
    },
    
    remove: function(){
        this.props.collection.remove(this.props.model);
    }
});

module.exports = ArrangeListCellView;