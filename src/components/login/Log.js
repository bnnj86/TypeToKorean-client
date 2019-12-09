import React from 'react';
import Login from './Login';
import LoginRender from './LoginRender';

export default function Log({
  loginId,
  loginUserName,
  loginComplete,
  loginImage,
  handleLoginState,
  handleLogoutState,
}) {
  return (
    <div style={{ width: '22vw', height: '40vh', background: 'white' }}>
      {loginComplete ? (
        <LoginRender
          handleLogoutState={handleLogoutState}
          loginUserName={loginUserName}
          loginImage={loginImage}
        />
      ) : (
        <Login handleLoginState={handleLoginState} />
      )}
    </div>
  );
}
