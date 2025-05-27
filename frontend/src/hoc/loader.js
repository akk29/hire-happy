const LoaderHOC = (WrappedComponent) => {
  return function LoaderHOC(props) {
    return props.isloading ? (
      <h1>Please wait </h1>
    ) : (
      <WrappedComponent {...props} />
    );
  };
};

export default LoaderHOC;