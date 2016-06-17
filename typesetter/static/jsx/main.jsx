var DynamicSearch = React.createClass({

    getInitialState: function() {
        console.log('Getting initial state.');
        return {searchString: ''};
    },

    componentDidMount: function() {
        console.log('Component did mount, getting data.');
        this.serverRequest = $.get(this.props.source, function(words) {
            console.log(words);
            this.setState({words: words});
        }.bind(this));
    },

    componentWillUnmount: function() {
        console.log('Component will unmount, aborting request.');
        this.serverRequest.abort();
    },

    handleChange: function(event) {
        console.log('Handling change, setting state.');
        this.setState({searchString: event.target.value});
    },

    render: function() {
        console.log('Rendering.');

        var words = this.state.words || [];
        var searchString = this.state.searchString.trim().toLowerCase();

        if (searchString.length > 0) {
            words = words.filter(function(word) {
                console.log(`Checking if ${word} matches ${searchString}.`)
                return word.toLowerCase().match(searchString);
            });
        }

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
    <DynamicSearch source="http://127.0.0.1:5000/api/words"/>,
    document.getElementById('content')
);
