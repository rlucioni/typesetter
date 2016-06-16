var words = [
    'food',
    'water',
    'nerf',
    'chair',
    'computer',
    'tomato',
    'book',
    'bottle',
    'cup'
];

var DynamicSearch = React.createClass({

    getInitialState: function() {
        return {searchString: ''};
    },

    handleChange: function(event) {
        this.setState({searchString: event.target.value});
    },

    render: function() {

        var words = this.props.items;
        var searchString = this.state.searchString.trim().toLowerCase();

        if (searchString.length > 0) {
            words = words.filter(function(word) {
                return word.toLowerCase().match(searchString);
            });
        }

        return (
            <div>
                <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search"/>
                <ul>
                    {words.map(function(word) { return <li>{word}</li> })}
                </ul>
            </div>
        )
    }

});


ReactDOM.render(<DynamicSearch items={words}/>, document.getElementById('content'));
