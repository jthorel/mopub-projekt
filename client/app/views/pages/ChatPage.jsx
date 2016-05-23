var React = require("react");
var ReactDOM = require("react-dom");
var PUBNUB = require("pubnub");


var p = PUBNUB.init({
	publish_key: 'pub-c-c1b074c3-0a88-4f55-a517-a079027dea45',
	subscribe_key: 'sub-c-c38ad2c0-0fbd-11e6-a6c8-0619f8945a4f',
	error: function(error) {
		console.log(error)
	}
});

var Message = React.createClass({

	render: function() {
		return (
			<div className="commentbox">
				<p className="comment">{this.props.children}</p>
			</div>
		);
	}

});


var MessageList = React.createClass({

	render: function() {


		var messages = this.props.data.map(function(c){
			return (
				<Message >
					{c.message}
				</Message>
			);
		});

		return (
			<div>
				{messages}
			</div>
		);
	}

});

var MessageForm = React.createClass({

	getInitialState: function(){
		return {
			text:''
		};
	},

	handleSubmit: function(e){
		e.preventDefault();

		this.props.submitMethod(this.state.text);
		this.setState({
			text:''
		});
	},
  	
  	handleTextChange: function(e) {
    	this.setState({text: e.target.value});
    },

	render: function(){
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="input-group">
						<input type="text" 
							value={this.state.text} 
							placeholder="Add new comment..."
							onChange={this.handleTextChange}
							className="form-control"/>
							<span className="input-group-btn">
								<input type="submit" className="btn btn-default" value="Send"/>
							</span>
					</div>
						


				</form>
			</div>
		);

	}

});


var MessageView = React.createClass({

	render: function() {

		return (
			<div className="content-padded">
				<MessageList data={this.props.data}/>
			</div>
		);
	}

});


var ChatPage = React.createClass({

	componentDidUpdate: function() {
		var node = ReactDOM.findDOMNode(this);
		node.scrollTop = node.scrollHeight;

	},

	getInitialState: function(){
		return {
			messages: []
		};
	},

	componentWillMount: function() {
		p.history({
			channel: this.props.channel,
			count: 10,
			callback: function(m){
				this.setState({
					messages: m[0]					
				});
			}.bind(this)
		});		

	},

	componentDidMount: function() {
		p.subscribe({
			channel: this.props.channel,
			message: function(m){
				this.setState({
					messages: this.state.messages.concat([m])
				});
			}.bind(this),
    		
    		error: function (error) {
        	// Handle error here
        		console.log(JSON.stringify(error));
			}
		});
		
	},

	componentWillReceiveProps: function(nextProps) {

	},

	componentWillUnmount: function() {

		p.unsubscribe({
			channel: this.props.channel,
		});
	},
	
	render: function(){
		return(
			<div className="fixedContent">
				<MessageView data={this.state.messages} />			
			</div>
		);
	}
});

var HomePage = React.createClass({
	getInitialState: function(){
		return {
		}
	},	

	componentDidMount: function(){

	},

	submitComment: function(message, name) {

		var m = this.props.name +": "+message;
		p.publish({
			channel: this.props.channel,
			message: {name: this.props.name, message: m}
		});

	},

	titleTextChange: function(name) {
		this.setState({
			name: name
		});
	},
	

	render: function() {

		return (
			<div>
				<ChatPage channel={this.props.channel}/>
				<MessageForm submitMethod={this.submitComment} channel={this.props.channel}/>
			</div>
		);
	}
});

module.exports = HomePage;
