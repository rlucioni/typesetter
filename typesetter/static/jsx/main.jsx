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

    // kuro, yoko, kyo
    render: function() {
        console.log('Rendering.');

        var words = this.state.words || [];

        return (
            <span className="input input--kuro">
                <input className="input__field input__field--kuro" id="input-0" type="text" value={this.state.searchString} onChange={this.handleChange}/>
                <label className="input__label input__label--kuro" for="input-0">
                    <span className="input__label-content input__label-content--kuro">Query</span>
                </label>
                <ul>
                    {words.map(function(word) { return <li key={word}>{word}</li> })}
                </ul>
            </span>
        )
    }

});


ReactDOM.render(
    <DynamicSearch source="http://127.0.0.1:5000/api/search/"/>,
    document.getElementById('content')
);
