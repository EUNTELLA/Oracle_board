# Oracle_board

Oracle Database 실습 리포지토리입니다. 데이터베이스 개론 수업의 주차별 실습 내용을 담고 있습니다.

## 📚 목차

- [기술 스택](#-기술-스택)
- [실습 내용](#-실습-내용)
- [설치 및 설정](#-설치-및-설정)
- [사용 방법](#-사용-방법)
- [연락](#-연락)

## 🛠 기술 스택

- **Database**: Oracle Database 11g XE
- **Language**: Node.js
- **Library**: [node-oracledb](https://github.com/oracle/node-oracledb), readline-sync
- **IDE**: VS Code

## 📖 실습 내용

### Week 05 - DB 연결 및 기본 조회
- 📁 `ex01/`
  - Oracle DB 연결 설정 (`connect.js`)
  - 전체 학생 목록 조회 (`sql01.js`)
  - 조건부 조회 (`sql02.js`)

### Week 06 - CRUD 구현
- 📁 `ex02/`
  - Oracle DB 연결 설정 (한글 인코딩 포함) (`connect.js`)
  - 학생 목록 조회 (`sql01.js`)
  - 이름으로 학생 검색 (`sql02.js`)
  - 학생 등록 (중복 학번 체크) (`sql03.js`)

### Week 07 - 웹 애플리케이션 개발
- 📁 `web`
  - Express.js 기반 웹 애플리케이션
  - 학생 관리 페이지 (`/haksa/stu`)
  - 교수 관리 페이지 (`/haksa/pro`)
  - 강좌 관리 페이지 (`/haksa/cou`)

## 🚀 설치 및 설정

### 사전 요구사항
- Oracle Database 11g XE 설치
- Node.js 16+ 설치
- Oracle Instant Client 설정

### 설치
```bash
# 저장소 클론
git clone https://github.com/EUNTELLA/Oracle_board.git

# 의존성 설치
npm install oracledb readline-sync

# Oracle Client 초기화
# connect.js에서 libDir 경로를 환경에 맞게 수정하세요
```

### 환경 설정
`connect.js`의 연결 정보를 수정하세요:
```javascript
user: 'your_username',
password: 'your_password',
connectString: 'localhost/xe'
```

## 💻 사용 방법

```bash
# 실습 실행
node ex02/sql01.js  # 학생 목록 조회
node ex02/sql02.js  # 이름으로 검색
node ex02/sql03.js  # 학생 등록

# Windows에서 한글 입력 시
chcp 65001 && node ex02/sql02.js
```

## 📝 연락처

- GitHub: [@EUNTELLA](https://github.com/EUNTELLA)
- 수업: 데이터베이스 개론
