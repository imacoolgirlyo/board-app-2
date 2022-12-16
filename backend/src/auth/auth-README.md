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
