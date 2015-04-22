var React = require('react/addons'),

    LazyLoad = React.createClass({
        displayName: 'LazyLoad',
        propTypes: {
            height: React.PropTypes.string
        },
        getInitialState: function() {
            return {
                visible: false 
            };
        },
        handleScroll: function() {
            var bounds = this.getDOMNode().getBoundingClientRect(),
                scrollTop = window.pageYOffset,
                top = bounds.top + scrollTop,
                height = bounds.bottom - bounds.top;

            if(top < (scrollTop + window.innerHeight) && (top + height) > scrollTop){
                this.setState({visible: true});
                this.handleVisible();
            }
        },
        handleVisible: function() {
            window.removeEventListener('scroll', this.handleScroll);
            window.removeEventListener('resize', this.handleScroll);
        },
        componentDidMount: function() {
            window.addEventListener('scroll', this.handleScroll);
            window.addEventListener('resize', this.handleScroll);
            this.handleScroll();
        },
        componentDidUpdate: function() {
            if(!this.state.visible) this.handleScroll();
        },
        componentWillUnmount: function() {
            this.handleVisible();
        },
        render: function () {
            var renderEl = '',
                cx = React.addons.classSet,
                preloadHeight = {
                    height: this.props.height
                },
                classes = cx({
                    'lazy-load': true,
                    'lazy-load-visible': this.state.visible
                });

            return (
                <div style={preloadHeight} className={classes}>
                    {this.state.visible ? this.props.children : ''}
                </div>
            );
        }
    });

module.exports = LazyLoad;
