var React = require("react");
var ReactDOM = require("react-dom");

var GoogleMap = React.createClass({  
    getDefaultProps: function () {
        return {
            initialZoom: 15,
            mapCenterLat: 43.6425569,
            mapCenterLng: -79.4073126,
        };
    },

    mapCenterLatLng: function () {
        var props = this.props;
        return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
    },

    createMap: function() {


        var mapOptions = {
            zoom: this.props.initialZoom,
            disableDefaultUI: true
        }

        if(this.props.position){
            var actPos = new google.maps.LatLng(this.props.position[0], this.props.position[1]);
            mapOptions.center = actPos;
        } else {
            mapOptions.center = this.mapCenterLatLng()
        }        
        return new google.maps.Map(this.refs.map, mapOptions);
    },

    setPosition: function(position){
        this.state.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    },


    componentDidMount: function () {

        var _this = this;

        var map = this.createMap();
        if(this.props.position){
            var actPos = new google.maps.LatLng(this.props.position[0], this.props.position[1]);
            var actMarker = new google.maps.Marker({position: actPos, map: map});
        }
        
        this.setState({map: map});

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

        if(this.props.type){
            actMarker.setIcon({
                url: '/img/'+this.props.type+'.png'
            });
        }


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

        if(this.props.zoom){
            map.setZoom(this.props.zoom);
        }

    },

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
