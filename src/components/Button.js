import PropTypes from 'prop-types'

const Button = ({ text, className, onClick }) => {
  return (
    <button
      type='button'
      className={className}
      onClick={onClick}>
        {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button;
