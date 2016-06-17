var DynamicSearch = React.createClass({

    getInitialState: function() {
        return {searchString: ''};
    },

    componentDidMount: function() {
        this.serverRequest = $.get(this.props.source, function(words) {
            this.setState({words: words});
        }.bind(this));
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    handleChange: function(event) {
        this.setState({searchString: event.target.value});
    },

    render: function() {

        var words = this.state.words || [];
        var searchString = this.state.searchString.trim().toLowerCase();

        if (searchString.length > 0) {
            words = words.filter(function(word) {
                return word.toLowerCase().match(searchString);
            });
        }

        return (
            <div>
                <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search..."/>
                <ul>
                    {words.map(function(word) { return <li>{word}</li> })}
                </ul>
            </div>
        )
    }

});


ReactDOM.render(
    <DynamicSearch source="http://127.0.0.1:5000/api/words"/>,
    document.getElementById('content')
);
