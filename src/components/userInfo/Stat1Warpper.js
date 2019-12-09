import React from 'react';

export default function Stat1Warpper(Component) {
  return function WihLoadingComponent({ BestInfoIsLoading, ...props }) {
    if (!BestInfoIsLoading) return <Component {...props} />;
    return <p>Be Hold, fetching data may take some time :)</p>;
  };
}
