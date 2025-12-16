#!/bin/bash
# Migration script for students data to D1 database
# Generated on 2025-12-16T15:48:04.199Z

echo "Starting migration of 39 students to D1 database..."

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "서지원",\n  "img": "assets/images/faces/서_원.jpg",\n  "소감": "최고의 팀원들과 함께해서 즐거웠어요!"\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "유재성",\n  "img": "assets/images/faces/유_성.jpg",\n  "소감": "새로운 기술을 배우며 성장할 수 있었습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "김은석",\n  "img": "assets/images/faces/김_석.jpg",\n  "소감": "도전적인 프로젝트를 통해 많이 배웠습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "박준혁",\n  "img": "assets/images/faces/박_혁.png",\n  "소감": "협업의 중요성을 깨닫게 된 시간이었습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "윤지우",\n  "img": "assets/images/faces/default.jpg",\n  "소감": "실전 경험을 통해 실력을 키울 수 있었습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "김재헌",\n  "img": "assets/images/faces/김_헌.jpg",\n  "소감": "어려운 문제를 함께 해결하며 성장했습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "김준수",\n  "img": "assets/images/faces/김_수.jpg",\n  "소감": "캡스톤 프로젝트 덕분에 많이 발전했습니다!"\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "박주환",\n  "img": "assets/images/faces/박_환.jpg",\n  "소감": "팀원들과의 협력이 최고의 결과를 만들었습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "조상준",\n  "img": "assets/images/faces/조_준.jpg",\n  "소감": "함께 만든 결과물에 더 큰 의미가 있었습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "이성우",\n  "img": "assets/images/faces/이_우.jpg",\n  "소감": "보람있는 개발 경험을 할 수 있었습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "한민규",\n  "img": "assets/images/faces/한_규.jpg",\n  "소감": "새로운 도전을 통해 한 단계 성장했습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "오세준",\n  "img": "assets/images/faces/default.jpg",\n  "소감": "팀원들의 지원이 있었기에 가능했습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "박성빈",\n  "img": "assets/images/faces/박_빈.jpg",\n  "소감": "실무 경험을 얻을 수 있는 소중한 시간이었습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "곽현우",\n  "img": "assets/images/faces/곽_우.png",\n  "소감": "최고의 팀원들과 함께할 수 있어 영광이었습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "이다영",\n  "img": "assets/images/faces/이_영.png",\n  "소감": "재미있는 개발 경험을 할 수 있었습니다!"\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "유승민",\n  "img": "assets/images/faces/유_민.jpg",\n  "소감": "문제 해결 과정에서 많이 배울 수 있었습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "천규진",\n  "img": "assets/images/faces/천_진.jpg",\n  "소감": "소통하며 배우는 과정이 정말 즐거웠습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "전성민",\n  "img": "assets/images/faces/전_민.jpg",\n  "소감": "도전을 통해 새로운 것을 배울 수 있었습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "김재훈",\n  "img": "assets/images/faces/김_훈.png",\n  "소감": "함께 노력하며 팀워크의 힘을 느꼈습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "김태연",\n  "img": "assets/images/faces/김_연.jpg",\n  "소감": "다양한 경험을 통해 한 단계 성장했습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "박민호",\n  "img": "assets/images/faces/박_호.png",\n  "소감": "팀원들과 함께라서 무엇이든 가능했습니다!"\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "김미리",\n  "img": "assets/images/faces/김_리.jpg",\n  "소감": "함께 만들어가는 과정의 즐거움을 알았습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "이준서",\n  "img": "assets/images/faces/이_서.jpg",\n  "소감": "최고의 팀원들과 소중한 경험을 얻었습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "박동휘",\n  "img": "assets/images/faces/박_휘.jpg",\n  "소감": "서로 도우며 함께 성장하는 시간이었습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "정영수",\n  "img": "assets/images/faces/정_수.jpg",\n  "소감": "새로운 기술 스택을 배우며 즐거웠습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "조현준",\n  "img": "assets/images/faces/조_준6.jpg",\n  "소감": "팀원들의 지원이 있었기에 성공할 수 있었습니다!"\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "윤종민",\n  "img": "assets/images/faces/윤_민.jpg",\n  "소감": "도전적인 과제를 통해 많이 배웠습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "김태준",\n  "img": "assets/images/faces/김_준.jpg",\n  "소감": "성장의 기회를 준 소중한 프로젝트였습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "이주형",\n  "img": "assets/images/faces/이_형.jpg",\n  "소감": "함께 만들어가는 과정이 정말 재미있었습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "함지원",\n  "img": "assets/images/faces/함_원.jpg",\n  "소감": "소통하며 배우는 시간이 정말 소중했습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "권태형",\n  "img": "assets/images/faces/권_형.jpg",\n  "소감": "팀워크가 프로젝트 성공의 핵심임을 깨달았습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "하경완",\n  "img": "assets/images/faces/하_완.jpg",\n  "소감": "새로운 도전을 통해 크게 성장했습니다!"\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "박상현",\n  "img": "assets/images/faces/박_현.jpg",\n  "소감": "문제 해결 능력을 키울 수 있었습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "이동하",\n  "img": "assets/images/faces/이_하.jpg",\n  "소감": "최고의 팀원들과 함께라서 무엇이든 가능했습니다!"\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "강신혁",\n  "img": "assets/images/faces/강_혁.jpg",\n  "소감": "성장과 배움의 소중한 시간을 보냈습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "심현우",\n  "img": "assets/images/faces/심_우.jpg",\n  "소감": "함께 만들어가는 과정이 정말 즐거웠습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "박준서",\n  "img": "assets/images/faces/박_서.png",\n  "소감": "소통하며 배우는 과정이 정말 유익했습니다."\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "서예나",\n  "img": "assets/images/faces/서_나.jpg",\n  "소감": "팀원들과 함께라서 프로젝트가 더 빛났습니다!"\n}'

curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{\n  "name": "이혜원",\n  "img": "assets/images/faces/이_원.png",\n  "소감": "힘들지만 좋았어!"\n}'

echo "Migration completed!"
