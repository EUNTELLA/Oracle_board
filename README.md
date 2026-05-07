# Oracle_board

Oracle Database 실습 리포지토리입니다. 데이터베이스 개론 수업의 주차별 실습 내용과 Express 기반 학사 관리 웹 애플리케이션을 담고 있습니다.

## 📚 목차

- [기술 스택](#-기술-스택)
- [실습 내용](#-실습-내용)
- [설치 및 설정](#-설치-및-설정)
- [사용 방법](#-사용-방법)
- [주요 경로](#-주요-경로)
- [연락](#-연락)

## 🛠 기술 스택

- **Database**: Oracle Database 11g XE
- **Backend**: Node.js, Express.js
- **View Engine**: EJS
- **Frontend**: Bootstrap, jQuery, Handlebars
- **Library**: node-oracledb, readline-sync
- **IDE**: VS Code

## 📖 실습 내용

### Week 05 - DB 연결 및 기본 조회
- 📁 `ex01/`
  - Oracle DB 연결 설정 (`connect.js`)
  - 교수 목록 조회 (`sql01.js`)
  - 교수 데이터 입력 (`sql02.js`)

### Week 06 - CRUD 구현
- 📁 `ex02/`
  - Oracle DB 연결 설정 (`connect.js`)
  - 학생 목록 조회 (`sql01.js`)
  - 이름으로 학생 검색 (`sql02.js`)
  - 학생 등록 (`sql03.js`)

### Week 09 - 웹 애플리케이션 개발
- 📁 `web/`
  - Express.js 기반 웹 애플리케이션 구성
  - 공통 레이아웃 (`index.ejs`, `menubar.ejs`, `bottom.ejs`)
  - 학생 관리 페이지 (`/haksa/stu`)
  - 교수 관리 페이지 (`/haksa/pro`)
  - 강좌 관리 페이지 (`/haksa/cou`)

### Week 10 - 교수 관리 기능 개선
- 📁 `web/`
  - Bootstrap을 활용한 화면 구성
  - jQuery AJAX를 활용한 비동기 데이터 조회/등록
  - Handlebars를 활용한 교수 목록 테이블 출력
  - 교수 목록 API 구현 (`GET /haksa/pro/list.json`)
  - 교수 등록 페이지 구현 (`GET /haksa/pro/insert`)
  - 교수 등록 처리 구현 (`POST /haksa/pro/insert`)

## 🚀 설치 및 설정

### 사전 요구사항
- Oracle Database 11g XE 설치
- Node.js 16+ 설치
- Oracle Client DLL 경로 설정
  - 현재 웹 설정 파일은 `web/connect.js`입니다.
  - Oracle XE 기본 경로 예시: `C:\oraclexe\app\oracle\product\11.2.0\server\bin`

### 설치
```bash
# 루트 의존성 설치
npm install

# 웹 의존성 설치
cd web
npm install
```

### 환경 설정
`web/connect.js`의 Oracle Client 경로와 DB 연결 정보를 환경에 맞게 수정하세요.

```javascript
oracledb.initOracleClient({
    libDir: 'C:\\oraclexe\\app\\oracle\\product\\11.2.0\\server\\bin'
});

user: 'board',
password: 'pass',
connectionString: 'localhost:1521/xe'
```

## 💻 사용 방법

### 콘솔 실습 실행
```bash
node ex01/sql01.js
node ex01/sql02.js

node ex02/sql01.js
node ex02/sql02.js
node ex02/sql03.js
```

Windows에서 한글 입력이 깨지는 경우:
```bash
chcp 65001
node ex02/sql02.js
```

### 웹 애플리케이션 실행
```bash
cd web
npm start
```

브라우저에서 접속:
```text
http://localhost:3001
```

## 🔗 주요 경로

- `GET /` - 메인 페이지
- `GET /haksa/pro` - 교수 관리 페이지
- `GET /haksa/pro/list.json` - 교수 목록 JSON 조회
- `GET /haksa/pro/insert` - 교수 등록 페이지
- `POST /haksa/pro/insert` - 교수 등록 처리
- `GET /haksa/stu` - 학생 관리 페이지
- `GET /haksa/cou` - 강좌 관리 페이지

## 📝 연락

- GitHub: [@EUNTELLA](https://github.com/EUNTELLA)
- 수업: 데이터베이스 개론
