# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MBTI 공부법 연구소 — HTML 여러 페이지로 구성된 콘텐츠 사이트.

## Design

- 디자인 시스템 기준: 문화체육관광부 공공데이터광장(https://www.culture.go.kr/data/main/main.do) UI를 참고
- 배경: 라이트 모드는 흰색(#ffffff), 다크 모드는 차콜/네이비(#15151d) 계열. 포인트 컬러는 인디고 보라(라이트 #5a43db / 다크 #8577f0)
- 폰트: Noto Sans KR
- 다크/라이트 모드 토글 버튼을 모든 페이지 헤더 상단에 배치. `data-theme` 속성 + `localStorage`로 사용자 선택을 기억하고, 선택 기록이 없으면 시스템 설정(`prefers-color-scheme`)을 따른다 (`js/theme.js`, 각 페이지 `<head>`의 인라인 초기화 스크립트)
- 색상은 css/base.css의 CSS 커스텀 프로퍼티(`--bg`, `--card-bg`, `--purple` 등)로만 관리하고, 컴포넌트에 색상을 하드코딩하지 않는다 — 다크 모드 대응을 위함
- 모바일 반응형 필수

## Rules

- 서버·API·키는 절대 사용하지 않는다 — 정적 파일(HTML/CSS/JS)만 사용
- 파일이 300줄을 넘으면 코드를 작성하기 전에 분리를 먼저 제안할 것

## Commands

(Add build, lint, test, and dev-server commands here once the project is scaffolded.)

## Architecture

(Add high-level architecture notes here — how the app is structured, key modules, and how they interact — once code exists.)
