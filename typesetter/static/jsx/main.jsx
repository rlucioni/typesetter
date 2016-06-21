var DynamicSearch = React.createClass({

    getInitialState: function() {
        return {searchString: ''};
    },

    handleChange: function(event) {
        var searchString = event.target.value;
        var url = this.props.source + searchString.trim().toLowerCase();

        if (searchString.length > 2) {
            this.serverRequest = $.get(url, function(results) {
                this.setState({
                    results: results,
                    searchString: searchString
                });
            }.bind(this));
        } else {
            this.setState({
                results: null,
                searchString: searchString
            });
        }
    },

    render: function() {
        var results = this.state.results || [];

        return (
            <span className="input input--yoko">
                <input className="input__field input__field--yoko" id="input-0" type="text" value={this.state.searchString} onChange={this.handleChange}/>
                <label className="input__label input__label--yoko" for="input-0">
                    <span className="input__label-content input__label-content--yoko">Letters to use?</span>
                </label>
                <ul>
                    {results.map(function(result) {
                        return <li className={result.category} key={result.word}>{result.word}</li>
                    })}
                </ul>
            </span>
        )
    }

});


ReactDOM.render(
    <DynamicSearch source="http://127.0.0.1:5000/api/search/"/>,
    document.getElementById('content')
);
