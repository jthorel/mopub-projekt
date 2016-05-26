var React = require("react");
var ReactDOM = require("react-dom");
var PUBNUB = require("pubnub");


// CHAT-COMPONENT
// Last-minute add-on
// Mostly reused lab3 without the compass-headings.

// A message in the message-list
var Message = React.createClass({
	render: function() {
		return (
			<div className="commentbox">
				<p className="comment">{this.props.children}</p>
			</div>
		);
	}
});


// Render a list of messages from the array props.data
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


// Send message form
var MessageForm = React.createClass({

	getInitialState: function(){
		return {
			text:''
		};
	},

	// When submitting, use the callback method
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


// Middle component to fix scrolling
var MessageView = React.createClass({

	// Scroll to bottom when new messages arrive
	componentDidUpdate: function() {
		var node = ReactDOM.findDOMNode(this);
		node.scrollTop = node.scrollHeight;

	},

	render: function() {
		return (
			<div className="fixedContent">
				<div className="content-padded">
					<MessageList data={this.props.data}/>
				</div>
			</div>
		);
	}
});


var ChatComponent = React.createClass({

	getInitialState: function(){
		return {
			messages: [],
			p: PUBNUB.init({
				publish_key: 'pub-c-c1b074c3-0a88-4f55-a517-a079027dea45',
				subscribe_key: 'sub-c-c38ad2c0-0fbd-11e6-a6c8-0619f8945a4f',
				error: function(error) {
					console.log(error)
				}
			})
		};
	},

	propTypes: {
		// The component will be called with a channel prop
		// channel is the id of the activity-model
		channel: React.PropTypes.string.isRequired
	},

	// Get the history and set the state with the history-array
	componentWillMount: function() {
		this.state.p.history({
			channel: this.props.channel,
			count: 10,
			callback: function(m){
				this.setState({
					messages: m[0]					
				});
			}.bind(this)
		});		

	},

	// Subscribe to updates from the channel
	// If a new message arrives, add it to message array and update the state
	// (Pushing to an array in a state goes against the React workflow. So basically the new message
	// gets concatenated into the old array so a new array is created, and the state is updated with
	// the new array.)
	componentDidMount: function() {
		this.state.p.subscribe({
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


	// Unsubscribe
	componentWillUnmount: function() {
		this.state.p.unsubscribe({
			channel: this.props.channel,
		});
	},


	// Send message to pubnub, callbackmethod from MessageForm-component
	submitComment: function(message, name) {
		var m = this.props.name +": "+message;
		this.state.p.publish({
			channel: this.props.channel,
			message: {name: this.props.name, message: m}
		});

	},
	
	render: function(){
		return(
			<div>
				<MessageView data={this.state.messages} />			
				<MessageForm submitMethod={this.submitComment}/>
			</div>
		);
	}
});

module.exports = ChatComponent;
