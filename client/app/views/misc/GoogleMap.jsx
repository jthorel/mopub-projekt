var React = require("react");
var ReactDOM = require("react-dom");


// A GoogleMap component
var GoogleMap = React.createClass({  
    
    getDefaultProps: function () {
        return {
            zoom: 15,
        };
    },



    createMap: function() {
        var mapOptions = {
            zoom: this.props.zoom,
            disableDefaultUI: true
        }
        return new google.maps.Map(this.refs.map, mapOptions);
    },

    // Callback for getting user position when viewing the collection 
    setPosition: function(position){
        this.state.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    },



    componentDidMount: function () {
        var _this = this;

        var map = this.createMap();
        this.setState({map: map});

        // If the component is created with a position, create marker and center it on that position
        // (called when viewing an activity)
        if(this.props.position){
            var actPos = new google.maps.LatLng(this.props.position[0], this.props.position[1]);
            map.setCenter(actPos);
            var actMarker = new google.maps.Marker({position: actPos, map: map});
        }
        
        // If the component is created with a callback-method handleDrag
        // make the marker draggable and center the marker when dragging the map
        // (called when creating a new activity)
        if(this.props.handleDrag){

            actMarker.setDraggable(true);

            map.addListener('dragend', function(){
                actMarker.setPosition(map.getCenter());
                _this.props.handleDrag(map.getCenter());
            });

            actMarker.addListener('dragend', function(){

                _this.props.handleDrag(actMarker.getPosition());
            });
        }

        // If created with a collection.
        // Iterate the collection and add markers with the model-type icon
        // Called when viewing the "Map"-page
        if(this.props.collection){
            navigator.geolocation.getCurrentPosition(this.setPosition);

            var markers = this.props.collection.models.map(function(model){
                var position = model.get("position");
                var type = model.get("type");
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(position[0], position[1]),
                    map: map,
                    icon: {
                        url: '/img/'+type+'.png'
                    },
                    id: model.get("_id")
                });

                google.maps.event.addListener(marker, 'click', function() {
                    console.log("clicked")
                    window.location.href = "#/activity/"+this.id;
                });
            });
        }

        // Change zoom if created with zoom-prop
        if(this.props.zoom){
            map.setZoom(this.props.zoom);
        }

    },

    // Get center of the map and callback the position
    getCenter: function() {
        var center = this.state.map.getCenter();
        this.props.setCenter(center);
    },

    render: function () {
        return (
            <div style={{width:"100%", height:"70vh"}}>
        	<div ref='map' style={{width:"100%", height:"100%"}}></div>
            </div>
        );
    }
});

module.exports = GoogleMap;
