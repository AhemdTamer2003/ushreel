import PropTypes from "prop-types";

export const Header = ({
  title,
  subtitle,
  icon,
  className = "",
  iconClassName = "",
}) => {
  return (
    <div className={`text-center mb-8 ${className}`}>
      {icon && (
        <div
          className={`w-16 h-16 bg-[#D4A537] rounded-full flex items-center justify-center mx-auto mb-4 ${iconClassName}`}
        >
          {icon}
        </div>
      )}
      <h2 className="text-3xl text-[#D4A537] font-bold mb-2">{title}</h2>
      {subtitle && <p className="text-gray-300">{subtitle}</p>}
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.node,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
};

export default Header;
