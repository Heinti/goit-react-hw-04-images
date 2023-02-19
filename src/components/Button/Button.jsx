import PropTypes from 'prop-types';

const Button = ({onLoadMore}) =>{
return(
    <button onClick={onLoadMore} type="button" className="Button">Load More</button>
)
}

export default Button;

Button.propTypes ={
onLoadMore: PropTypes.func.isRequired
}