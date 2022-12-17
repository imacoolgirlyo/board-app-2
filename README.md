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

- facebook에서 Redirect URL 로 Redirect 된 후 response로 access token을 넘겨주기
