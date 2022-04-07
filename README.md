# 프로젝트 소개

## 항해99 리액트 3주차 과제입니다.


##  1.제작 기간

2022.04.01 ~ 2022.04.07


## 2. 사용 기술

* Framework: React


## 3. 핵심 기능

* react-redux, firestore를 통한 상태관리
  
* 게시물 추가, 수정, 삭제
  - react-redux의 미들웨어를 통해 firestore에 추가,수정,삭제를 진행하고, redux에 상태변화를 요청합니다.
  - 게시물 삭제 시, 해당 게시몰에 작성된 댓글들도 삭제됩니디.

* 회원가입 및 로그인
  - firebase auth를 이용한 회원가입과 로그인을 할 수 있습니다.

* 댓글 등록
  - 로그인 시, 게시물에 댓글을 작성할 수 있습니다.

* 무한 스크롤
  - 스크롤이벤트를 활용한 무한 스크롤 구현했습니다.

* 댓글 알림
  - firebase realtime database를 활용한 본인이 작성한 게시물에 댓글이 작성될 시, 알림을 주는 기능
  - 알림을 한 번 확인하면 알림이 초기화됩니다.


![image](https://user-images.githubusercontent.com/48580444/162196861-36270bde-51c9-4d39-ac16-3fe7597f911d.png)
![image](https://user-images.githubusercontent.com/48580444/162196934-86453a72-37cc-463a-8eed-25802e00b80d.png)
![image](https://user-images.githubusercontent.com/48580444/162197078-fb3db1e8-fc56-491e-9fd9-46796d35b8e8.png)
![image](https://user-images.githubusercontent.com/48580444/162197132-37c6b348-29bb-426f-97e5-dfca69e37b9c.png)



  

## 4. 회고

정말 작은 input, text, div단위로 컴포넌트를 만들어 이용해서 적응하기가 힘들었다. 아주 작은 단위로 나누면 좋을것 같았지만, 막상 진행해보니 적당한 기준으로 나누는게 편하고 가독성도 좋을것 같다.
