## TODO

- [x] Postgresql DB 연동
- [x] Board Entity 생성 및 Repository 추가
- [x] docker-compose.yml에 Postgresql, nestjs app 서비스 추가 -> `docker compose up` 으로 Postgresql, nestjs container 같이 실행시키기
- [x] React App 생성 후 dockerize
  - [ ] nginx 사용하도록 변경
- [ ] k8s pod에 front, server container 올려보기
- [ ] k8s service 써보기

---

- [ ] draft 게시글 생성
- [ ] 게시글 특정시간에 업로드

---

- 11.30 (수) 목표
  - docker-compose에 Postgresql, nestjs service 추가해서 컨테이너 실행시키기
- 12.12 Planning
  Instagram 게시글 대신 올려주는 Service

  - 로그인
  - 이미지, 게시글, 해시태그 작성
  - 특정 시간에 업로드 되도록 예약

    12.16

- facebook에서 Redirect URL 로 Redirect 된 후 response로 access token을 넘겨주기 ✅

  12.17

- local storage(LS) 내의 access token 있는지 + valid한지 확인 (로그인 상태 확인)

  - Landing Page에서 LS에 있는 access token 확인 후 valid 하면 Home으로 Redirect
  - user 정보가 필요한 곳은 Protected Routes 만들어서 access token이 valid 하지 않으면 접속을 막고자함
    TODO: 다들 client에서 at 어떻게 관리함?
    PROBLEM: 만약 Home(또는 다른 Board Page) 에서 Login page로 넘어가서 재로그인을 했다면 기존에 있었던 페이지로 돌아오게 하고 싶다.

    12.20

- instagram API 적용 튜토리얼 : https://superface.ai/blog/instagram-setup
- https://superface.ai/blog/instagram-account-id
- instagram account를 다루려면 user의 access token과 business account ID가 필요

- facebook id token은 long lived token이기 때문에 어딘가에 저장해서 사용해야 한다. User <-> Token이 OneToOne relation로 설정하고 싶어서 User가 Token의 foreign key를 가지고 있도록 `@JoinColumn()` decorator를 붙였다.
  단 google에서 제공한 id token은 굳이 저장하지 않아도 될 거 같아서 foreign key가 null이 될 수 있는 경우에 대해 알아봄
