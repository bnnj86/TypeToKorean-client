import React from 'react';

export default function Stat2Warpper(Component) {
  return function WihLoadingComponent({ UserInfoIsLoading, ...props }) {
    if (!UserInfoIsLoading) return <Component {...props} />;
    return <p>Be Hold, fetching data may take some time :)</p>;
  };
}
