# 📌 프로젝트 소개: JANBI란?

JANBI는 '잔업비서'의 줄임말로 경쟁사 웹 페이지의 특정 요소를 자동으로 모니터링하고 변경사항이 감지되면 Slack으로 알려주는 Chrome 익스텐션입니다.

# 📖 목차

<!-- toc -->

- [Motivation 🔥](#motivation-)
- [Preview 📷](#preview-)
- [Development 💻](#development-)
  - [1. 왜 익스텐션이어야 했을까?](#1-%EC%99%9C-%EC%9D%B5%EC%8A%A4%ED%85%90%EC%85%98%EC%9D%B4%EC%96%B4%EC%95%BC-%ED%96%88%EC%9D%84%EA%B9%8C)
    - [1.1 팝업으로는 외부 페이지의 DOM에 접근할 수 없습니다.](#11-%ED%8C%9D%EC%97%85%EC%9C%BC%EB%A1%9C%EB%8A%94-%EC%99%B8%EB%B6%80-%ED%8E%98%EC%9D%B4%EC%A7%80%EC%9D%98-dom%EC%97%90-%EC%A0%91%EA%B7%BC%ED%95%A0-%EC%88%98-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4)
      - [1) 팝업은 별도의 브라우저 컨텍스트입니다.](#1-%ED%8C%9D%EC%97%85%EC%9D%80-%EB%B3%84%EB%8F%84%EC%9D%98-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8%EC%9E%85%EB%8B%88%EB%8B%A4)
      - [2) 팝업 내부에서 사용자 클릭을 감지하려면 JS 코드 삽입이 필요하지만 대부분 차단됩니다.](#2-%ED%8C%9D%EC%97%85-%EB%82%B4%EB%B6%80%EC%97%90%EC%84%9C-%EC%82%AC%EC%9A%A9%EC%9E%90-%ED%81%B4%EB%A6%AD%EC%9D%84-%EA%B0%90%EC%A7%80%ED%95%98%EB%A0%A4%EB%A9%B4-js-%EC%BD%94%EB%93%9C-%EC%82%BD%EC%9E%85%EC%9D%B4-%ED%95%84%EC%9A%94%ED%95%98%EC%A7%80%EB%A7%8C-%EB%8C%80%EB%B6%80%EB%B6%84-%EC%B0%A8%EB%8B%A8%EB%90%A9%EB%8B%88%EB%8B%A4)
    - [1.2 iframe 또한 브라우저 보안 정책으로 인해 대부분의 외부 페이지를 삽입할 수 없습니다.](#12-iframe-%EB%98%90%ED%95%9C-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EB%B3%B4%EC%95%88-%EC%A0%95%EC%B1%85%EC%9C%BC%EB%A1%9C-%EC%9D%B8%ED%95%B4-%EB%8C%80%EB%B6%80%EB%B6%84%EC%9D%98-%EC%99%B8%EB%B6%80-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%A5%BC-%EC%82%BD%EC%9E%85%ED%95%A0-%EC%88%98-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4)
      - [1) iframe 삽입 자체가 차단됩니다.](#1-iframe-%EC%82%BD%EC%9E%85-%EC%9E%90%EC%B2%B4%EA%B0%80-%EC%B0%A8%EB%8B%A8%EB%90%A9%EB%8B%88%EB%8B%A4)
      - [2) 만약 iframe 삽입이 되더라도 DOM 접근은 불가능합니다.](#2-%EB%A7%8C%EC%95%BD-iframe-%EC%82%BD%EC%9E%85%EC%9D%B4-%EB%90%98%EB%8D%94%EB%9D%BC%EB%8F%84-dom-%EC%A0%91%EA%B7%BC%EC%9D%80-%EB%B6%88%EA%B0%80%EB%8A%A5%ED%95%A9%EB%8B%88%EB%8B%A4)
    - [1.3 그래서 Chrome 익스텐션을 선택했습니다.](#13-%EA%B7%B8%EB%9E%98%EC%84%9C-chrome-%EC%9D%B5%EC%8A%A4%ED%85%90%EC%85%98%EC%9D%84-%EC%84%A0%ED%83%9D%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
  - [2. DOM 요소를 선택할 때 어떤 선택자 방식이 적합할까?](#2-dom-%EC%9A%94%EC%86%8C%EB%A5%BC-%EC%84%A0%ED%83%9D%ED%95%A0-%EB%95%8C-%EC%96%B4%EB%96%A4-%EC%84%A0%ED%83%9D%EC%9E%90-%EB%B0%A9%EC%8B%9D%EC%9D%B4-%EC%A0%81%ED%95%A9%ED%95%A0%EA%B9%8C)
    - [2.1 CSS Selector와 XPath란?](#21-css-selector%EC%99%80-xpath%EB%9E%80)
      - [CSS Selector](#css-selector)
      - [XPath](#xpath)
    - [2.2 CSS Selector는 직관적이지만 한계가 있습니다.](#22-css-selector%EB%8A%94-%EC%A7%81%EA%B4%80%EC%A0%81%EC%9D%B4%EC%A7%80%EB%A7%8C-%ED%95%9C%EA%B3%84%EA%B0%80-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
    - [2.3 XPath 또한 구조 기반 접근이 가능하지만 한계가 있습니다.](#23-xpath-%EB%98%90%ED%95%9C-%EA%B5%AC%EC%A1%B0-%EA%B8%B0%EB%B0%98-%EC%A0%91%EA%B7%BC%EC%9D%B4-%EA%B0%80%EB%8A%A5%ED%95%98%EC%A7%80%EB%A7%8C-%ED%95%9C%EA%B3%84%EA%B0%80-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
    - [2.4 XPath와 CSS Selector 혼합 방식을 선택했습니다.](#24-xpath%EC%99%80-css-selector-%ED%98%BC%ED%95%A9-%EB%B0%A9%EC%8B%9D%EC%9D%84-%EC%84%A0%ED%83%9D%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
  - [3. 선택된 요소의 텍스트, 이미지 변화를 어떻게 감지할까?](#3-%EC%84%A0%ED%83%9D%EB%90%9C-%EC%9A%94%EC%86%8C%EC%9D%98-%ED%85%8D%EC%8A%A4%ED%8A%B8-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%B3%80%ED%99%94%EB%A5%BC-%EC%96%B4%EB%96%BB%EA%B2%8C-%EA%B0%90%EC%A7%80%ED%95%A0%EA%B9%8C)
    - [3.1 사용자가 선택한 요소는 서버에 저장됩니다.](#31-%EC%82%AC%EC%9A%A9%EC%9E%90%EA%B0%80-%EC%84%A0%ED%83%9D%ED%95%9C-%EC%9A%94%EC%86%8C%EB%8A%94-%EC%84%9C%EB%B2%84%EC%97%90-%EC%A0%80%EC%9E%A5%EB%90%A9%EB%8B%88%EB%8B%A4)
    - [3.2 변화 감지는 텍스트와 이미지 주소를 기준으로 합니다.](#32-%EB%B3%80%ED%99%94-%EA%B0%90%EC%A7%80%EB%8A%94-%ED%85%8D%EC%8A%A4%ED%8A%B8%EC%99%80-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%A3%BC%EC%86%8C%EB%A5%BC-%EA%B8%B0%EC%A4%80%EC%9C%BC%EB%A1%9C-%ED%95%A9%EB%8B%88%EB%8B%A4)
    - [3.3 비교 결과는 변경 여부와 함께 이력에 저장됩니다.](#33-%EB%B9%84%EA%B5%90-%EA%B2%B0%EA%B3%BC%EB%8A%94-%EB%B3%80%EA%B2%BD-%EC%97%AC%EB%B6%80%EC%99%80-%ED%95%A8%EA%BB%98-%EC%9D%B4%EB%A0%A5%EC%97%90-%EC%A0%80%EC%9E%A5%EB%90%A9%EB%8B%88%EB%8B%A4)
    - [3.4 시각적으로 의미 있는 변화만 감지해 불필요한 알림을 줄입니다.](#34-%EC%8B%9C%EA%B0%81%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%9D%98%EB%AF%B8-%EC%9E%88%EB%8A%94-%EB%B3%80%ED%99%94%EB%A7%8C-%EA%B0%90%EC%A7%80%ED%95%B4-%EB%B6%88%ED%95%84%EC%9A%94%ED%95%9C-%EC%95%8C%EB%A6%BC%EC%9D%84-%EC%A4%84%EC%9E%85%EB%8B%88%EB%8B%A4)
  - [4. Slack은 어떻게 연동할까?](#4-slack%EC%9D%80-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%97%B0%EB%8F%99%ED%95%A0%EA%B9%8C)
    - [4.1 실시간 팀 알림에 적합한 수단인 Slack을 선택했습니다.](#41-%EC%8B%A4%EC%8B%9C%EA%B0%84-%ED%8C%80-%EC%95%8C%EB%A6%BC%EC%97%90-%EC%A0%81%ED%95%A9%ED%95%9C-%EC%88%98%EB%8B%A8%EC%9D%B8-slack%EC%9D%84-%EC%84%A0%ED%83%9D%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
    - [4.2 Slack 인증은 익스텐션 팝업으로 진행합니다.](#42-slack-%EC%9D%B8%EC%A6%9D%EC%9D%80-%EC%9D%B5%EC%8A%A4%ED%85%90%EC%85%98-%ED%8C%9D%EC%97%85%EC%9C%BC%EB%A1%9C-%EC%A7%84%ED%96%89%ED%95%A9%EB%8B%88%EB%8B%A4)
    - [4.3 인증이 완료되면 서버가 Slack 채널 정보를 저장합니다.](#43-%EC%9D%B8%EC%A6%9D%EC%9D%B4-%EC%99%84%EB%A3%8C%EB%90%98%EB%A9%B4-%EC%84%9C%EB%B2%84%EA%B0%80-slack-%EC%B1%84%EB%84%90-%EC%A0%95%EB%B3%B4%EB%A5%BC-%EC%A0%80%EC%9E%A5%ED%95%A9%EB%8B%88%EB%8B%A4)
    - [4.4 Slack 메시지는 before/after 형식으로 발송됩니다.](#44-slack-%EB%A9%94%EC%8B%9C%EC%A7%80%EB%8A%94-beforeafter-%ED%98%95%EC%8B%9D%EC%9C%BC%EB%A1%9C-%EB%B0%9C%EC%86%A1%EB%90%A9%EB%8B%88%EB%8B%A4)
  - [5. 정해진 시간에 어떻게 알림을 보낼까?](#5-%EC%A0%95%ED%95%B4%EC%A7%84-%EC%8B%9C%EA%B0%84%EC%97%90-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%95%8C%EB%A6%BC%EC%9D%84-%EB%B3%B4%EB%82%BC%EA%B9%8C)
    - [5.1 node-cron으로 반복 작업 스케줄을 관리합니다.](#51-node-cron%EC%9C%BC%EB%A1%9C-%EB%B0%98%EB%B3%B5-%EC%9E%91%EC%97%85-%EC%8A%A4%EC%BC%80%EC%A4%84%EC%9D%84-%EA%B4%80%EB%A6%AC%ED%95%A9%EB%8B%88%EB%8B%A4)
    - [5.2 스케줄은 사용자 등록 시점에 동적으로 생성됩니다.](#52-%EC%8A%A4%EC%BC%80%EC%A4%84%EC%9D%80-%EC%82%AC%EC%9A%A9%EC%9E%90-%EB%93%B1%EB%A1%9D-%EC%8B%9C%EC%A0%90%EC%97%90-%EB%8F%99%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%83%9D%EC%84%B1%EB%90%A9%EB%8B%88%EB%8B%A4)
    - [5.3 서버 재시작 시 스케줄이 초기화되는 문제가 있었습니다.](#53-%EC%84%9C%EB%B2%84-%EC%9E%AC%EC%8B%9C%EC%9E%91-%EC%8B%9C-%EC%8A%A4%EC%BC%80%EC%A4%84%EC%9D%B4-%EC%B4%88%EA%B8%B0%ED%99%94%EB%90%98%EB%8A%94-%EB%AC%B8%EC%A0%9C%EA%B0%80-%EC%9E%88%EC%97%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
    - [5.4 향후에는 Redis와 큐 시스템으로 구조 개선 예정입니다.](#54-%ED%96%A5%ED%9B%84%EC%97%90%EB%8A%94-redis%EC%99%80-%ED%81%90-%EC%8B%9C%EC%8A%A4%ED%85%9C%EC%9C%BC%EB%A1%9C-%EA%B5%AC%EC%A1%B0-%EA%B0%9C%EC%84%A0-%EC%98%88%EC%A0%95%EC%9E%85%EB%8B%88%EB%8B%A4)
- [Trouble Shooting 👾](#trouble-shooting-)
  - [1. CSR 페이지에서 요소 탐색이 실패했던 이유와 Playwright로의 전환](#1-csr-%ED%8E%98%EC%9D%B4%EC%A7%80%EC%97%90%EC%84%9C-%EC%9A%94%EC%86%8C-%ED%83%90%EC%83%89%EC%9D%B4-%EC%8B%A4%ED%8C%A8%ED%96%88%EB%8D%98-%EC%9D%B4%EC%9C%A0%EC%99%80-playwright%EB%A1%9C%EC%9D%98-%EC%A0%84%ED%99%98)
    - [1.1 Cheerio는 렌더링되지 않은 HTML만 처리할 수 있습니다.](#11-cheerio%EB%8A%94-%EB%A0%8C%EB%8D%94%EB%A7%81%EB%90%98%EC%A7%80-%EC%95%8A%EC%9D%80-html%EB%A7%8C-%EC%B2%98%EB%A6%AC%ED%95%A0-%EC%88%98-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
    - [1.2 Cheerio와 Playwright를 혼합해서 사용해보았습니다.](#12-cheerio%EC%99%80-playwright%EB%A5%BC-%ED%98%BC%ED%95%A9%ED%95%B4%EC%84%9C-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%95%98%EC%8A%B5%EB%8B%88%EB%8B%A4)
    - [1.3 DOM이 다 만들어지기 전에 탐색을 시작하면 실패합니다.](#13-dom%EC%9D%B4-%EB%8B%A4-%EB%A7%8C%EB%93%A4%EC%96%B4%EC%A7%80%EA%B8%B0-%EC%A0%84%EC%97%90-%ED%83%90%EC%83%89%EC%9D%84-%EC%8B%9C%EC%9E%91%ED%95%98%EB%A9%B4-%EC%8B%A4%ED%8C%A8%ED%95%A9%EB%8B%88%EB%8B%A4)
    - [1.4 페이지 전체가 로딩되고 요소가 나올 때까지 기다려야 합니다.](#14-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%A0%84%EC%B2%B4%EA%B0%80-%EB%A1%9C%EB%94%A9%EB%90%98%EA%B3%A0-%EC%9A%94%EC%86%8C%EA%B0%80-%EB%82%98%EC%98%AC-%EB%95%8C%EA%B9%8C%EC%A7%80-%EA%B8%B0%EB%8B%A4%EB%A0%A4%EC%95%BC-%ED%95%A9%EB%8B%88%EB%8B%A4)
      - [1) 페이지 전체 렌더링이 완료될 때까지 기다리기](#1-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%A0%84%EC%B2%B4-%EB%A0%8C%EB%8D%94%EB%A7%81%EC%9D%B4-%EC%99%84%EB%A3%8C%EB%90%A0-%EB%95%8C%EA%B9%8C%EC%A7%80-%EA%B8%B0%EB%8B%A4%EB%A6%AC%EA%B8%B0)
      - [2) 특정 요소가 실제로 등장할 때까지 기다리기](#2-%ED%8A%B9%EC%A0%95-%EC%9A%94%EC%86%8C%EA%B0%80-%EC%8B%A4%EC%A0%9C%EB%A1%9C-%EB%93%B1%EC%9E%A5%ED%95%A0-%EB%95%8C%EA%B9%8C%EC%A7%80-%EA%B8%B0%EB%8B%A4%EB%A6%AC%EA%B8%B0)
      - [3) 실제로 보이는 상태인지 확인하기](#3-%EC%8B%A4%EC%A0%9C%EB%A1%9C-%EB%B3%B4%EC%9D%B4%EB%8A%94-%EC%83%81%ED%83%9C%EC%9D%B8%EC%A7%80-%ED%99%95%EC%9D%B8%ED%95%98%EA%B8%B0)
    - [1.5 CSR 페이지에서도 요소 탐지가 안정적으로 동작하게 되었습니다.](#15-csr-%ED%8E%98%EC%9D%B4%EC%A7%80%EC%97%90%EC%84%9C%EB%8F%84-%EC%9A%94%EC%86%8C-%ED%83%90%EC%A7%80%EA%B0%80-%EC%95%88%EC%A0%95%EC%A0%81%EC%9C%BC%EB%A1%9C-%EB%8F%99%EC%9E%91%ED%95%98%EA%B2%8C-%EB%90%98%EC%97%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
  - [2. 외부 페이지에서 URL 저장이 되지 않았습니다.](#2-%EC%99%B8%EB%B6%80-%ED%8E%98%EC%9D%B4%EC%A7%80%EC%97%90%EC%84%9C-url-%EC%A0%80%EC%9E%A5%EC%9D%B4-%EB%90%98%EC%A7%80-%EC%95%8A%EC%95%98%EC%8A%B5%EB%8B%88%EB%8B%A4)
    - [2.1 크롬 익스텐션의 Content Script는 페이지의 origin을 따라갑니다.](#21-%ED%81%AC%EB%A1%AC-%EC%9D%B5%EC%8A%A4%ED%85%90%EC%85%98%EC%9D%98-content-script%EB%8A%94-%ED%8E%98%EC%9D%B4%EC%A7%80%EC%9D%98-origin%EC%9D%84-%EB%94%B0%EB%9D%BC%EA%B0%91%EB%8B%88%EB%8B%A4)
    - [2.2 서버에서 CORS를 조건부 허용해보았습니다.](#22-%EC%84%9C%EB%B2%84%EC%97%90%EC%84%9C-cors%EB%A5%BC-%EC%A1%B0%EA%B1%B4%EB%B6%80-%ED%97%88%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%95%98%EC%8A%B5%EB%8B%88%EB%8B%A4)
    - [2.3 background script를 통해 요청을 보내야 했습니다.](#23-background-script%EB%A5%BC-%ED%86%B5%ED%95%B4-%EC%9A%94%EC%B2%AD%EC%9D%84-%EB%B3%B4%EB%82%B4%EC%95%BC-%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
      - [1) Content Script에서 background로 메시지를 전송합니다.](#1-content-script%EC%97%90%EC%84%9C-background%EB%A1%9C-%EB%A9%94%EC%8B%9C%EC%A7%80%EB%A5%BC-%EC%A0%84%EC%86%A1%ED%95%A9%EB%8B%88%EB%8B%A4)
      - [2) background에서 서버로 요청을 전송합니다.](#2-background%EC%97%90%EC%84%9C-%EC%84%9C%EB%B2%84%EB%A1%9C-%EC%9A%94%EC%B2%AD%EC%9D%84-%EC%A0%84%EC%86%A1%ED%95%A9%EB%8B%88%EB%8B%A4)
    - [2.4 URL 저장 기능이 모든 페이지에서 정상 동작하게 되었습니다.](#24-url-%EC%A0%80%EC%9E%A5-%EA%B8%B0%EB%8A%A5%EC%9D%B4-%EB%AA%A8%EB%93%A0-%ED%8E%98%EC%9D%B4%EC%A7%80%EC%97%90%EC%84%9C-%EC%A0%95%EC%83%81-%EB%8F%99%EC%9E%91%ED%95%98%EA%B2%8C-%EB%90%98%EC%97%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
  - [3. 특수문자 ID/class로 인해 요소 탐색이 실패했습니다.](#3-%ED%8A%B9%EC%88%98%EB%AC%B8%EC%9E%90-idclass%EB%A1%9C-%EC%9D%B8%ED%95%B4-%EC%9A%94%EC%86%8C-%ED%83%90%EC%83%89%EC%9D%B4-%EC%8B%A4%ED%8C%A8%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
    - [3.1 CSS 선택자에서 특수문자는 이스케이프 처리가 필요합니다.](#31-css-%EC%84%A0%ED%83%9D%EC%9E%90%EC%97%90%EC%84%9C-%ED%8A%B9%EC%88%98%EB%AC%B8%EC%9E%90%EB%8A%94-%EC%9D%B4%EC%8A%A4%EC%BC%80%EC%9D%B4%ED%94%84-%EC%B2%98%EB%A6%AC%EA%B0%80-%ED%95%84%EC%9A%94%ED%95%A9%EB%8B%88%EB%8B%A4)
    - [3.2 `CSS.escape()`를 사용해 선택자를 이스케이프 처리했습니다.](#32-cssescape%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4-%EC%84%A0%ED%83%9D%EC%9E%90%EB%A5%BC-%EC%9D%B4%EC%8A%A4%EC%BC%80%EC%9D%B4%ED%94%84-%EC%B2%98%EB%A6%AC%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
      - [3.3 선택자 생성 단계에서 자동 이스케이프 처리하도록 구현했습니다.](#33-%EC%84%A0%ED%83%9D%EC%9E%90-%EC%83%9D%EC%84%B1-%EB%8B%A8%EA%B3%84%EC%97%90%EC%84%9C-%EC%9E%90%EB%8F%99-%EC%9D%B4%EC%8A%A4%EC%BC%80%EC%9D%B4%ED%94%84-%EC%B2%98%EB%A6%AC%ED%95%98%EB%8F%84%EB%A1%9D-%EA%B5%AC%ED%98%84%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
    - [3.4 특수문자가 포함된 요소도 안정적으로 추적할 수 있게 되었습니다.](#34-%ED%8A%B9%EC%88%98%EB%AC%B8%EC%9E%90%EA%B0%80-%ED%8F%AC%ED%95%A8%EB%90%9C-%EC%9A%94%EC%86%8C%EB%8F%84-%EC%95%88%EC%A0%95%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%B6%94%EC%A0%81%ED%95%A0-%EC%88%98-%EC%9E%88%EA%B2%8C-%EB%90%98%EC%97%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
  - [4. 일부 페이지에서 요소 선택 UI가 깨지거나 보이지 않았습니다.](#4-%EC%9D%BC%EB%B6%80-%ED%8E%98%EC%9D%B4%EC%A7%80%EC%97%90%EC%84%9C-%EC%9A%94%EC%86%8C-%EC%84%A0%ED%83%9D-ui%EA%B0%80-%EA%B9%A8%EC%A7%80%EA%B1%B0%EB%82%98-%EB%B3%B4%EC%9D%B4%EC%A7%80-%EC%95%8A%EC%95%98%EC%8A%B5%EB%8B%88%EB%8B%A4)
    - [4.1 외부 웹 사이트의 스타일이 UI에 영향을 주었습니다.](#41-%EC%99%B8%EB%B6%80-%EC%9B%B9-%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%9D%98-%EC%8A%A4%ED%83%80%EC%9D%BC%EC%9D%B4-ui%EC%97%90-%EC%98%81%ED%96%A5%EC%9D%84-%EC%A3%BC%EC%97%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
    - [4.2 Shadow DOM을 사용해 UI를 캡슐화시켰습니다.](#42-shadow-dom%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%B4-ui%EB%A5%BC-%EC%BA%A1%EC%8A%90%ED%99%94%EC%8B%9C%EC%BC%B0%EC%8A%B5%EB%8B%88%EB%8B%A4)
      - [1) 스타일도 Shadow DOM 내부에 삽입했습니다.](#1-%EC%8A%A4%ED%83%80%EC%9D%BC%EB%8F%84-shadow-dom-%EB%82%B4%EB%B6%80%EC%97%90-%EC%82%BD%EC%9E%85%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
      - [2) 유저가 선택할 때 UI 스타일은 원래 페이지에 스타일을 삽입했습니다.](#2-%EC%9C%A0%EC%A0%80%EA%B0%80-%EC%84%A0%ED%83%9D%ED%95%A0-%EB%95%8C-ui-%EC%8A%A4%ED%83%80%EC%9D%BC%EC%9D%80-%EC%9B%90%EB%9E%98-%ED%8E%98%EC%9D%B4%EC%A7%80%EC%97%90-%EC%8A%A4%ED%83%80%EC%9D%BC%EC%9D%84-%EC%82%BD%EC%9E%85%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
    - [4.3 모든 사이트에서 UI가 안정적으로 작동합니다.](#43-%EB%AA%A8%EB%93%A0-%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%97%90%EC%84%9C-ui%EA%B0%80-%EC%95%88%EC%A0%95%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%9E%91%EB%8F%99%ED%95%A9%EB%8B%88%EB%8B%A4)
- [User Experience 👥](#user-experience-)
  - [1. 변경 이력 페이지에 페이지네이션을 도입했습니다.](#1-%EB%B3%80%EA%B2%BD-%EC%9D%B4%EB%A0%A5-%ED%8E%98%EC%9D%B4%EC%A7%80%EC%97%90-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98%EC%9D%84-%EB%8F%84%EC%9E%85%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
  - [2. 같은 내용의 이력은 한 번만 저장되도록 개선했습니다.](#2-%EA%B0%99%EC%9D%80-%EB%82%B4%EC%9A%A9%EC%9D%98-%EC%9D%B4%EB%A0%A5%EC%9D%80-%ED%95%9C-%EB%B2%88%EB%A7%8C-%EC%A0%80%EC%9E%A5%EB%90%98%EB%8F%84%EB%A1%9D-%EA%B0%9C%EC%84%A0%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
  - [3. 비개발자도 쉽게 사용할 수 있도록 요소 선택 UI를 개선했습니다.](#3-%EB%B9%84%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%8F%84-%EC%89%BD%EA%B2%8C-%EC%82%AC%EC%9A%A9%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8F%84%EB%A1%9D-%EC%9A%94%EC%86%8C-%EC%84%A0%ED%83%9D-ui%EB%A5%BC-%EA%B0%9C%EC%84%A0%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
    - [3.1 선택 가능한 상태를 시각적으로 안내했습니다.](#31-%EC%84%A0%ED%83%9D-%EA%B0%80%EB%8A%A5%ED%95%9C-%EC%83%81%ED%83%9C%EB%A5%BC-%EC%8B%9C%EA%B0%81%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%95%88%EB%82%B4%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
    - [3.2 선택 완료된 요소는 눈에 띄게 강조했습니다.](#32-%EC%84%A0%ED%83%9D-%EC%99%84%EB%A3%8C%EB%90%9C-%EC%9A%94%EC%86%8C%EB%8A%94-%EB%88%88%EC%97%90-%EB%9D%84%EA%B2%8C-%EA%B0%95%EC%A1%B0%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
    - [3.3 사용자에게는 복잡한 선택자 대신 직관적인 콘텐츠 정보만 노출했습니다.](#33-%EC%82%AC%EC%9A%A9%EC%9E%90%EC%97%90%EA%B2%8C%EB%8A%94-%EB%B3%B5%EC%9E%A1%ED%95%9C-%EC%84%A0%ED%83%9D%EC%9E%90-%EB%8C%80%EC%8B%A0-%EC%A7%81%EA%B4%80%EC%A0%81%EC%9D%B8-%EC%BD%98%ED%85%90%EC%B8%A0-%EC%A0%95%EB%B3%B4%EB%A7%8C-%EB%85%B8%EC%B6%9C%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
- [Tech Stack 🛠️](#tech-stack-%EF%B8%8F)
  - [React + Vite](#react--vite)
  - [Node.js + Express.js](#nodejs--expressjs)
  - [Playwright](#playwright)
  - [node-cron](#node-cron)
  - [Tailwind CSS](#tailwind-css)
- [Timeline 🗓](#timeline-) - [2025.03.31 - 2025.04.25](#20250331---20250425)

<!-- tocstop -->

# Motivation 🔥

> "자주 들어가서 확인해야 하는 페이지, 누군가 대신 확인해주고 알려준다면 얼마나 편할까?”

개발 지식이 없는 사용자들도
“경쟁사의 가격이 바뀌었는지”,
“새로운 상품이 등록되었는지” 같은 세부적인 내용을
매번 직접 확인하지 않고도 자동으로 알림을 받을 수 있도록 하는 것이 목표였습니다. <br>
그래서 JANBI는 익스텐션 형태로 아래 기능을 제공합니다.

![dashboard](./assets/motivation1.png)

- 사용자가 페이지에서 모니터링하고 싶은 DOM 요소를 클릭으로 선택합니다.
- 요일과 시간을 선택하면 정해진 시간마다 해당 요소를 분석합니다.
- 선택한 요소가 변경되면 이를 감지합니다.
- 감지하면 Slack 알림으로 변경사항을 받아볼 수 있습니다.

번거롭고 비효율적인 일을 자동화 해 사용자를 대신해 일해주는 디지털 비서의 경험을 제공하고자 이 서비스를 만들게 되었습니다.

# Preview 📷

<details>
<summary><strong>🔍 STEP 1: 페이지에서 모니터링하고 싶은 요소를 클릭으로 선택합니다.</strong></summary>

![모니터링 요소 선택](./assets/preview1.gif)

</details>

<details>
<summary><strong>🔍 STEP 2: 모니터링할 페이지의 이름을 설정하고 알림 주기를 설정합니다.</strong></summary>

![페이지 이름 및 주기 설정](./assets/preview2.gif)

</details>

<details>
<summary><strong>🔍 STEP 3: 알림받을 슬랙의 워크스페이스를 연결합니다.</strong></summary>

![슬랙 워크스페이스 설정](./assets/preview3.gif)

</details>

<details>
<summary><strong>🔍 STEP 4: 대시보드에서 변경 내역을 확인할 수 있습니다.</strong></summary>

![대시보드 변경 내역](./assets/preview4.png)

</details>

<details>
<summary><strong>🔍 STEP 5: 각 모니터링 요소의 상세 내역을 확인할 수 있습니다.</strong></summary>

![변경 상세 내역](./assets/preview5.gif)

</details>

# Development 💻

## 1. 왜 익스텐션이어야 했을까?

초기에는 사용자가 입력한 URL을 팝업 창으로 띄우거나 iframe에 삽입해 DOM 요소를 선택하도록 하는 방식을 고민했습니다. 하지만 현실적인 브라우저 보안 정책과 기술적인 제약으로 인해 이 접근은 불가능했습니다.

### 1.1 팝업으로는 외부 페이지의 DOM에 접근할 수 없습니다.

**팝업은 동일한 페이지를 띄워도 외부 창이기 때문에 현재 앱과 DOM을 공유할 수 없었습니다.**<br>
초기에는 사용자가 입력한 URL을 `window.open()` 으로 새 창으로 띄우고 그 안에서 요소를 선택하는 방식으로 구현을 고려했습니다. 하지만 이 접근은 기술적인 제약이 있었습니다.

#### 1) 팝업은 별도의 브라우저 컨텍스트입니다.

팝업으로 열린 창은 부모 창과는 별개의 DOM 트리와 JavaScript 스코프를 갖습니다.<br>
window.opener.document 처럼 접근을 시도하면 동일 출처 정책(Same-Origin Policy)에 따라 다음과 같은 보안 오류가 발생했습니다.

> Same-Origin Policy는 스크립트가 접근하려는 리소스가 같은 출처일 때만 DOM 접근을 허용하는 보안 정책입니다.

```
Uncaught DOMException: Blocked a frame with origin "도메인"
from accessing a cross-origin frame.
```

팝업으로 열린 페이지의 DOM을 조작하거나 값 추출은 출처가 같을 때만 가능하며 외부 사이트는 JANBI의 출처와 다르기 때문에 DOM 접근 자체가 불가능했습니다.

Same-Origin Policy는 다음 중 하나라도 다르면 접근이 불가능합니다.

- 프로토콜 (http vs https)
- 도메인 (janbi.com vs other-example.com)
- 포트 (:3000 vs :443)

만약 팝업으로 열린 웹사이트가 https://www.naver.com 이라면 JANBI와 전혀 다른 출처를 가지므로 코드로 DOM에 접근할 수 없는 것이었습니다.

#### 2) 팝업 내부에서 사용자 클릭을 감지하려면 JS 코드 삽입이 필요하지만 대부분 차단됩니다.

팝업 내부에서 사용자가 클릭한 요소를 감지하려면, 해당 페이지 안에 JS 코드를 주입해야 합니다.<br>
이를 위해 `window.postMessage()`로 통신을 시도하거나 스크립트를 삽입해 클릭 이벤트를 감지하려 했지만 대부분의 외부 사이트는 **Content Security Policy(CSP)** 로 인해 스크립트 삽입을 차단합니다.<br>
결과적으로 팝업 방식은 사용자 행동을 추적하거나 DOM 값을 전달받을 수 없다는 한계가 있었습니다.

### 1.2 iframe 또한 브라우저 보안 정책으로 인해 대부분의 외부 페이지를 삽입할 수 없습니다.

처음에는 외부 웹사이트를 iframe으로 JANBI 페이지에 삽입한 뒤 그 안에서 DOM 요소를 직접 클릭하거나 추적하는 방식도 고려했습니다. 하지만 iframe 방식은 브라우저 보안 정책에 의해 Naver, Google, Instagram 등과 같은 주요 웹사이트에서 차단되며 DOM 접근 또한 불가능하다는 문제점이 있었습니다.

#### 1) iframe 삽입 자체가 차단됩니다.

많은 웹 사이트는 보안을 위해 자신의 페이지가 다른 웹사이트의 iframe 안에서 열리지 않도록 설정하고 있었습니다. 이 때 대표적으로 사용되는 HTTP 응답 헤더는 다음 두가지였습니다.

- X-Frame-Options: DENY 또는 SAMEORIGIN
  > 아예 iframe 삽입을 막거나 같은 origin 에서만 iframe 삽입을 허용합니다.
- Content-Security-Policy: frame-ancestors 'none'
  > 어떤 출처에서도 해당 페이지를 iframe으로 삽입하는 것을 허용하지 않습니다.

예를 들어 https://www.naver.com 은 iframe 삽입이 시도되면 브라우저 콘솔에 다음과 같은 오류가 발생하며 페이지가 불러와지지 않았습니다.

```
Refused to display 'https://www.naver.com/' in a frame because it set 'X-Frame-Options' to 'sameorigin'.

```

![iframe에러](./assets/iframeError.png)

우리 서비스가 외부 웹 사이트를 iframe에 넣는 시도 자체가 근본적으로 차단되는 것이었습니다.

#### 2) 만약 iframe 삽입이 되더라도 DOM 접근은 불가능합니다.

iframe 삽입을 허용한 사이트가 있더라도 팝업에서 DOM 접근에 불가능했던 것과 같이 동일 출처 정책에 걸려 다음과 같은 보안 오류가 발생했습니다.

```
Uncaught DOMException: Blocked a frame with origin "도메인" from accessing a cross-origin frame.
```

iframe으로 외부 페이지를 불러와도 해당 페이지의 DOM에 접근해 요소를 추적하거나 클릭 이벤트를 감지하는 것은 불가능했습니다.

### 1.3 그래서 Chrome 익스텐션을 선택했습니다.

![익스텐션패널](./assets/패널.png)

위의 두 방식 모두 브라우저 보안 정책에 막혀 외부 페이지의 DOM을 분석하거나 조작하는 기능을 구현할 수 없었습니다.<br>
반면, Chrome 익스텐션은 Content Script를 통해 외부 웹사이트에 직접 주입되어 DOM에 접근할 수 있으며, UI 삽입, 요소 추적, 이벤트 리스닝 등이 가능했습니다.<br>
JANBI는 이 구조를 기반으로 사용자가 마우스로 클릭한 요소를 추적하고 스케줄에 따라 이를 분석하며 변경된 경우 Slack 알림을 보내는 전체 흐름을 구현할 수 있었습니다.<br>

## 2. DOM 요소를 선택할 때 어떤 선택자 방식이 적합할까?

JANBI는 사용자가 웹페이지에서 클릭한 요소를 추적하는 구조이기 때문에 "해당 요소를 가장 안정적으로 다시 찾을 수 있는 선택자"를 생성하는 것이 핵심이었습니다. 처음엔 CSS Selector만을 사용했지만 실제 웹페이지 구조의 다양성과 한계를 마주하며 XPath와의 혼합 방식으로 발전하게 되었습니다.

### 2.1 CSS Selector와 XPath란?

웹 페이지의 DOM 요소를 가리키는 방식은 대표적으로 두 가지가 있습니다.

#### CSS Selector

HTML의 id, class, 태그, 구조 등을 기반으로 요소를 선택합니다.

> 예시 <br>
> div.content > ul > li:nth-child(2)

#### XPath

DOM 트리의 경로 기반으로 요소를 탐색하는 방식입니다.

> 예시 <br>
> /html/body/div[2]/ul/li[2]
> //\*[@id="price"]

### 2.2 CSS Selector는 직관적이지만 한계가 있습니다.

초기에는 .class, #id 같은 CSS Selector 기반으로 요소를 선택했습니다. <br>
이는 직관적이고 대부분의 요소를 쉽게 선택할 수 있었습니다. 하지만 아래와 같은 경우에서는 CSS Selector만으로는 정확한 요소를 잡기 어려웠습니다.

- id/class가 없는 구조적 요소
- 요소가 반복 구조 안에 있을 경우
- DOM 구조가 자주 바뀌는 경우

> 예시: ul > li:nth-child(2) <br>
> A/B 테스트로 li 순서가 바뀌면 다른 요소가 선택되는 문제가 발생할 수 있습니다.

이러한 이유로, 동적인 구조에서는 CSS Selector만으로는 요소를 안정적으로 추적하기 어려운 경우가 많았습니다.

### 2.3 XPath 또한 구조 기반 접근이 가능하지만 한계가 있습니다.

그래서 XPath로 방식을 수정했습니다.<br>
XPath는 DOM 구조 기반 접근이 가능해 다음과 같은 장점이 있었습니다.

- 동적 class 이름 없이도 위치 기반 접근이 가능하다.
- 중첩된 구조에서도 정확한 경로 표현이 가능하다.
- 반복적인 구조 안에서도 유일한 위치를 표현 가능하다.
  > 예시 <br>
  > //ul/li[3]/span (리스트 중 3번째 항목)

하지만 XPath도 제약이 있었습니다.

일부 웹 사이트는 Shadow DOM을 사용하고 있었고 이 내부에 있는 요소들은 일반적인 XPath 방식으로는 탐색이 되지 않았습니다.

> 📌 Shadow DOM이란?
> <br>
> Shadow DOM은 웹 컴포넌트의 일부로, 캡슐화된 별도의 DOM 트리입니다.
> 외부 스크립트나 XPath 같은 일반적인 DOM 탐색 방식으로는 내부 요소를 접근할 수 없습니다.

이로 인해 XPath만으로는 모든 요소를 안정적으로 추적할 수 없었고, 구조에 따라 다른 방식이 필요했습니다.

### 2.4 XPath와 CSS Selector 혼합 방식을 선택했습니다.

JANBI는 다음과 같은 방식으로 선택자 타입을 결정하도록 했습니다.

- Shadow DOM 안의 요소 일 때는 CSS Selector 방식을 사용합니다.
- 일반 DOM 요소는 XPath 방식을 사용합니다.

```
if (isShadowDom) {
  return { type: "css", selector: getCssSelector(targetElement) };
} else {
  return { type: "xpath", selector: getXPath(targetElement) };
}
```

이처럼 실제 DOM 구조에 따라 동적으로 적절한 선택자 방식을 판단하고 요소를 추적할 수 있도록 구현했습니다.

## 3. 선택된 요소의 텍스트, 이미지 변화를 어떻게 감지할까?

JANBI는 사용자가 시각적으로 인지할 수 있는 실질적인 콘텐츠 변화만 감지합니다.<br>
단순한 HTML 구조나 속성 변화가 아닌 **텍스트 또는 이미지의 실제 값**이 바뀌었는지를 기준으로 삼습니다.

### 3.1 사용자가 선택한 요소는 서버에 저장됩니다.

사용자가 Chrome 확장 프로그램에서 클릭한 요소는 다음 정보를 포함해 서버로 전송됩니다.

- `type`: css 또는 xpath
- `selector`: 실제 선택자 문자열
- `content`: 선택 당시의 텍스트 혹은 이미지 주소

서버는 이 정보를 기준값으로 저장하며 추후 감지 주기에 따라 이 값과 최신 값을 비교하게 됩니다.

### 3.2 변화 감지는 텍스트와 이미지 주소를 기준으로 합니다.

요소의 어떤 속성이 바뀌었는지를 판별하기 위해 아래와 같이 조건을 분리했습니다.

- 텍스트는 `.textContent()` 를 통해 공백을 제거한 순수 텍스트를 추출합니다.
- 이미지는 `.getAttribute("src")` 를 통해 실제 보여지는 이미지 경로를 비교합니다.

### 3.3 비교 결과는 변경 여부와 함께 이력에 저장됩니다.

추출된 값은 이전 값과 비교됩니다.

- 변경됨: beforeHtml과 afterHtml이 다를 때
- 변경 없음: 두 값이 동일할 때

이 정보는 DB의 ChangeLog에 기록되며 Slack 알림에도 사용됩니다.

### 3.4 시각적으로 의미 있는 변화만 감지해 불필요한 알림을 줄입니다.

JANBI는 UI 상의 실제 변화만 주목합니다. HTML 구조의 미세한 변경이나 class 속성의 추가/삭제처럼 사용자에게 시각적으로 보이지 않는 변화는 감지 대상이 아닙니다.<br>

| 변경 예시                                                      | 변경 감지 여부   |
| -------------------------------------------------------------- | ---------------- |
| "오늘 마감" → "내일 마감"                                      | ✅ 감지됨        |
| `src="/banner1.png"` → `src="/banner2.png"`                    | ✅ 감지됨        |
| `<div class="new updated">` → `<div class="new latest">`       | ❌ 감지되지 않음 |
| HTML 내부 순서 변경, 스타일 변경 등 눈에 띄지 않는 기술적 변경 | ❌ 감지되지 않음 |

즉, 단순히 DOM이 바뀌었는지가 아닌 **사용자가 보기에 달라졌는가?** 를 기준으로 추적합니다.<br>
이 기준은 시각적 영향이 없는 변경은 무시하므로 불필요한 알림을 최소화하고 사용자에게 실제 영향을 주는 내용만을 전달합니다.

## 4. Slack은 어떻게 연동할까?

JANBI는 사용자가 선택한 요소의 변경사항을 지정된 시간에 자동으로 분석하고 그 결과를 Slack 채널로 알려주는 기능을 제공합니다.
이 Slack 연동은 익스텐션과 서버가 역할을 나누어 함께 작동합니다.

### 4.1 실시간 팀 알림에 적합한 수단인 Slack을 선택했습니다.

Slack은 스타트업 환경에서 이메일보다 더 빠르고 협업에 최적화된 커뮤니케이션 도구입니다. 이러한 특성을 고려해 Slack을 주요 알림 수단으로 선택했습니다.

많은 스타트업 팀은 실시간 소통과 빠른 피드백을 위해 Slack을 메신저처럼 사용하고 있습니다. JANBI도 웹 페이지 변경사항을 팀 전체에 빠르게 공유하고 즉각적인 대응을 가능하게 하는 것을 목표로 합니다.

이메일은 주로 개인 단위 전달에 적합하고 확인까지 시간이 걸리는 반면, Slack은 메시지 형태로 알림을 실시간 전송받고 팀 채널에 공유할 수 있어 반응 속도가 훨씬 빠릅니다.

특히 JANBI는 경쟁사 페이지 모니터링, 가격 변경 감지 등 빠른 의사결정이 중요한 스타트업 팀을 주요 타겟으로 하고 있기 때문에 Slack이 가장 적합하다고 생각했습니다.

### 4.2 Slack 인증은 익스텐션 팝업으로 진행합니다.

1. 사용자가 웹페이지에서 DOM 요소를 선택하고 이름과 알림 스케줄(요일/시간)을 설정하면 해당 정보가 서버로 전송됩니다.

2. 서버는 요소 데이터를 저장하고 응답으로 URL에 대한 고유 식별자(id)를 반환합니다.

3. 익스텐션은 이 urlId를 포함한 Slack 인증 URL을 생성하고 새 창으로 인증 팝업을 띄웁니다.

```
const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${SLACK_CLIENT_ID}&scope=chat:write,incoming-webhook&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${urlId}`;

window.open(slackAuthUrl, "_blank", "width=600,height=800");
```

URL의 고유 식별자(id)는 인증 완료 후 서버에서 어떤 URL에 Slack 채널을 연결할 지 식별하는 데 사용됩니다.

### 4.3 인증이 완료되면 서버가 Slack 채널 정보를 저장합니다.

1. 사용자가 Slack 인증을 완료하면 Slack은 인증 결과를 `redirect_uri`로 전달합니다. 이때 두 가지 주요 값이 함께 포함됩니다.

- `code`: Slack이 인증을 마친 후 보내주는 **일회용 비밀번호** 같은 값입니다.
  서버는 이 code를 가지고 Slack에 다시 요청해서 실제로 메시지를 보낼 수 있는 권한(access token)을 받게 됩니다.
- `state`: 인증을 요청할 때 함께 보내는 **이 인증이 어떤 작업을 위한 건지 기억해두는 표시**입니다.
  예를 들어, 사용자가 모니터링하려는 URL을 등록하면 그 설정에는 고유한 ID(urlId)가 생기고 이 값을 state에 담아 보냅니다. Slack 인증이 완료된 후 서버는 이 state 값을 보고 어떤 URL 설정에 Slack 채널을 연결해야 할지 알 수 있습니다.

2. 요청이 성공하면 Slack은 다음과 같은 정보를 응답으로 보내줍니다.

- `access_token`: Slack API를 호출할 수 있는 토큰
- `channel_id`, `channel_name`: 알림을 보낼 채널 정보
- `webhook_url`: 해당 채널로 메시지를 보낼 수 있는 Webhook 주소

4. 서버는 응답받은 정보를 기반으로 해당 URL에 Slack 정보를 저장합니다.

```
await Url.findByIdAndUpdate(state, {
  slack: {
    token: access_token,
    channelId: incoming_webhook.channel_id,
    channelName: incoming_webhook.channel,
    webhookUrl: incoming_webhook.url,
  },
});
```

### 4.4 Slack 메시지는 before/after 형식으로 발송됩니다.

알림은 변경 여부에 따라 다음과 같이 다르게 구성했습니다.

- 🔔 변경이 감지된 경우: 최대 3개의 변경 내용을 before/after로 요약
- 📌 변경이 없을 경우: "변경 사항 없음" 안내 메시지 전송

![슬랙알림](./assets/슬랙알림.png)

## 5. 정해진 시간에 어떻게 알림을 보낼까?

JANBI는 사용자가 설정한 요일과 시간에 맞춰 경쟁사 웹 페이지를 자동으로 분석하고 변경사항이 있는 경우 Slack으로 알림을 보냅니다.<br>
이 기능은 `node-cron` 라이브러리를 통해 구현되어 있습니다.

> 📌 node-cron이란?<br>
> 일반적인 크론 표현식(예: 매주 월요일 오전 9시)에 따라 특정 작업을 주기적으로 실행할 수 있도록 도와주는 Node.js 기반의 스케줄러입니다.

### 5.1 node-cron으로 반복 작업 스케줄을 관리합니다.

- **간단한 문법**: `"30 9 * * 1"`처럼 직관적인 표현식으로 실행 시점을 지정할 수 있습니다.
- **추가 설치 필요 없음**: OS 수준 크론 설정 없이 Node.js 안에서 실행가능합니다.
- **정기 작업에 특화**: "매일 오전 9시", "매주 금요일 오후 6시" 같은 반복 작업에 최적화되어있습니다.

JANBI처럼 정해진 시간마다 반복적으로 스크래핑 작업을 실행해야 하는 서비스에서는 `node-cron`이 좋은 선택이라고 생각했습니다.

### 5.2 스케줄은 사용자 등록 시점에 동적으로 생성됩니다.

1. 사용자가 익스텐션에서 URL, 요일, 시간, 추적 요소를 등록합니다.
2. 서버는 해당 정보를 바탕으로 크론 스케줄을 생성하고 `node-cron.schedule()`로 등록합니다.
3. 등록된 시간에 자동으로 페이지를 스크래핑하고 요소가 바뀌었는지 감지합니다.
4. 변화가 감지되면 Slack으로 알림을 보냅니다.

```
cron.schedule("0 10 * * 1", () => {
  // 매주 월요일 오전 10시에 실행
  detectChanges(...);
});
```

JANBI에서는 요일, 시간 값을 기준으로 동적으로 크론 표현식을 생성해 스케줄을 등록합니다.

### 5.3 서버 재시작 시 스케줄이 초기화되는 문제가 있었습니다.

이 방식은 현재 단일 서버로 운영되는 제 프로젝트에서는 충분히 작동하지만 한계도 있었습니다.

- 서버 재시작 시 스케줄 초기화
  이를 보완하기 위해 부팅 시 DB에서 스케줄을 다시 불러오는 `initializeSchedule()`을 구현했습니다.
- 수평 확장 어려움
  서버를 여러 대로 늘릴 경우 중복 실행이 발생할 수 있습니다.
- 복잡한 일정 처리 불가
  공휴일 제외, 10분 간격 반복 등 유연한 일정 처리는 어렵습니다.

### 5.4 향후에는 Redis와 큐 시스템으로 구조 개선 예정입니다.

Redis + 메시지 큐 구조로 개선할 수 있다고 생각했습니다.

1. 사용자가 URL, 알림 시간, Slack 채널을 등록하면 서버는 이 정보를 Redis에 저장합니다.
2. 동시에 메시지 큐(Bull 등)에 작업이 등록되고 지정된 시간에 실행될 준비를 합니다.
3. 시간이 되면 큐가 작업을 실행해 페이지를 분석하고 변경사항이 있다면 Slack으로 알립니다.

이 방식은 서버가 여러 대일 경우에도 작업 중복 없이 안정적으로 처리할 수 있고, 공휴일 제외, 시간대별 반복 등 다양한 조건을 유연하게 반영할 수 있습니다.

현재 JANBI는 단순하고 반복적인 작업이 중심이기 때문에 node-cron 기반으로 충분히 작동합니다.

서비스가 확장되면 안정성과 유연성을 고려해 장기적으로는 Redis + 메시지 큐 기반 구조로 확장할 계획입니다.

# Trouble Shooting 👾

## 1. CSR 페이지에서 요소 탐색이 실패했던 이유와 Playwright로의 전환

CSR(Client-Side Rendering) 기반 웹사이트는 JavaScript가 실행된 후에야 실제 DOM 요소들이 만들어지기 때문에 초기 HTML에는 원하는 데이터가 포함되어 있지 않습니다.<br>
이로 인해 정적 HTML만 처리하는 도구인 Cheerio로는 애초에 해당 요소를 탐색할 수 없는 구조적 한계가 있었습니다.

### 1.1 Cheerio는 렌더링되지 않은 HTML만 처리할 수 있습니다.

Cheerio는 서버에서 받은 HTML을 정적으로 파싱하는 도구입니다. 하지만 CSR 페이지는 JavaScript가 실행된 이후에야 필요한 데이터와 요소가 동적으로 생성되기 때문에 Cheerio는 다음과 같은 한계를 가집니다.

- HTML 구조는 있지만 실제 텍스트나 이미지 데이터가 없음
- JavaScript가 만든 요소는 HTML 소스에 포함되지 않음
- 사용자가 보는 정보와 서버가 받은 HTML이 다름

HTML에는 사용자에게 보이는 핵심 정보가 포함되지 않기 때문에 애초에 비교 대상이 되는 콘텐츠를 추출할 수 없어 변경 감지 자체가 불가능했습니다.

### 1.2 Cheerio와 Playwright를 혼합해서 사용해보았습니다.

처음에는 페이지 성격에 따라 다르게 처리해보려 했습니다.

- 정적 페이지는 Cheerio로 빠르게 처리
- CSR 페이지는 Playwright로 렌더링 후 감지

Cheerio는 속도가 빠르고 의존성이 적다는 장점이 있었기 때문에 정적 페이지는 빠르게 처리해서 결과를 보여줘야하지 않을까 생각한 것입니다.

하지만 JANBI는 사용자가 브라우저에서 실시간으로 결과를 확인하는 서비스가 아닌, 스케줄에 따라 주기적으로 스크래핑하고 Slack으로 알림만 보내는 구조이기 때문에 렌더링 방식과 무관하게 모든 페이지에서 일관된 결과를 확보하는 것이 더 중요했습니다. <br>
따라서 모든 페이지를 Playwright 기반으로 통일했습니다.

### 1.3 DOM이 다 만들어지기 전에 탐색을 시작하면 실패합니다.

Playwright를 사용하면 CSR 페이지의 실제 렌더링된 DOM에 접근할 수 있습니다.<br>
하지만 JavaScript 실행이 완료되기 전이나 요소가 나타나기 전에 탐색을 시도하면 타이밍 문제로 인해 요소를 찾을 수 없었습니다.

CSR 방식은 JavaScript가 실행된 후에야 실제 화면이 구성됩니다.<br>
Playwright는 페이지 로딩 직후부터 코드를 실행할 수 있는데 이 시점에는 요소들이 DOM에 나타나지 않은 상태일 수 있는 것입니다.

예를 들어, Playwright에서 다음과 같은 요소를 찾을 때

```
const title = await page.locator("#price").textContent();
```

요소가 아직 로드되지 않았다면 null이 반환되거나 에러가 발생합니다.

### 1.4 페이지 전체가 로딩되고 요소가 나올 때까지 기다려야 합니다.

이러한 타이밍 문제를 해결하기 위해 Playwright에서는 렌더링 완료까지 기다리는 기능들을 활용할 수 있었습니다.

#### 1) 페이지 전체 렌더링이 완료될 때까지 기다리기

```
await page.goto(url, { waitUntil: "networkidle" });
```

Playwright의 `page.goto()` 에서 `waitUntil: "networkidle"` 을 사용하면 네트워크 요청이 일정 시간 이상 없을 때까지 기다린 뒤 다음 코드가 실행됩니다.
이 설정은 CSR 페이지에서 리소스 로딩 및 JavaScript 초기 실행이 안정적으로 끝난 시점을 기준으로 이후 탐색 로직을 실행하게 해줍니다.

#### 2) 특정 요소가 실제로 등장할 때까지 기다리기

```
const locator = page.locator(selector);
await locator.waitFor({ state: "attached", timeout: 10000 });
```

`locator.waitFor()` 메서드는 해당 요소가 DOM에 생성될 때까지 기다리는 기능입니다.
요소가 최대 10초 이내에 DOM에 나타나면 탐지에 성공하고 그렇지 않으면 타임아웃 에러가 발생합니다.

#### 3) 실제로 보이는 상태인지 확인하기

DOM에 생성된 요소가 실제로 사용자에게 보여지는지 확인합니다.

```
if (await locator.isVisible()) {
  const tag = await locator.evaluate(el => el.tagName);
}
```

`isVisible()`은 요소가 실제로 화면에 보이는지를 확인해주며 `display: none`, `opacity: 0`, `visibility: hidden` 등으로 가려진 요소를 제외한 실제 사용자에게 노출된 요소만 감지할 수 있습니다.

### 1.5 CSR 페이지에서도 요소 탐지가 안정적으로 동작하게 되었습니다.

기존에는 CSR 웹 페이지에서 요소 탐지가 자주 실패했고 그에 따라 잘못된 변경 알림이나 알림 누락이 발생할 수 있었습니다.<br>
하지만 렌더링을 대기하는 메서드, 요소 등장까지 대기하는 메서드, 화면에 보이는지 확인하는 메서드를 함께 활용해 페이지 전체 로딩 -> 요소 등장 -> 시각적 확인이라는 안정적인 탐색 흐름을 구현할 수 있었습니다.

이로써 CSR 페이지에서도 안정적으로 요소를 탐색하고 변경 여부를 정확하게 판단할 수 있게 되었습니다.

## 2. 외부 페이지에서 URL 저장이 되지 않았습니다.

JANBI는 사용자가 방문 중인 웹페이지 위에서 특정 요소를 클릭하면 그 정보를 서버에 저장해 추후 변경을 감지합니다.<br>
하지만 이 기능이 동작하지 않는 문제가 있었고 원인은 `CORS(Cross-Origin Resource Sharing)` 정책 때문이었습니다.

> 📌 CORS(Cross-Origin Resource Sharing)란?<br>
> 웹 브라우저가 보안을 위해 서로 다른 출처(origin) 간의 요청을 제한하는 정책입니다.<br>
> 서버가 Access-Control-Allow-Origin에 명시적으로 해당 출처를 허용하지 않으면 요청은 실패합니다.

### 2.1 크롬 익스텐션의 Content Script는 페이지의 origin을 따라갑니다.

Chrome 익스텐션에서 DOM 요소를 추적하려면 `Content Script`가 필요합니다.<br>
`Content Script`는 웹페이지 위에서 실행되기 때문에 요청의 출처(Origin)는 사용자가 보고 있는 웹사이트 주소와 동일하게 됩니다. 즉, 서버 입장에서는 웹사이트 자체가 JANBI 서버에 직접 요청하는 것처럼 보이는 상황이 됩니다.

![background적용전](./assets/background전.png)

CORS 정책상 서버가 명시적으로 허용한 origin이 아닌 경우 브라우저는 요청을 차단합니다.

```
Access to fetch at 'https://janbi-server-production.up.railway.app/urls' from origin '외부 도메인' has been blocked by CORS policy.
```

### 2.2 서버에서 CORS를 조건부 허용해보았습니다.

처음에는 이 요청이 크롬 익스텐션에서 오는 요청이라고 생각했습니다.<br>
익스텐션은 일반적으로 `chrome-extension://` 이라는 출처(origin)를 갖기 때문에 서버에서 이 익스텐션 주소를 포함한 몇 가지 안전한 출처만 허용하도록 CORS 설정을 작성했습니다.

```
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS 에러: 허용되지 않은 origin입니다."));
    }
  },
  credentials: true,
}));
```

하지만 이 설정은 동작하지 않았습니다.<br>
왜냐하면 실제로 요청을 보낸 것은 익스텐션 자체가 아니라 웹페이지에 주입된 `Content Script`였기 때문입니다.

즉, 요청의 출처가 `chrome-extension://`이 아니라 사용자가 열어본 웹사이트 주소였고 이 웹사이트는 CORS 허용 목록에 없었기 때문에 요청이 계속 차단되었던 것이었습니다.

### 2.3 background script를 통해 요청을 보내야 했습니다.

해결 방법은 `Content Script`에서 직접 요청을 보내는 것이 아니라 `background script`를 통해 요청을 중계하는 방식이었습니다.

`Content Script`는 웹 사이트의 출처를 따라가서 보안 제약을 받습니다.

반면 `background script`에서 `fetch()` 요청을 수행하면 이 요청의 origin은 익스텐션의 출처(chrome-extension://...)가 되므로 서버에서 CORS 허용 대상에 이미 포함된 안전한 출처가 됩니다.

| 구분               | Content Script                            | Background Script                                  |
| ------------------ | ----------------------------------------- | -------------------------------------------------- |
| 실행 위치          | 실제 웹사이트 위에서 실행됨               | Chrome 익스텐션 내부에서 따로 실행됨               |
| 요청 출처 (Origin) | 웹사이트 주소 (예: naver.com)             | 익스텐션 주소 (`chrome-extension://`)              |
| CORS 허용 여부     | ❌ 대부분 차단됨                          | ✅ 서버에서 허용되므로 문제 없음                   |
| 용도               | 웹 페이지 DOM 조작, 요소 추적, UI 표시 등 | 서버 통신, 토큰 저장, 인증 처리 등 백그라운드 작업 |

#### 1) Content Script에서 background로 메시지를 전송합니다.

> 사용자가 요소를 선택하면 `Content Script`는 메시지를 보내고 실제 네트워크 요청은 하지 않습니다.

#### 2) background에서 서버로 요청을 전송합니다.

> 서버는 안전한 익스텐션 출처에서 요청이 왔다고 인식하게 되어 정상적으로 요청을 수락합니다.

### 2.4 URL 저장 기능이 모든 페이지에서 정상 동작하게 되었습니다.

![background적용후](./assets/background후.gif)

`background script`로 요청을 중계하는 구조로 바꾸면서 모든 웹사이트에서 안정적으로 URL 등록이 가능해졌습니다.

이로 인해 사용자는 어떤 사이트에서도 DOM 요소를 선택하고 알림을 받을 수 있게 되었고 브라우저 보안 정책(CORS)을 우회하면서도 안정적으로 동작하게 되었습니다.

## 3. 특수문자 ID/class로 인해 요소 탐색이 실패했습니다.

ID나 class 속성에 특수문자가 포함된 경우 CSS 선택자가 깨져 요소 탐지가 실패하는 문제가 있었습니다.<br>
JANBI는 사용자가 클릭한 DOM 요소의 CSS Selector 또는 XPath를 저장하고, 이후 Playwright를 통해 해당 요소를 다시 찾습니다. 하지만 공백, 숫자 시작, #, : 같은 특수문자가 있는 경우 `querySelector() `및 Playwright의 `locator()`가 오류를 발생시켜 정상 탐지가 되지 않았습니다.

### 3.1 CSS 선택자에서 특수문자는 이스케이프 처리가 필요합니다.

CSS 선택자는 HTML 내 ID나 class를 기반으로 요소를 선택할 수 있습니다.<br>
하지만 다음과 같은 경우에는 CSS 문법 규칙에 맞지 않기 때문에 선택자 파싱 자체가 실패합니다.

```
<div id="price#main"></div>
<div class="123-item name with space"></div>
```

다음과 같이 작성하면 오류가 발생합니다.

```
document.querySelector("#price#main");        // ❌
document.querySelector(".123-item");          // ❌
document.querySelector(".name with space");   // ❌
```

이런경우 `querySelector`는 `SyntaxError:  Failed to execute 'querySelector'` 오류를 던지며 Playwright에서도 마찬가지로 locator 생성이 실패하게 됩니다.

### 3.2 `CSS.escape()`를 사용해 선택자를 이스케이프 처리했습니다.

> 📌 CSS.escape() 란?<br>
> CSS.escape()는 특수문자가 포함된 문자열을 CSS 선택자에서 안전하게 사용할 수 있도록 이스케이프 처리해주는 브라우저 내장 함수입니다.<br>
> HTML ID나 class 속성 값에 공백, 숫자 시작, #, ., : 등의 특수문자가 포함되었을 때, 이를 그대로 CSS 선택자에서 사용하면 문법 오류가 발생할 수 있습니다. 이때 CSS.escape()를 사용하면 이러한 특수문자를 자동으로 이스케이프 처리하여 `querySelector`, `document.querySelectorAll`, `page.locator` 등에서 안전하게 사용할 수 있도록 도와줍니다.

```
const unsafeId = "price#main";
const safeSelector = `#${CSS.escape(unsafeId)}`;
const element = document.querySelector(safeSelector);
```

Playwright에서도 마찬가지로 적용할 수 있습니다.

```
const escapedSelector = `#${CSS.escape(idValue)}`;
const locator = page.locator(escapedSelector);
```

`CSS.escape()`를 이용하면 특수문자가 포함되어 있어도 안전하게 DOM 요소를 선택할 수 있었습니다.

#### 3.3 선택자 생성 단계에서 자동 이스케이프 처리하도록 구현했습니다.

JANBI에서는 사용자가 클릭한 요소의 ID나 class를 기반으로 CSS 선택자를 자동 생성하는 과정에서 다음과 같은 조건이 감지되면 `CSS.escape()`로 감싸도록 처리했습니다.

```
function getCssSelector(targetElement) {
  const id = targetElement.id;
  if (id) return `#${CSS.escape(id)}`;

  const classes = [...targetElement.classList];
  if (classes.length > 0) return '.' + classes.map(CSS.escape).join('.');

  return targetElement.tagName.toLowerCase();
}
```

### 3.4 특수문자가 포함된 요소도 안정적으로 추적할 수 있게 되었습니다.

기존에는 "123-item"이나 "name with space"와 같이 특수문자가 있는 요소를 선택하려 할 때 예외가 발생하거나 탐지가 실패했습니다.<br>
하지만 `CSS.escape()`를 적용하면서 모든 특수문자 케이스에 대해 안전하고 일관된 선택이 가능해졌고 JANBI의 요소 추적 기능이 보다 정확해졌습니다.

## 4. 일부 페이지에서 요소 선택 UI가 깨지거나 보이지 않았습니다.

JANBI는 웹사이트 위에 직접 UI를 띄워 사용자가 모니터링할 DOM 요소를 클릭으로 선택할 수 있도록 합니다.<br>
그런데 일부 웹사이트에서는 이 UI가 제대로 보이지 않거나 아예 깨져서 작동하지 않는 문제가 있었습니다.

![shadowdom적용전](./assets/shadowdom전.gif)

### 4.1 외부 웹 사이트의 스타일이 UI에 영향을 주었습니다.

익스텐션은 웹 페이지 안에서 실행되는 `content.js`를 통해 직접 UI를 추가합니다.<br>
그런데 이렇게 삽입한 UI는 원래 그 웹사이트가 가진 CSS 스타일의 영향을 그대로 받습니다.

- 웹 사이트 쪽의 CSS가 더 우선순위가 높아서 JANBI의 스타일이 무시되었습니다.
- Tailwind 스타일이 웹 사이트의 Reset CSS와 충돌했습니다.
- 스타일 충돌로 버튼이 사라지거나 레이아웃이 깨졌습니다.

UI가 일부 웹 사이트에서 깨져 보이는 문제는 대부분 외부 스타일 충돌 때문이었습니다. 이 문제를 해결하기 위해 Shadow DOM을 활용하기로 했습니다.

### 4.2 Shadow DOM을 사용해 UI를 캡슐화시켰습니다.

> 📌 Shadow DOM이란?<br>
> Shadow DOM은 기존 DOM과 분리된 독립적인 DOM 공간을 만들어주는 기술입니다.
> 이렇게 만든 영역은 바깥쪽 CSS나 스크립트의 영향을 받지 않기 때문에 UI를 완전히 캡슐화할 수 있습니다.

이 문제를 해결하기 위해 UI 전체를 Shadow DOM 안에 렌더링하는 방식으로 전환했습니다.

#### 1) 스타일도 Shadow DOM 내부에 삽입했습니다.

처음엔 Tailwind 클래스만 사용했는데 외부 페이지 CSS에 덮여버리는 경우가 많아서 Shadow DOM 내부에 `<style>` 태그를 직접 삽입해서 스타일을 보호했습니다.

```
const style = document.createElement("style");
style.textContent = `
  #janbi-selector-panel { ... }
  .janbi-title { ... }
`;

shadowRoot.appendChild(style);
```

#### 2) 유저가 선택할 때 UI 스타일은 원래 페이지에 스타일을 삽입했습니다.

사용자가 클릭한 실제 웹 페이지의 요소는 Shadow DOM 밖에 있는 요소들이기 때문에 이 부분은 기존처럼 `document.head`에 스타일을 추가해서 처리했습니다.

```
const style = document.createElement("style");
style.textContent = `
  .janbi-hover {
    outline: 2px dashed #2536D2 !important;
    cursor: crosshair !important;
  }

  .janbi-selected {
    outline: 2px solid rgba(61, 61, 60, 0.35) !important;
    background-color: rgba(255, 250, 200, 0.55) !important;
  }
`;

document.head.appendChild(style);
```

사용자가 선택한 요소에 테두리나 배경 표시가 정상적으로 잘 보이게 되었습니다.

### 4.3 모든 사이트에서 UI가 안정적으로 작동합니다.

![shadowdom적용후](./assets/shadowdom후.gif)

기존에는 버튼이 사라지거나 보이지 않는 문제가 있었지만 Shadow DOM을 통해 UI 전체를 캡슐화한 이후로는 어떤 웹사이트에서도 안정적으로 작동하게 되었습니다.

# User Experience 👥

### 1. 변경 이력 페이지에 페이지네이션을 도입했습니다.

처음에는 한 번에 모든 변경 이력을 불러와서 화면에 모두 보여주었습니다.

하지만 시간이 지나면서 이력이 점점 누적되었고 다음과 같은 불편함이 생겼습니다.

1. 스크롤이 너무 길어져서 원하는 내용을 찾기 어렵고 보기 불편했습니다.
2. 화면에 표시할 내용이 많아져 처음 들어갈 때 로딩이 느려졌습니다.
3. 변경 이력을 구간 별로 빠르게 확인하기 어려웠습니다.

이 문제를 해결하기 위해 10개씩 나눠서 볼 수 있는 **페이지네이션** 기능을 추가했습니다.

| 적용 전                                            | 적용 후                                            |
| -------------------------------------------------- | -------------------------------------------------- |
| ![페이지네이션적용전](./assets/페이지네이션전.gif) | ![페이지네이션적용후](./assets/페이지네이션후.gif) |

### 2. 같은 내용의 이력은 한 번만 저장되도록 개선했습니다.

JANBI는 일정한 시간마다 웹 페이지의 요소를 확인합니다. 예전에는 내용이 바뀌지 않아도 계속해서 똑같은 이력이 누적됐습니다.

이제는 이전 기록과 내용이 완전히 동일하면 저장하지 않도록 개선했습니다.

1. 중복 로그가 줄어들어 데이터가 훨씬 깔끔하게 관리되었습니다.
2. 사용자는 반복되는 내용을 계속 확인할 필요가 없어졌습니다.
3. 사용자가 알고 싶은 중요한 변경기록만 눈에 잘 띄게 되었습니다.

| 적용 전                                | 적용 후                                |
| -------------------------------------- | -------------------------------------- |
| ![동일이력전](./assets/동일이력전.png) | ![동일이력후](./assets/동일이력후.png) |

### 3. 비개발자도 쉽게 사용할 수 있도록 요소 선택 UI를 개선했습니다.

처음에는 개발자에게 익숙한 XPath나 CSS Selector가 그대로 노출되었고 선택 방식도 직관적이지 않아 비개발자에게는 진입장벽이 있었습니다.

이제는 기술적인 내용을 감추고 시각적으로 명확하고 직관적인 인터페이스로 개선했습니다.

#### 3.1 선택 가능한 상태를 시각적으로 안내했습니다.

마우스를 움직일 때 커서가 십자 모양(+)으로 바뀌고 마우스 위에 있는 요소에는 점선 테두리를 표시하여 지금 어떤 요소를 선택할 수 있는지 쉽게 인지할 수 있도록 구현했습니다.

#### 3.2 선택 완료된 요소는 눈에 띄게 강조했습니다.

선택이 완료되면 해당 요소에 연한 배경색과 실선 테두리가 적용되어 "어떤 요소를 선택했는지" 명확하게 보이도록 구현했습니다.

다시 페이지를 둘러보더라도 어떤 부분이 선택된 상태인지 한눈에 파악할 수 있습니다.

#### 3.3 사용자에게는 복잡한 선택자 대신 직관적인 콘텐츠 정보만 노출했습니다.

선택한 요소의 기술적인 경로(XPath, CSS Selector)는 내부적으로 처리되고 사용자에게는 다음과 같이 실제 화면에 표시되는 콘텐츠만 보여줍니다.

| 선택자                          | 사용자에게 보여지는 정보              |
| ------------------------------- | ------------------------------------- |
| ❌ `//*[@id="product-price"]`   | ⭕️ `"₩24,900"`                        |
| ❌ `div > ul > li:nth-child(3)` | ⭕️ `"신제품 출시"`                    |
| ❌ `#main-banner > img`         | ⭕️ `"https://example.com/banner.png"` |

사용자가 개발 지식 없이도 "내가 지금 어떤 요소를 선택했는지" 명확하게 이해할 수 있도록 했습니다.

| 적용 전                        | 적용 후                        |
| ------------------------------ | ------------------------------ |
| ![요소전](./assets/요소전.gif) | ![요소후](./assets/요소후.gif) |

# Tech Stack 🛠️

| **Category**  | **Tech Stack**                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Language**  | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)                                                                                                                                                                                                                                                                                                                           |
| **Frontend**  | ![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                                                                                                                                                                                                                                         |
| **Backend**   | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=microsoft&logoColor=white) |
| **Library**   | ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white) ![node-cron](https://img.shields.io/badge/node--cron-333333?style=for-the-badge&logo=nodedotjs&logoColor=white)                                                                                                                                                                                                                 |
| **CSS**       | ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)                                                                                                                                                                                                                                                                                                                       |
| **Dev Tools** | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)                                                                                                                                                                                                                           |
| **Platforms** | ![Chrome Extension](https://img.shields.io/badge/Chrome_Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white) ![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)                                                                                                                                                                                                          |

### React + Vite

- 빠른 HMR과 모듈 번들링 덕분에 대시보드 UI 개발에 최적화되어 있습니다.
- 컴포넌트 기반 UI 구현을 위해 React를 사용했습니다.

### Node.js + Express.js

- 비동기 I/O에 적합한 구조로 웹 스크래핑 및 Slack 알림 처리를 담당합니다.
- RESTful API 서버 구성에 Express를 사용했습니다.

### Playwright

- CSR 기반 페이지도 실제 렌더링을 통해 정확하게 요소를 탐지할 수 있습니다.
- `waitUntil`, `waitFor`, `isVisible` 등으로 DOM 상태를 정밀하게 제어할 수 있습니다.

### node-cron

- 간단한 크론 표현식으로 작업 스케줄을 손쉽게 설정할 수 있습니다.
- 단순하고 반복적인 시간 기반 작업에 최적화되어있습니다.

### Tailwind CSS

- JIT 컴파일 기반으로 빠른 스타일링과 빌드가 가능합니다.
- 클래스만으로 빠른 UI 구현이 가능하고 기존 사용 경험으로 러닝커브가 낮습니다.

# Timeline 🗓

#### 2025.03.31 - 2025.04.25
