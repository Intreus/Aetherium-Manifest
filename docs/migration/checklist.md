# Migration Execution Checklist

เช็กลิสต์สำหรับติดตามการย้ายงานระดับ execution โดยผูกกับ dependency order, risk, และ rollback plan

| Step | Task | Dependency Order | Risk Level | Rollback Plan | Status |
|---|---|---|---|---|---|
| 1 | แยก Governor engine ออกจาก `core/runtime/governor.js` | 1 | high | เปิด `GOVERNOR_V1` และ rollback rule-set เดิมทันที | in-progress |
| 2 | แยก Intent extractor module ใหม่ | 2 | medium | revert import graph กลับ `core/intent.js` | not-started |
| 3 | ย้าย/ปรับ Brain state-machine | 3 | high | เปิด adapter `processIntent` signature เดิม | not-started |
| 4 | ย้าย AETH compiler ไปโครงสร้าง `index.js` | 4 | low | re-export path เก่าเพื่อลด breakage | not-started |
| 5 | rewrite Presence IR builder | 5 | medium | สลับกลับด้วย `IR_BUILDER_V1` | not-started |
| 6 | rewrite Uniform mapper (หลัง Governor) | 6 | high | dual-run mapper v1/v2 และ toggle flag | not-started |
| 7 | แยก Pipeline orchestrator | 7 | medium | wrapper `AetherPipeline` เรียก flow เดิม | not-started |
| 8 | ย้าย WebGL renderer | 8 | medium | config fallback `renderer=legacy` | not-started |
| 9 | ปรับ UI controller runtime path | 9 | medium | facade methods เดิม + redirect | not-started |
| 10 | split entrypoint `main.js` -> `app/bootstrap.js` | 10 | low | bootstrap proxy ชี้กลับ main เดิม | not-started |

## Status Legend

- `not-started` = ยังไม่เริ่ม
- `in-progress` = กำลังดำเนินการ
- `done` = เสร็จและผ่าน test ที่กำหนด

## Exit Criteria ต่อขั้น

แต่ละ step ถือว่า `done` เมื่อครบ:

- โค้ดใน scope build ผ่าน
- unit tests ที่เกี่ยวข้องผ่าน
- มี rollback switch หรือแผน revert ที่ทดสอบได้
