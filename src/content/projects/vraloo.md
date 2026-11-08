---
order: 1
year: "2026"
status: alpha
version: v0.6.0-alpha
private: true
accent: "#3d7bff"
cover: ../../assets/projects/vraloo.png
stack: [Go 1.27, ConnectRPC, PostgreSQL, Redis, Next.js 16, React 19, Python · FastAPI, Docker]
locales:
  ru:
    title: vraloo
    tagline: Единый школьный реестр достижений учеников
    description: Ученики регистрируют дипломы и сертификаты с помощью OCR, сотрудники модерируют их через отдельную очередь, а портфолио превращаются в экспортируемые и проверяемые записи. Модульный монолит на Go, stateless OCR-сайдкар на Python и фронтенд на Next.js, связанные protobuf-контрактами.
    highlights:
      - OCR-регистрация с антивирусным шлюзом ClamAV и честной уверенностью по каждому полю
      - Capability-based RBAC и очередь модерации с журналом аудита
      - 13 protobuf-сервисов, 8 контейнеров — весь стек поднимается одной командой
  en:
    title: vraloo
    tagline: A unified school register of student achievements
    description: Students register diplomas and certificates with OCR assistance, staff moderate them through a dedicated queue, and portfolios become exportable, auditable records. A Go modular monolith, a stateless Python OCR sidecar and a Next.js frontend wired together by protobuf contracts.
    highlights:
      - OCR-assisted registration behind a fail-closed ClamAV gate, with honest per-field confidence
      - Capability-based RBAC and a moderation queue with an audit journal
      - 13 protobuf services, 8 containers — the whole stack runs with one command
  kk:
    title: vraloo
    tagline: Оқушы жетістіктерінің бірыңғай мектеп тізілімі
    description: Оқушылар дипломдар мен сертификаттарды OCR көмегімен тіркейді, қызметкерлер оларды жеке кезек арқылы модерациялайды, ал портфолиолар экспортталатын әрі тексерілетін жазбаларға айналады. Go-дағы модульдік монолит, Python-дағы stateless OCR-сайдкар және Next.js фронтенді protobuf-келісімшарттарымен байланысқан.
    highlights:
      - ClamAV қорғаныс шлюзі бар OCR-тіркеу және әр өріс бойынша сенімділік
      - Capability-based RBAC және аудит журналы бар модерация кезегі
      - 13 protobuf-сервис, 8 контейнер — бүкіл стек бір командамен іске қосылады
---
