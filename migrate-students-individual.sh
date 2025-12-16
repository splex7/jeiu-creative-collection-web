#!/bin/bash
# Student Data Migration Script for JEIU Creative Collection
# Generated on 2025-12-16T15:57:18.842Z

echo "Starting student data migration to D1 database..."
echo "Total students to migrate: 39"

echo "Migrating: 서지원"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"서지원","img":"assets/images/faces/서_원.jpg","소감":"최고의 팀원들과 함께해서 즐거웠어요!"}'
  -w "\n"  # Add newline after each request

echo "Migrating: 유재성"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"유재성","img":"assets/images/faces/유_성.jpg","소감":"새로운 기술을 배우며 성장할 수 있었습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 김은석"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"김은석","img":"assets/images/faces/김_석.jpg","소감":"도전적인 프로젝트를 통해 많이 배웠습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 박준혁"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"박준혁","img":"assets/images/faces/박_혁.png","소감":"협업의 중요성을 깨닫게 된 시간이었습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 윤지우"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"윤지우","img":"assets/images/faces/default.jpg","소감":"실전 경험을 통해 실력을 키울 수 있었습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 김재헌"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"김재헌","img":"assets/images/faces/김_헌.jpg","소감":"어려운 문제를 함께 해결하며 성장했습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 김준수"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"김준수","img":"assets/images/faces/김_수.jpg","소감":"캡스톤 프로젝트 덕분에 많이 발전했습니다!"}'
  -w "\n"  # Add newline after each request

echo "Migrating: 박주환"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"박주환","img":"assets/images/faces/박_환.jpg","소감":"팀원들과의 협력이 최고의 결과를 만들었습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 조상준"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"조상준","img":"assets/images/faces/조_준.jpg","소감":"함께 만든 결과물에 더 큰 의미가 있었습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 이성우"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"이성우","img":"assets/images/faces/이_우.jpg","소감":"보람있는 개발 경험을 할 수 있었습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 한민규"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"한민규","img":"assets/images/faces/한_규.jpg","소감":"새로운 도전을 통해 한 단계 성장했습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 오세준"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"오세준","img":"assets/images/faces/default.jpg","소감":"팀원들의 지원이 있었기에 가능했습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 박성빈"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"박성빈","img":"assets/images/faces/박_빈.jpg","소감":"실무 경험을 얻을 수 있는 소중한 시간이었습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 곽현우"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"곽현우","img":"assets/images/faces/곽_우.png","소감":"최고의 팀원들과 함께할 수 있어 영광이었습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 이다영"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"이다영","img":"assets/images/faces/이_영.png","소감":"재미있는 개발 경험을 할 수 있었습니다!"}'
  -w "\n"  # Add newline after each request

echo "Migrating: 유승민"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"유승민","img":"assets/images/faces/유_민.jpg","소감":"문제 해결 과정에서 많이 배울 수 있었습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 천규진"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"천규진","img":"assets/images/faces/천_진.jpg","소감":"소통하며 배우는 과정이 정말 즐거웠습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 전성민"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"전성민","img":"assets/images/faces/전_민.jpg","소감":"도전을 통해 새로운 것을 배울 수 있었습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 김재훈"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"김재훈","img":"assets/images/faces/김_훈.png","소감":"함께 노력하며 팀워크의 힘을 느꼈습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 김태연"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"김태연","img":"assets/images/faces/김_연.jpg","소감":"다양한 경험을 통해 한 단계 성장했습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 박민호"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"박민호","img":"assets/images/faces/박_호.png","소감":"팀원들과 함께라서 무엇이든 가능했습니다!"}'
  -w "\n"  # Add newline after each request

echo "Migrating: 김미리"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"김미리","img":"assets/images/faces/김_리.jpg","소감":"함께 만들어가는 과정의 즐거움을 알았습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 이준서"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"이준서","img":"assets/images/faces/이_서.jpg","소감":"최고의 팀원들과 소중한 경험을 얻었습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 박동휘"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"박동휘","img":"assets/images/faces/박_휘.jpg","소감":"서로 도우며 함께 성장하는 시간이었습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 정영수"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"정영수","img":"assets/images/faces/정_수.jpg","소감":"새로운 기술 스택을 배우며 즐거웠습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 조현준"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"조현준","img":"assets/images/faces/조_준6.jpg","소감":"팀원들의 지원이 있었기에 성공할 수 있었습니다!"}'
  -w "\n"  # Add newline after each request

echo "Migrating: 윤종민"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"윤종민","img":"assets/images/faces/윤_민.jpg","소감":"도전적인 과제를 통해 많이 배웠습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 김태준"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"김태준","img":"assets/images/faces/김_준.jpg","소감":"성장의 기회를 준 소중한 프로젝트였습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 이주형"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"이주형","img":"assets/images/faces/이_형.jpg","소감":"함께 만들어가는 과정이 정말 재미있었습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 함지원"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"함지원","img":"assets/images/faces/함_원.jpg","소감":"소통하며 배우는 시간이 정말 소중했습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 권태형"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"권태형","img":"assets/images/faces/권_형.jpg","소감":"팀워크가 프로젝트 성공의 핵심임을 깨달았습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 하경완"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"하경완","img":"assets/images/faces/하_완.jpg","소감":"새로운 도전을 통해 크게 성장했습니다!"}'
  -w "\n"  # Add newline after each request

echo "Migrating: 박상현"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"박상현","img":"assets/images/faces/박_현.jpg","소감":"문제 해결 능력을 키울 수 있었습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 이동하"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"이동하","img":"assets/images/faces/이_하.jpg","소감":"최고의 팀원들과 함께라서 무엇이든 가능했습니다!"}'
  -w "\n"  # Add newline after each request

echo "Migrating: 강신혁"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"강신혁","img":"assets/images/faces/강_혁.jpg","소감":"성장과 배움의 소중한 시간을 보냈습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 심현우"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"심현우","img":"assets/images/faces/심_우.jpg","소감":"함께 만들어가는 과정이 정말 즐거웠습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 박준서"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"박준서","img":"assets/images/faces/박_서.png","소감":"소통하며 배우는 과정이 정말 유익했습니다."}'
  -w "\n"  # Add newline after each request

echo "Migrating: 서예나"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"서예나","img":"assets/images/faces/서_나.jpg","소감":"팀원들과 함께라서 프로젝트가 더 빛났습니다!"}'
  -w "\n"  # Add newline after each request

echo "Migrating: 이혜원"
curl -X POST https://jeiu.cc/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"이혜원","img":"assets/images/faces/이_원.png","소감":"힘들지만 좋았어!"}'
  -w "\n"  # Add newline after each request

echo "Student data migration completed!"