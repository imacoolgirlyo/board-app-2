참고 문서

- [NestJS: Authentication](https://docs.nestjs.com/security/authentication)

  - [Tutorial 예제 코드](https://github.com/nestjs/nest/tree/master/sample/19-auth-jwt)

- [Google Identity Service with Backend](https://github.com/MomenSherif/react-oauth/issues/12#issuecomment-1131408898)
  - 근데 여기서는 code만 server로 전송함.
  - [@react-oauth/google](https://github.com/MomenSherif/react-oauth) : 이 앱 되게 잘 만든듯
- [How to Implement OAuth2 Facebook Authentication using Angular, Node.js, and MongoDB](https://betterprogramming.pub/jwt-and-passport-jwt-strategy-for-your-nestjs-rest-api-project-cafa9dd59890)

참고 튜토리얼

- [OAuth2 in NestJS for Social Login (Google, Facebook, Twitter, etc)](https://javascript.plainenglish.io/oauth2-in-nestjs-for-social-login-google-facebook-twitter-etc-8b405d570fd2)
- [How to set up Twitter OAuth using Passport.js and ReactJS](https://medium.com/free-code-camp/how-to-set-up-twitter-oauth-using-passport-js-and-reactjs-9ffa6f49ef0)
- [](https://medium.com/@baptiste.arnaud95/how-to-handle-facebook-login-with-nestjs-89c5c30d566c)

이슈

- Google Login 버튼을 누르면 localhost:5000/auth/google 을 GET 요청해서 oauth 동의 화면으로 넘어가게끔 하려했는데 **CORS** 이슈 발생
  - `localhost:5000/auth/google` 요청을 하면 (oauth 인증에 필요한 code를 받기 위해서) account.google.com/o/oauth 주소로 Redirect 시켜준다.
  - 이때, OAuth endpoint(account.google.com)은 AJAX 요청을 할 수 없도록 디자인 되어 있기 떄문에 Redirect를 통해서만 가야한다.
    - 참고 stackoverflow : https://stackoverflow.com/a/43276710
    - https://stackoverflow.com/a/69428937/20767023

Learned

- client에서 jwt token을 ~~valid한지~~ 사용 가능한지 판단하는 방법

  1. jwt token의 expiration time과 현재 시간(Date.now())를 비교해서 만료되었는지 체크
  2. jwt token을 사용하여 request를 보낸 후, response status를 확인 (200 혹은 401)

  => token이 valid 한지, 아닌지는 client에서 판단할 수 없다. 이건 server에서 판단할 수 있는 일. client에서 할 수 있는건 Base64로 encoding 되어 있는 token을 decode해서 내용을 확인해볼 수 는 있다.

  Client에서 Protected Route를 만들기 위해서는 로그인 되어 있는지 판단해야한다. 로그인 후에 server에서 user를 반환했다면 user 데이터가 있는지를 확인하면 될 것이고 만약 access token을 반환했다면 이 access token의 유효 기간을 확인하는 식으로 로그인 유무를 판단할 수 있다. 즉 client에서 어떤 데이터를 보고 로그인 되었는지 판단할 것인가는 각 application 마다 다를 것임

- 이 프로젝트에서는 passport strategy를 사용하여 OAuth 2.0 login flow를 만들었음. 이렇게 server side web application 에서 사용되는 OAuth 2.0 는 request시 response_type으로 code를 사용한다. 다른 타입은 사용되지 않음

- 이렇게 server에서 OAuth server(Google, Facebook 등)으로 login request를 보내는 방식을 `back-channel` request라고 하고 반대로 웹 브라우저에서 OAuth server로 login request를 바로 보내는 방식을 `front-channel` request라고 부름

  - 내가 찾고 있던 정보!!!!!
  - back channel request 방식을 사용하면 OAuth server에서 발급해주는 access token을 브라우저를 통하지 않고 server application이 직접 받기 때문에 보안성 더 안전하다고 볼 수 있음
  - 출처: https://www.passportjs.org/concepts/oauth2/token/
  - https://www.deepnetwork.com/blog//2019/11/08/oauth2-oicd-pkce.html

- server에서 clinetID와 client key를 통해 발급 받은 facebook access token은 long-lived token이다. Facebook 서버로 요청을 보내면 하루에 한번씩 토큰을 갱신하고 60일 동안 해당 token을 사용하지 않는 경우 토큰이 만료된다.
