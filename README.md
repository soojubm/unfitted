#boilerplate

### select를 filter의 role로 쓰지 말아야 한다. select는 trigger와 presentation(or menu or target?)를 포함하는 컴포넌트이기 때문이다. 콘텐츠 필터링은 사용자 여정에서 개선 가능성이 가장 높은 인터페이스이기 때문에 filter는 항상 더 좋은 경험을 줄 수 있는 인터페이스로 변경이 쉬워야 한다.

### 레이블의 형태를 일괄 변경하기 위해 --filter-font-weight token을 정의해야 한다.

### dropdown 컴포넌트는 많은 인터페이스에서 일관되게 재사용할 수 있는 유용한 common 컴포넌트이다. 하지만 best practice가 될 수는 없다. select와 filter와 같은 이유.


TODO renaming multipleFilterField
TODO useOutsideClick에서 UI 상태를 분리할 수 있을까?
TODO try catch와 errorBoundary와 react query 에러 리턴 순서
