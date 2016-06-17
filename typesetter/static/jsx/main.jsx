var DynamicSearch = React.createClass({

    getInitialState: function() {
        console.log('Getting initial state.');
        return {searchString: ''};
    },

    handleChange: function(event) {
        console.log('Change detected.');

        var searchString = event.target.value;
        var url = this.props.source + searchString.trim().toLowerCase();

        if (searchString.length > 2) {
            console.log('Searching.');
            this.serverRequest = $.get(url, function(words) {
                console.log(words);
                this.setState({
                    words: words,
                    searchString: searchString
                });
            }.bind(this));
        } else {
            console.log('Query not long enough, not searching.');
            this.setState({
                words: null,
                searchString: searchString
            });
        }
    },

    render: function() {
        console.log('Rendering.');

        var words = this.state.words || [];

        return (
            <div>
                <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search..."/>
                <ul>
                    {words.map(function(word) { return <li key={word}>{word}</li> })}
                </ul>
            </div>
        )
    }

});


ReactDOM.render(
    <DynamicSearch source="http://127.0.0.1:5000/api/search/"/>,
    document.getElementById('content')
);
