type SpinnerProps = {
  size?: number;
  label?: string;
};

const Spinner = ({ size = 20, label = "Loading" }: SpinnerProps) => (
  <span
    className="spinner"
    role="status"
    aria-label={label}
    style={{ width: size, height: size, borderWidth: size > 18 ? 2.5 : 2 }}
  />
);

export default Spinner;
